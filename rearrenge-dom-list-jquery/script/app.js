$(document).ready(function(){


    /*** Colorizing items randomly ***/
    const randColor = (element) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    $('.item').each( function () {

        let color = randColor()
        $(this).css("background-color", color);
        $(this).attr("id", color); 
        $(this).attr("draggable", true); // This is not actually color-realted (allows the sorting)
    })
    
    /*** Making items 'sortable' ***/
    $('section').on({
        'dragover': function (e) { 
            e.preventDefault() 
        },

        'dragstart': function (e) {
            console.log('grabbing ', e.target.id)
            e.originalEvent.dataTransfer.setData("id", e.target.id);
        },

        'drop': function (e) {
            console.log('dropping at ', e.target.id);
            const bombarded = e.target;
            const draggedId = e.originalEvent.dataTransfer.getData("id");
            const dragged = document.getElementById(draggedId); //JQuery selector doesn't work with this id's format, of "rgb(###, ...)"
                                                                //So vanilla JS was used
            if (bombarded.className ==="item" 
            && dragged !== bombarded) {  
                bombarded.before(dragged);
            }
        }
    })


})