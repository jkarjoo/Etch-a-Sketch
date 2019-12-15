const container = document.querySelector(".grid-container");
let mousePressed = false;

window.addEventListener('mousedown', e => {
        mousePressed = true;
});

window.addEventListener('mouseup', e => {
        mousePressed = false;
});

function makeGrid(size) {
    const oldGrid = document.querySelectorAll('.grid-item')
    oldGrid.forEach((item) => {
        item.remove();
    })
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.addEventListener('click', changeColorClick);
        cell.addEventListener('mouseenter', changeColorHold);
        container.appendChild(cell).className = "grid-item";
    }
}
makeGrid(16);

const resizebtn = document.getElementById("resize");
const clearbtn = document.getElementById("clear");
const colors = document.querySelectorAll('.color');
let cells = document.querySelectorAll(".grid-item");

//Default color, adds the selected class
let currentColor = 'black';
document.getElementById(currentColor).classList.add("selected");

function changeColorClick(e) {
    if (currentColor === 'rainbow') {
        this.style.backgroundColor = generateRandomColor();
    }
    else {
        this.style.backgroundColor = currentColor;
    }
}

function changeColorHold(e) {
    if (mousePressed && currentColor === 'rainbow') {
        this.style.backgroundColor = generateRandomColor();
    }
    else if (mousePressed) {
        this.style.backgroundColor = currentColor;
    }
}

function listeners() {

    resizebtn.addEventListener("click", resizeGrid);

    clearbtn.addEventListener("click", resetGrid);

    //All of the colors have a class of 'color', and an ID of their specific color, this sets the color to ID upon click
    colors.forEach(color => {
        color.addEventListener("click", function() {
                document.getElementById(currentColor).classList.remove("selected");
                currentColor = this.id;
                document.getElementById(this.id).classList.add("selected");
        })
    })
};

listeners();

function generateRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}
function resetGrid() {
    cells = document.querySelectorAll('.grid-item'); 
    cells.forEach(cell => cell.style.backgroundColor = "");
}
function resizeGrid() {
    let grid = prompt("Enter Your Grid Size (1-100)", 30);
    let regex = /[0-9]/;
    if (!grid || isNaN(grid) || !grid.match(regex) || grid <= 0 || grid > 100) {
        alert("Input must be between 1 and 100!");
        return;
    }
    const gridNum = Number(grid);
    makeGrid(gridNum);
}