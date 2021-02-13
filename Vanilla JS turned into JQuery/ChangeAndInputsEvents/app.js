// $('input').on("change", function (e) {
//     $('h1').text($('input').val())
// })

$('input').on("input", function (e) {
    $('h1').text($('input').val());
});