$('#v2').click(function () {
    console.log('YOU CLICKED ME!');
    console.log('I HOPE IT WORKED');
})

function scream() {
    console.log('AAAAAAHHH');
    console.log('STOP TOUCHING ME!');
}

$('#v2').mouseenter(scream);
//$('#v2').onmouseenter(scream); does not work

$('h1').click( () => {
    alert('you clicked the h1!')
})


$('#v3').click(function () {
    alert("CLICKED!");
})

function twist() {
    console.log("TWIST!");
}
function shout() {
    console.log("SHOUT!");
}

$('#tas').click(twist);
$('#tas').click(shout);

// The above works as well
// $('#tas').on('click', twist);
// $('#tas').on('click', shout);
