function randomExclusive(a, b = 0)
{
    if(typeof a === typeof 2 && typeof b === typeof 2)
    {
        let min = a < b ? a : b;
        let max = min === a ? b : a;
        let range = max - min;
        return Math.random() * range + min;
    }
}

function manyRandoms(count, a, b = 0)
{
    if(typeof a === typeof 2 && typeof b === typeof 2 && typeof count === typeof 2)
    {
        let nums = [];
        for(let i = 0; i < count; i++)
        {
            nums.push(randomExclusive(a,b,));
        }
        return nums;
    }
}

const INIT_GRID_SIZE = 16;

const grid = document.querySelector("#grid");
grid.style.gridTemplateColumns = `repeat(${INIT_GRID_SIZE}, 1fr)`
let items = [];
let numInitItems = INIT_GRID_SIZE * INIT_GRID_SIZE;

for(let i = 0; i < numInitItems; i++)
{
    let temp = document.createElement("div");
    let red = Math.floor(randomExclusive(256));
    let green = Math.floor(randomExclusive(256));
    let blue = Math.floor(randomExclusive(256));
    temp.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 1)`;
    items.push(temp);
    grid.appendChild(temp);
}