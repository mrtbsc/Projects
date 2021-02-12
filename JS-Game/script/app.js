const items = document.querySelectorAll('.item');
const places = document.querySelectorAll('.box')
const h1 = document.querySelector('h1');
const section = document.querySelector('section'); 

/*** Colorizing items randomly ***/
const colorize = (element) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    element.id = `rgb( ${r}, ${g}, ${b} )`;
    // element.innerText = `rgb( ${r}, ${g}, ${b} )`;
    element.style.backgroundColor = `rgb( ${r}, ${g}, ${b} )`;
    if (r+g+b<255||r<60||g<60||b<60){
        element.style.color = 'white';
    }
}

for (let item of items) {
    colorize(item);
    item.draggable = true;
}

/*** Making items 'sortable' ***/
section.addEventListener('dragstart',(event)=>{
    console.log('dragstart');
    event.dataTransfer.setData("id", event.target.id);
})

section.addEventListener('dragover',e=> {
    e.preventDefault();
})

section.addEventListener('drop', (event)=> { 
    console.log('drop');
    const bombarded = event.target;
    const draggedId = event.dataTransfer.getData("id");
    const dragged = document.getElementById(draggedId);
    console.log(bombarded.className)
    if (bombarded.className === "item" 
        && dragged !== bombarded) {  
            bombarded.before(dragged);
    }
});

