let scoreset = [];

// DATA COLLECTION
async function fetchData()
{
    const response = await fetch("/data/highscore.json");
    scoreset = await response.json();
    //console.log(scoreset.player[0]);
}

async function getData()
{
    while (scoreset.length === 0)
    {
        await fetchData();
    }
}
getData();

setTimeout(populateTable, 1000);
function populateTable()
{
    let table = document.querySelector("#highscoreTable"); // select the table element
    let numberOfScores = scoreset.highscores.length;
    console.log(numberOfScores)
    for (let index = 0; index < numberOfScores; index++)
    {
        const element = scoreset.highscores[index];
        console.log(element);
        let row = document.createElement("tr");
        let name_cell = document.createElement("td");
        let h1_1 = document.createElement("h1");
        h1_1.style.textAlign = "left";
        let score_cell = document.createElement("td");
        let h1_2 = document.createElement("h1");
        h1_2.style.textAlign = "right";
        h1_1.textContent = element.player;
        h1_2.textContent = element.score;

        row.appendChild(name_cell);
        name_cell.appendChild(h1_1);
        row.appendChild(score_cell);
        score_cell.appendChild(h1_2);
        table.appendChild(row);
    }
}