$('button').click( (e) => {
    const newColor = makeRandColor();
    $('body').css("background-color",newColor);
    $('h1').text(newColor);
})

const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}