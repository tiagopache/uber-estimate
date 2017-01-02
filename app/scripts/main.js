console.log('\'Allo \'Allo!');

$(document).ready(function () {
    $('#estimate').on('click', estimate);
    $('#search').on('click', codeAddress);
    //$('#txtAddress').on('focus', geoLocate);
});