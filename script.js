class Color
{
    static BLACK = new Color(0, 0, 0, 1);
    static WHITE = new Color(255, 255, 255, 1);

    constructor(red, green, blue, alpha = 1)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    toCssString()
    {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    static randomColor(alpha = 1)
    {
        return new Color(randomExclusive(256), randomExclusive(256), randomExclusive(256), alpha);
    }

}

const ColorModes =
{
    BLACK: "BLACK",
    GRAYSCALE: "GRAYSCALE",
    RAINBOW: "RAINBOW"
};

const INIT_GRID_SIZE = 16;
const grid = document.querySelector("#grid");

let colorMode;
let items = [];
setup();



function fill(e)
{
    switch (colorMode)
    {
        case ColorModes.BLACK:
            e.target.style.backgroundColor = Color.BLACK.toCssString();
    }
}

function randomExclusive(a, b = 0)
{
    if (typeof a === typeof 2 && typeof b === typeof 2)
    {
        let min = a < b ? a : b;
        let max = min === a ? b : a;
        let range = max - min;
        return Math.random() * range + min;
    }
}

function manyRandoms(count, a, b = 0)
{
    if (typeof a === typeof 2 && typeof b === typeof 2 && typeof count === typeof 2)
    {
        let nums = [];
        for (let i = 0; i < count; i++)
        {
            nums.push(randomExclusive(a, b,));
        }
        return nums;
    }
}


function setup()
{
    createGrid(INIT_GRID_SIZE);
    setupButtons();
}

function createGrid(gridSize)
{
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    let numInitItems = gridSize * gridSize;

    for (let i = 0; i < numInitItems; i++)
    {
        let temp = document.createElement("div");
        temp.style.backgroundColor = Color.randomColor().toCssString();
        temp.classList.add("pixel");
        temp.addEventListener("mouseover", fill);
        items.push(temp);
        grid.appendChild(temp);
    }
    colorMode = ColorModes.BLACK;
}

function setupButtons()
{
    //clear
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", clearGrid);
}

function clearGrid()
{
    let children = Array.from(grid.childNodes);
    children.forEach(child => 
    {
        child.style.backgroundColor = Color.WHITE.toCssString();
    });
}