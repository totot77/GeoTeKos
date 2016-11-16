$(document).ready(function(){
    var map = {18: false, 65: false,68:false};
    $(window).on('keydown', function(e) {
        if (e.keyCode in map) {
            map[e.keyCode] = true;
            if (map[18] && map[65]) { //alt & a
                add();
                            return false;

            } else if (map[18] && map[68]){ // alt & d on supprime la ligne
                del(); 
            return false;
            } 
        }   
        return true;
    });
    $(window).on('keyup', function(e) {
        if (e.keyCode in map) {
            map[e.keyCode] = false;
            return false;
        }
    });
    
    $('.divcenter').on('click','.add',function(){
        add();
    });
    
    function add()
    {
        verificationTableau(function(){
            var nb = $("#interventions").children('thead').children('tr').children('th').length;
            var data = [];
            $("#interventions").children('thead').children('tr').children('th').each(function(index){
               if(index!=0 && index != nb-1)
                   data.push($(this).attr('attr-name'));
            });
            ajoutInput(data);
            if($('#validAll').length==0)
                $('.icon-help').after($('<span class="icon-enter-2 fg-blue icon-extra-large margin-left10" id="validAll" title="Tout Valider" />'));
        });
    }
    function ajoutInput(data)
    {
        var tr = $('<tr/>').append($('<td class="text-align-center"/>'));
        for(var d in data)
        {
            var input = $('<input name="'+data[d]+'" type="text" />');
            var div =$("<div class='input-control size4 text'/>").append(input);
            var td =$('<td class="text-align-center"/>').append(div);
            tr.append(td);
        }
        var tdValid = $('<td class="text-align-center"/>').append($('<button value="valider" class="valid">Valider</button>'));
        tr.append(tdValid);
        $('#interventions tr:last').after(tr);
        $(tr).find('input:text').first().focus();
    }
    
    function verificationTableau(callback)
    {
        if($('#interventions').length==0){
            $.post( Routing.generate(post_addr +"_table"), function( data ) {
                $( "#_page_1" ).prepend( data );
                $('#noticeNoResult').remove();
                $('#interventions').dynatable().data('dynatable');
                callback();
            });
        }else
            callback();
    }
    function verificationValeurs(tr){
        var ret =false;
        tr.find("input:text").each(function(){
           if($(this).val().trim()!="")
               ret= true;
        });
        return ret;
    }
    function valeurs(tr){
        var data={};
        tr.find("input:text").each(function(){
           data[$(this).attr('name')]=$(this).val();
        });
        return data;
    }
    
    function valid(tr)
    {
        if(verificationValeurs(tr))
        {
            $.post( Routing.generate(post_addr+'_add_post',valeurs(tr)), function(data) {
                if(data.check){
                    tr.children().first().html("<a href='"+Routing.generate(post_addr+'_edit', { id: data.id })+"'><span class='icon-pencil fg-blue large' title='editer'></span></a>");

                    tr.find("input:text").each(function(){
                        $(this).parent().parent().html("<span class='entity' attr-id='"+data.id+"'>"+$(this).val()+"</span>"); //data.nom
                    });

                    tr.children().last().html("<a href='"+Routing.generate(post_addr+'_intrash', { id: data.id })+"'><span class='icon-remove fg-red large' title='supprimer'>");
                    tr.children().last().find('.icon-checkmark').remove();
                    tr.children().last().append("<span class='icon-checkmark fg-green large margin-left10' title='Validé'></span>");

                    notifyError("Element "+data.nom+" ajouté!");
                    verifBoutonValidAll();
                }else
                    tr.children().last().append("<span class='icon-checkmark fg-red large margin-left10' title='Validé'></span>");
            }).fail(function() {
                tr.children().last().append("<span class='icon-checkmark fg-red large margin-left10' title='Validé'></span>");
            });
        }
        else{
           tr.remove();
        }
    }
    
    $('.divcenter').on('click','.valid',function(){
        var tr = $(this).parent().parent();
        //var input =tr.find("input:text");
        valid(tr);
    });
    
    $('.divcenter').on('click','.help',function(){
        $.post( Routing.generate('popin_help_show'), function(data) {
            openpromptRead(data.title,data.description,function(){});
        });
    }); 
    
    function verifBoutonValidAll()
    {
        if($( "#interventions input:text" ).length<=0)
            $("#validAll").remove();
    }
    
    function del()
    {
        if($( "#interventions tr:hover" ).length==1)
        {
            var tr = $( "#interventions tr:hover" ).first();
            $.post( Routing.generate(post_addr+'_del_post',{id:tr.find('.entity').first().attr('attr-id')}), function(data) {
                // suppression dans la bdd
                notifyError("Mise à la corbeille de l'élément id: "+data.id+" effectué!");
                tr.remove();
            });
        }
    }
    
    $('.divcenter').on('click','#validAll',function(){
        $( "#interventions tr" ).each(function(){
            if($(this).find('input:text').length>0)
                valid($(this));
        });
    });
    
    $('.divcenter').on("dblclick",'.entity',function(){
        var text = $(this).text();
        var input =$('<input class="newEntity" />');
        input.val(text);
        var div=$('<div class="input-control text size4"/>');
        div.append(input);
        $(this).html(div);
        input.focus();
    });
    
            
    $('.divcenter').on('focusout','.entity',function(){
        var span = $(this);
        var id = span.attr('attr-id');
        var val = span.children().children().val();
        var attr = span.attr('attr-name');
        $.post( Routing.generate(post_addr+'_edit_post', { id: id, val: val,attr:attr }), function(data) {
            span.empty();
            $('td:last-child',span.parent().parent()).find('.icon-checkmark').remove();
            if(data.check)
            {
                $('td:last-child',span.parent().parent()).append('<span class="icon-checkmark fg-green large margin-left10" title="Validé"></span>');
                span.text(data.val); 
                notifyError("Element "+data.nom+" a été ajouté avec success!");
            }else
            {
                $('td:last-child',span.parent().parent()).append('<span class="icon-checkmark fg-red large margin-left10" title="Erreur"></span>');
                span.text(val); 
                notifyError("Element "+val+" n'a pas été modifié!","err");
            }
        }).fail(function() {
            $('td:last-child',span.parent().parent()).append('<span class="icon-checkmark fg-red large margin-left10" title="Erreur"></span>');
            notifyError("Element "+val+" n'a pas été modifié!","err");
        });
    });
    
});