const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

$('button').click(colorize);
$('h1').click(colorize);

function colorize() {
    console.dir(this);
    this.style.backgroundColor = makeRandColor();
    this.style.color = makeRandColor();
}