console.log('\'Allo \'Allo!');

$(document).ready(function () {
    $('#divEstimate').hide();
    $('#estimate').on('click', estimate);
    $('#search').on('click', codeAddress);
    //$('#txtAddress').on('focus', geoLocate);
});