$(function(){
    $('fieldset .fieldsetcontent').each(function(){
        if(!$(this).hasClass('display'))
            $(this).hide();
    });
    $(document).on('click','legend',function(){
        var fieldset = $(this).parent().find('.fieldsetcontent');
        fieldset.slideToggle("slow",function(){
            if(fieldset.is(":visible")){
                $(".filtre").removeClass('icon-arrow-down-4');
                $(".filtre").addClass('icon-arrow-up-4');
            }else{
                $(".filtre").removeClass('icon-arrow-up-4');
                $(".filtre").addClass('icon-arrow-down-4');
            }
        });
    });
});