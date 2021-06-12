class Color
{
    static BLACK = new Color(0, 0, 0, 1);
    static WHITE = new Color(255, 255, 255, 1);
    static GRAY = new Color(127, 127, 127, 1);
    static LIGHT_GRAY = new Color(230, 230, 230, 1);

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
const html = document.querySelector("html");
let gridlines = true;

let drawing = false;
let colorMode;
let divs = [];
setup();



function fill(e)
{
    if(drawing)
    {
        switch (colorMode)
        {
            case ColorModes.BLACK:
                e.target.style.backgroundColor = Color.BLACK.toCssString();
                break;
            case ColorModes.GRAYSCALE:
                fiftyshades();
                break;
            case ColorModes.RAINBOW:
                e.target.style.backgroundColor = Color.randomColor().toCssString();
                break;
        }
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
    let numItems = gridSize * gridSize;
    divs.length = 0;

    for (let i = 0; i < numItems; i++)
    {
        let temp = document.createElement("div");
        temp.style.backgroundColor = Color.WHITE.toCssString();
        if(gridlines)
        {
            temp.style.borderStyle = "solid";
            temp.style.borderColor = Color.BLACK.toCssString();
            temp.style.borderWidth = "1px";
        }
        else
        {
            temp.style.border = "none";
        }
        temp.classList.add("pixel");
        temp.addEventListener("mousedown", (e) => 
        {
            drawing = !drawing;
            if(drawing)
            {
                fill(e);
            }
        });
        temp.addEventListener("mouseover", fill);
        divs.push(temp);
        grid.appendChild(temp);
    }
    colorMode = ColorModes.BLACK;
}

function setupButtons()
{
    //toggle gridlines
    const toggleGridlinesButton = document.querySelector("#toggle-gridlines-button");
    toggleGridlinesButton.addEventListener("click", toggleGridlines);

    //clear
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", clearGrid);

    //new size
    const newSizeButton = document.querySelector("#new-size-button");
    newSizeButton.addEventListener("click", newSize);

    //black
    const blackButton = document.querySelector("#black-button")
    blackButton.addEventListener("click", () => colorMode = ColorModes.BLACK);

    //grayscale

    //rainbow
    const rainbowButton = document.querySelector("#rainbow-button");
    rainbowButton.addEventListener("click", () => colorMode = ColorModes.RAINBOW);
}

function clearGrid()
{
    divs.forEach(div => div.style.backgroundColor = Color.WHITE.toCssString());
}

function newSize()
{
    let input = prompt('How many "pixels" per side? (64 max)');
    let num = parseInt(input);
    if(!isNaN(num))
    {
        if(num > 64)
        {
            num = 64;
        }
        deleteGrid();
        createGrid(num);
    }
}

function deleteGrid()
{
    while(grid.firstChild)
    {
        grid.removeChild(grid.firstChild);
    }
}

function toggleGridlines()
{
    gridlines = !gridlines;
    divs.forEach(div =>
    {
        if(gridlines)
        {
            div.style.borderStyle = "solid";
            div.style.borderColor = Color.BLACK.toCssString();
            div.style.borderWidth = "1px";
        }
        else
        {
            div.style.border = "none";
        }
    });
}

function fiftyshades()
{

}