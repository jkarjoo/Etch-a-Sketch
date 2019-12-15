const container = document.querySelector(".grid-container");
const resizebtn = document.getElementById("resize");
const clearbtn = document.getElementById("clear");
let mousePressed = false;

window.addEventListener("mousedown", function() {
        mousePressed = true;
});

window.addEventListener("mouseup", function() {
        mousePressed = false;
});

resizebtn.addEventListener("click", resizeGrid);

function resizeGrid() {
    let grid = prompt("Enter Your Grid Size (1-100)", 30);
    let regex = /[0-9]/;
    if (!grid || isNaN(grid) || !grid.match(regex) || grid <= 0 || grid > 100) {
        alert("Input must be between 1 and 100!");
        return;
    }
    removeOldGrid();
    const gridNum = Number(grid);
    makeGrid(gridNum);
}

function removeOldGrid() {
    const oldGrid = document.querySelectorAll('.grid-item')
    oldGrid.forEach((item) => {
        item.remove();
    })
}

clearbtn.addEventListener("click", resetGrid);

function resetGrid() {
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach(cell => cell.style.backgroundColor = "");
}

function makeGrid(size) {
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.addEventListener('click', changeColorClick);
        cell.addEventListener('mouseenter', changeColorHold);
        container.appendChild(cell).className = "grid-item";
    }
};

makeGrid(16);

let currentColor = "black";
document.getElementById(currentColor).classList.add("selected");

const colors = document.querySelectorAll('.color');
    colors.forEach(color => {
        color.addEventListener("click", function() {
            document.getElementById(currentColor).classList.remove("selected");
            currentColor = this.id;
            document.getElementById(this.id).classList.add("selected");
    })
});

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

function generateRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}


