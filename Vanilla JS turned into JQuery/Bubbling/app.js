$('#changeColor').click( (e) => {
    $('#container').css('background-color',makeRandColor());
    e.stopPropagation();
})

$('#container').click( function (e) {
    console.dir(this);
    console.dir($('#container'));
    $('#container').hide();
})

const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}