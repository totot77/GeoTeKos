
    function openpromptRead(title,description,callback){
        var temp = {
            state0: {
                title:title,
                html:description,
                buttons: { Fermer: false }
            }
        }

        $.prompt(temp,{
            close: function(){
                    callback("close");
            }
        });
        $( ".jqi" ).draggable({live:true});		
    }
    
    function openpromptDelete(action,callback){
        var temp = {
            state0: {
                title: action.charAt(0).toUpperCase() + action.slice(1),
                html:"Etes vous sur de vouloir "+action+" cet élément ?",
                buttons: { Non: false,Oui: true },
                submit:function(e,v,m,f){ 
                    callback(v);
                }
            }
        }

        $.prompt(temp);	
    }

    function openpromptWrite(title,description,callback){
        var temp = {
            state0: {
                title:'Evénement',
                html:'<div class="field"><label for="rate_content_title">Titre :</label><br/><input type="text" name="title" id="title_agenda" value="'+title+'"  /></div> <div class="field"><label for="rate_content_description">Informations complémentaires :</label><br/><textarea name="description" id="description_agenda" >'+description+'</textarea> </div>',
                buttons: { Cancel: false, Ok: true },
                focus: "input[name='title']",
                submit:function(e,v,m,f){ 
                if(!v){
                    $.prompt.close();
                    return false;
                }
                else// $.prompt.goToState('state1');//go forward
                    return true; 
                }
            }
        }

        $.prompt(temp,{
            close: function(e,v,m,f){
                if(v !== undefined){
                    callback(f);
                }
            }
        });		
    }
    
    $( document ).ready(function() {
        $('.icon-remove').on( "click", function(e){
            e.preventDefault();
            var href = $(this).parent().attr("href");
            openpromptDelete("mettre à la corbeille",function(data){
                if(data)
                    window.location.href=href;
            });
        });
        $('.icon-blocked').on( "click", function(e){
            e.preventDefault();
            var href = $(this).parent().attr("href");
            openpromptDelete("supprimer",function(data){
                if(data)
                    window.location.href=href;
            });
        });
    });