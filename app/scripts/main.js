function cleanResponse(){
    $('#lblPrecos').fadeOut('slow');
    $('#lblDistancia').fadeOut('slow');
    $('#response').fadeOut('slow', function(){$(this).html('')});
}

$(document).ready(function () {
    $('#divEstimate').hide();
    $('#estimate').on('click', estimate);
    $('#search').on('click', codeAddress);
});