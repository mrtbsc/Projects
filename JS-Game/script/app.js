const items = document.querySelectorAll('.item');
const places = document.querySelectorAll('.box')
const h1 = document.querySelector('h1');
const section = document.querySelector('section'); 

const colorize = (element) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    element.id = `rgb(${r}, ${g}, ${b})`;
    element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    if (r+g+b<255||r<60||g<60||b<60){
        element.style.color = 'white';
    }
}

const relocateItems = (Dragged, Bombarded) => {
    const parentOfDragged = Dragged.parentNode;
    // console.dir(parentOfDragged);
    var newBox = document.createElement("div");
    newBox.className = "box";
    newBox.appendChild(Dragged);

    section.insertBefore(newBox, Bombarded.parentNode);
    parentOfDragged.remove();
}

for (let item of items) {
    colorize(item);
    item.draggable = true;

    item.addEventListener('dragstart',(event)=>{
        console.log('dragstart');
        event.dataTransfer.setData("id", event.target.id);

    })
}


section.addEventListener('dragover',e=> {e.preventDefault();})

section.addEventListener('drop', (event)=> {   // The handler is applied to the section, so that new elements created there will automatically have it
    console.log('drop');
    const Bombarded = event.target;
    const DraggedId = event.dataTransfer.getData("id");
    const Dragged = document.getElementById(DraggedId);
    console.log(Bombarded.className)
    if (Bombarded.className=="item" 
        && Dragged!=Bombarded) {  
              
        console.dir(Dragged);
        console.dir(Bombarded);
        relocateItems(Dragged,Bombarded)
    }

});

