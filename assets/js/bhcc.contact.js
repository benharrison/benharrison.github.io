var bhcc = bhcc || {};

bhcc.Contact = {};

bhcc.Contact.BlockUI = function() { $('#contact_form_blockui').show(); }
bhcc.Contact.UnBlockUI = function() { $('#contact_form_blockui').hide(); }
bhcc.Contact.ShowErrorMessage = function() {
    $('#contact_form_status')
        .attr('class', 'error')
        .html('There was an error sending your message.')
        .show();

    bhcc.Contact.FadeStatusMessage();
}
bhcc.Contact.ShowSuccessMessage = function() {
    $('#contact_form_status')
        .attr('class', 'success')
        .html('Thank you.')
        .show();

    bhcc.Contact.FadeStatusMessage();
}
bhcc.Contact.FadeStatusMessage = function() {
    var MessageDuration = 10 * 1000;
    var FadeDuration = 2 * 1000;

    setTimeout(function(){
        $('#contact_form_status').fadeOut(FadeDuration, function(){
            $('#contact_form_status')
                .attr('class', '')
                .html('')
                .hide();
        });
    }, MessageDuration);
}

$(document).ready(function(){
    var $nav_contact = $('.nav_contact');
    
    $nav_contact.eq(0).bind('click', function(){
        $('#slidecontact_wrap').slideToggle();
        return false;
    });

    $nav_contact.eq(1).hide(); // hack to remove from the footer for now.
    
    $('#contact_submit').bind('click', function(){
        var data = $('#contact_form form').serialize();
        
        bhcc.Contact.BlockUI();
        $.ajax({
            url: '/contact/submit',
            type: 'post',
            data: data,
            complete: function(){
                bhcc.Contact.UnBlockUI();
            },
            success: function() {
                bhcc.Contact.ShowSuccessMessage();
            },
            error: function() {
                bhcc.Contact.ShowErrorMessage();
            }
        });
    });
});
