const mainContainer = document.querySelector(".main-container");
const grid = document.querySelector(".grid");
const gridSizeBtn = document.querySelector(".grid-size-btn");
const gridColorBtn = document.querySelector(".grid-color");
const rainbowModeBtn = document.querySelector('.grid-rainbow-mode');
const gridResetBtn = document.querySelector('.grid-reset');
const gridEraseBtn = document.querySelector('.grid-erase');
let gridClicked = false;
let erase = false;
let elementColor = 'blue';
let keepChangingElementColor = false;
let gridSize = 16;


function changeGridSize(gridSize){
    for(let i = 0; i < gridSize; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        for(let j = 0; j < gridSize; j++){
            const div = document.createElement("div");
            div.classList.add("row-element")
            div.style.width = `${450/gridSize}px`;
            div.style.height = `${450/gridSize}px`;
            div.addEventListener("mouseover", function(e){
                if(e.buttons == 1 || e.buttons == 3){
                    if (erase) {
                        elementColor = "white";
                    }
                    else if (keepChangingElementColor){
                        changeElementColor();
                    }
                    div.style.backgroundColor = elementColor;
                }
            })
            div.addEventListener('mousedown', function(e){
                e.preventDefault();
                if (erase) {
                    elementColor = "white";
                }
                else if (keepChangingElementColor){
                    changeElementColor();
                }
                div.style.backgroundColor = elementColor;
            })
        
            rowContainer.appendChild(div);
        }
        grid.appendChild(rowContainer);
    }
}

changeGridSize(gridSize);

gridColorBtn.addEventListener('click', function(){
    keepChangingElementColor = false;
    changeElementColor();
});

gridEraseBtn.addEventListener('click', function(){
    gridEraseBtnContent = gridEraseBtn.textContent;
    erase = gridEraseBtnContent === "Erase" ? true : false;
    gridEraseBtn.textContent = gridEraseBtnContent === "Erase" ? "Pen" : "Erase";
})

rainbowModeBtn.addEventListener('click', ()=>keepChangingElementColor=true);

gridResetBtn.addEventListener('click', gridReset)

gridSizeBtn.addEventListener('click', (e) => {
    gridSize = Number.parseInt(prompt('What grid size do you want? (100 is the limit)'));
    while (gridSize > 100 || gridSize < 0){
        gridSize = Number.parseInt(prompt('What grid size do you want? (100 is the limit)'));
    }
    gridReset();
})

function changeElementColor(){
    const r = Math.floor(Math.random()*255)
    const g = Math.floor(Math.random()*255)
    const b = Math.floor(Math.random()*255)
    elementColor = `rgb(${r+','+g+','+b})`;
}

function gridReset(){
    grid.textContent = "";
    gridEraseBtn.textContent = "Erase"
    erase = false;
    elementColor = 'blue';
    changeGridSize(gridSize);
}

