let sentence = '';
let hint = '';
let partOfHint = '';

let language = [];

// COLLECTING LANGUAGE DATA
async function fetchData() {
    const response = await fetch("./data/language.json");
    language = await response.json();
}

// ! Start game paused with a splashscreen cover !
// So it gets time to fetch the jsonarray before getting first scentence
let paused = false;

async function getData() {
    while (language.length === 0) {
        await fetchData();
    }
    numberOfSentences = language.length;
}
getData();

if (typeof scoreset === "undefined") {
    console.log('BAM defining soreset');
    scoreset = [];
}
    async function fetchHighscoreData() {
        const response = await fetch("/data/highscore.json");
        scoreset = await response.json();
    }

    async function getHighscoreData() {
        while (scoreset.length === 0) {
            await fetchHighscoreData();
        }
    }
    getHighscoreData();

// INITIATION
let wordCount = 0;
let wordCountHint = 0;
let succesCount = 0;
let totalScore = 0;

let level = 0;
let sentenceIndex = 0;

// SPLASH BUTTON
const splashScreenButton = document.getElementById('splashButton')

const mainFrame = document.querySelector('.mainFrame');
mainFrame.style.maxWidth = splashButton.offsetWidth + 'px';

const startDiv = document.querySelector('#START');
const goalDiv = document.querySelector('#GOAL');

splashScreenButton.addEventListener("click", () => {

    mainFrame.style.display = "flex";
    goalDiv.style.display = "inline-flex";
    startDiv.style.display = "inline-flex";

    splashScreenButton.style.display = "none";
    mainFrame.style.maxWidth = '60vh';

    const getNextSentenceAndHint = () => {
        sentence = language.sentence[sentenceIndex].engelska;
        hint = language.sentence[sentenceIndex].svenska;

        if (parseInt(sentenceIndex) < language.sentence.length - 1) {
            sentenceIndex++;
        } else {
            sentenceIndex = 0;
        }
    }
    getNextSentenceAndHint();

    const setupCounters = (nextScentence, nextHint) => {
        wordCount = nextScentence.split(" ").length;
        wordCountHint = nextHint.split(" ").length;
        succesCount = 0;
    }
    setupCounters(sentence, hint);

    let goalPlaceHolderNames = [];
    let startPlaceHolderNames = [];
    let cardNames = [];
    let attemptArray = [];

    const setupElementNames = () => {
        goalPlaceHolderNames = Array.from({ length: wordCount }, (_, i) => `goal${i + 1}`);
        startPlaceHolderNames = Array.from({ length: wordCount }, (_, i) => `start${i + 1}`);
        cardNames = Array.from({ length: wordCount }, (_, i) => `card${i + 1}`);
        attemptArray = Array.from({ length: wordCount }, (_, i) => ``);
    }
    setupElementNames();

    let goalPlaceholderElements = [];
    let startPlaceholderElements = [];
    let sentenceArray = [];
    let hintArray = [];
    let shuffledArray = [];

    const scentenceAndShuffleArray = () => {
        sentenceArray = sentence.split(" ");
        hintArray = hint.split(" ");
        shuffledArray = sentenceArray.slice().sort(() => Math.random() - 0.5);
    }
    scentenceAndShuffleArray();

    // INITIALIZE LABELS
    let countdownLabel = document.getElementById('countdownLabel');
    let succesCountLabel = document.getElementById('succesCountLabel');
    let totalScoreLabel = document.getElementById('scoreLabel');

    let dividingDiv = document.getElementById('dividingDiv');
    dividingDiv.style.display = "flex";
    let congratulationMessage = document.getElementById('congratulationMessage');
    let countdownElement = document.getElementById('countdownLabel');

    let globalMinutes = 0;
    let globalSeconds = 0;

    // Time is one minute per word in scentence

    let setTime = (minutes, seconds) => {
        globalMinutes = minutes;
        globalSeconds = seconds;
    }
    currentMinute = sentenceArray.length - 1;
    setTime(sentenceArray.length - 1, 0);

    let setLabels = () => {
        countdownLabel.innerHTML = `Time<br> ${globalMinutes}m ${globalSeconds}s`;
        succesCountLabel.innerHTML = 'Score<br>' + succesCount;
        totalScoreLabel.innerHTML = 'Total<br>' + parseInt(succesCount + totalScore);
    }
    setLabels();

    let setHint = () => {
        //document.querySelector('#HINT').innerHTML = ` ${ hint } `;
        document.querySelector('#HINT').innerHTML = ` ${partOfHint} `;
    }
    setHint()

    let drawGoalPads = () => {
        document.getElementById("GOAL").setAttribute("class", "rowdivPost goalDiv");

        for (let index = 0; index < wordCount; index++) {
            const names = goalPlaceHolderNames[index];
            let element = document.createElement("div");
            element.setAttribute("class", "placeholder");
            element.setAttribute("id", names);
            element.setAttribute("ondrop", "onDropAllowedArea(event)");
            element.setAttribute("ondragover", "dragOverPlaceholder(event)");
            element.setAttribute("ondragenter", "");
            element.setAttribute("ondragleave", "");
            goalPlaceholderElements[index] = element;
            document.getElementById("GOAL").appendChild(element);
        }
    }

    let removeGoalPads = () => {
        for (let index = 0; index < wordCount; index++) {
            const element = document.getElementById(goalPlaceHolderNames[index]);
            element.remove();
        }
    }

    let drawStartPads = () => {
        document.getElementById("START").setAttribute("class", "rowdivPost startDiv");

        for (let index = 0; index < wordCount; index++) {
            const name = startPlaceHolderNames[index];
            element = document.createElement("div");
            element.setAttribute("class", "placeholder");
            element.setAttribute("id", name);
            element.setAttribute("ondrop", "onDropAllowedArea(event)");
            element.setAttribute("ondragover", "dragOverPlaceholder(event)");
            element.setAttribute("ondragenter", "");
            element.setAttribute("ondragleave", "");
            startPlaceholderElements[index] = element;
            document.getElementById("START").appendChild(element);
        }
    }
    let removeStartPads = () => {
        for (let index = 0; index < wordCount; index++) {
            const element = document.getElementById(startPlaceHolderNames[index]);
            element.remove();
        }
    }

    let dealCards = () => {
        for (let index = 0; index < wordCount; index++) {
            const card = document.createElement("div");
            card.setAttribute("class", "draggableItem")
            card.setAttribute("id", cardNames[index]);
            card.setAttribute("draggable", "true");
            card.setAttribute("ondragstart", "onDragStartDraggingItem(event)");
            card.setAttribute("ondragend", "onDragEnd(event)");
            card.innerHTML = shuffledArray[index];
            document.getElementById(startPlaceHolderNames[index]).appendChild(card);
        }
    }

    let removeCards = () => {
        // console.log(wordCount);
        for (let index = 0; index < wordCount; index++) {
            const card = document.getElementById(cardNames[index]);
            card.remove();
        }
    }

    let disableCards = () => {
        for (let index = 0; index < wordCount; index++) {
            const card = document.getElementById(cardNames[index]);
            card.setAttribute("draggable", "false");
        }
    }
    let reEnableCards = () => {
        for (let index = 0; index < wordCount; index++) {
            const card = document.getElementById(cardNames[index]);
            card.setAttribute("draggable", "true");
        }
    }

    drawGoalPads();
    drawStartPads();
    dealCards();

    dragOverPlaceholder = (aEvent) => {
        aEvent.preventDefault()
    }

    let getAttempt = () => {
        let goalDivs = document.querySelectorAll('#GOAL > div');
        let cardContents = [];
        goalDivs.forEach((div) => {
            let card = div.querySelector('.draggableItem');
            if (card) {
                cardContents.push(card.innerHTML);
            }
            else {
                cardContents.push("?");
            }
        });
        return cardContents
    }

    let calculateEquality = (goal, attempt) => {
        let sum = 0;
        for (let index = 0; index < goal.length; index++) {
            if (goal[index] == attempt[index]) {
                sum++;
            }
        }
        return sum;
    }

    onDragStartDraggingItem = (aEvent) => {
        aEvent.dataTransfer.setData("text", aEvent.target.id)
        //let element = document.getElementById(aEvent.target.id);
        //element.setAttribute("class", "draggableItem dragging");
        //console.log(typeof(element))
        setTimeout(() => { aEvent.target.style.display = "none"; }, 0);
    }

    //show the item again once it is dropped/end dragging
    onDragEnd = (aEvent) => {
        //let element = document.getElementById(aEvent.target.id);
        //element.setAttribute("class", "draggableItem droped");
        //console.log("dragend" + aEvent.target)
        aEvent.target.style.display = "flex";
    }



    onDropAllowedArea = (aEvent) => {
        if (aEvent.target.hasChildNodes()) {

            //  TODO Still some mindf**kery to get his working TODO
            let data = aEvent.dataTransfer.getData("text");
            console.log("Data: ", data);

            let child = aEvent.target.id;
            console.log("Child element: ", child);

            let sourceElementId = aEvent.dataTransfer.getData("text");
            let sourceElement = document.getElementById(sourceElementId);
            console.log("Source element: ", sourceElement);

            let parentElement = sourceElement.parentElement;
            console.log("Parent element: ", parentElement);

            // parentElement.replaceChild(document.getElementById(data), sourceElement);
            // aEvent.target.replaceChild(document.getElementById(child), sourceElement);

            // parentElement.appendChild(document.getElementById(child));
            // aEvent.target.appendChild(document.getElementById(data));

        }
        else {
            console.log(element + "has droped")
            // console.log('PRE  totalScore: ' + totalScore);
            aEvent.preventDefault();
            let data = aEvent.dataTransfer.getData("text");
            aEvent.target.appendChild(document.getElementById(data));
            attemptArray = getAttempt();
            succesCount = calculateEquality(sentenceArray, attemptArray);
            succesCountLabel.innerHTML = 'Score <br>' + succesCount;
            totalScoreLabel.innerHTML = 'Total <br>' + parseInt(succesCount + totalScore);

            if (succesCount == wordCount) {
                // HIDING GAME ELEMENTS
                pauseButton.style.display = "none";
                closeGameButton.style.display = "none";
                //countdownElement.style.display = "none";
                countdownElement.style.display = "none";
                congratulationMessage.style.display = "block";


                dividingDiv.setAttribute("class", "clickable");
                dividingDiv.addEventListener('click', nextLevelClickHandler);


                // const hideGoalStartDivs = () => {
                goalDiv.style.display = "none";
                startDiv.style.display = "none";

                // console.log('PRE  succesCount: ' + succesCount + 'totalScore: ' + totalScore);
                totalScore = totalScore + succesCount + currentMinute;
                // console.log('POST succesCount: ' + succesCount + 'totalScore: ' + totalScore);

                // console.log('wordCount before cleanup: ' + wordCount );
                removeCards();
                removeGoalPads();
                removeStartPads();
                // };
                // Just a tiny timeout for the onDrop event to finish up before card is removed
                // setTimeout(hideGoalStartDivs, 50);

                // Pause TIME set new
                pauseCountdownNextLevel();
                // setTime(0,10);
            }
        }
    }

    const nextLevelClickHandler = () => {
        // console.log('divdiv clicked    wordCount:' + wordCount );
        // CLEANING UP PREVIOUS LEVEL
        getNextSentenceAndHint();
        setHint();

        setupCounters(sentence, hint);
        scentenceAndShuffleArray();

        goalPlaceHolderNames = [];
        startPlaceHolderNames = [];
        cardNames = [];
        attemptArray = [];
        setupElementNames();

        countdownLabel = document.getElementById('countdownLabel')
        succesCountLabel = document.getElementById('succesCountLabel')
        totalScoreLabel = document.getElementById('scoreLabel');

        partOfHint = '';
        setHint();


        drawGoalPads();
        drawStartPads();
        dealCards();

        // ! NOTE (to self) ! No need for removing .clickable because
        // setAttribute CHANGE class instead of appending

        // SHOW GAME ELEMENTS
        goalDiv.style.display = "inline-flex";
        startDiv.style.display = "inline-flex";

        pauseButton.style.display = "block";
        closeGameButton.style.display = "block";
        dividingDiv.setAttribute("class", "dividingDiv");
        congratulationMessage.style.display = "none";
        countdownElement.style.display = "flex";
        countdownElement.style.justifyContent = "space-around";

        // SET NEW TIME
        currentMinute = sentenceArray.length - 1;
        setTime(sentenceArray.length - 1, 0);
        setLabels();
        // clearInterval(countdownInterval);
        resumeCountdown();
        dividingDiv.removeEventListener('click', nextLevelClickHandler);
    }

    function writeToHighScore() {
        // let engText = document.querySelector('#englishInput').value;
        // let sweText = document.querySelector('#swedishInput').value;
        // let sentence = { engelska: engText, svenska: sweText };
        // globalJsonVariable.push(sentence);

        //let jsonData = JSON.stringify(globalJsonVariable);
        let jsonData = JSON.stringify(scoreset.highscores);
        console.log(typeof (jsonData))
        console.log(jsonData)

        fetch("/hs", {
            method: "post",
            headers: {
                "Content-Type": "text/plain"
                // "Content-Type": "application/json"
            },
            body: jsonData,
            //body: aText,
        })
            .then((aResponse) => {
                return aResponse.text()
            })
            .then((aDataItem) => {
                //display.innerHTML = aDataItem
                console.log(aDataItem)
            })
            .catch((aError) => {
                console.log(aError)
            })
    };

    // ! NOTE !
    // Start of timer should be the last thing
    // loaded so the player dont loose any time
    // because of slow loading of other things. !NOTE! 
    const pauseButton = document.getElementById("pauseButton");
    const closeGameButton = document.getElementById("closeGameButton");
    pauseButton.innerHTML = "PAUSE";
    closeGameButton.innerHTML = "CLOSE";
    let countdownInterval;

    const countdown = (minutes, seconds, elementId) => {
        let countDownTime = new Date();
        countDownTime.setMinutes(countDownTime.getMinutes() + minutes);
        countDownTime.setSeconds(countDownTime.getSeconds() + seconds);
        countDownTime = countDownTime.getTime();

        countdownInterval = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownTime - now;

            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (minutes < currentMinute) {
                console.log(minutes + "  " + currentMinute);
                //console.log("One minute passed!" + currentMinute);
                const numericPartOfHint = Math.ceil(wordCountHint / currentMinute);
                partOfHint = hintArray.slice(0, numericPartOfHint).join(" ");
                setHint(partOfHint);
                currentMinute--;
            }

            globalMinutes = minutes;
            globalSeconds = seconds;

            countdownElement = document.getElementById(elementId);
            if (countdownElement && !paused) {
                countdownElement.innerHTML = 'Time<br>' + minutes + "m " + seconds + "s ";
            }
            if (distance < 0) {
                clearInterval(countdownInterval);
                if (countdownElement) {
                    totalScoreLabel.style.display = "none";
                    succesCountLabel.style.display = "none";
                    pauseButton.style.display = "none";
                    dividingDiv.setAttribute("class", "clickable");
                    dividingDiv.addEventListener('click', function () {
                        location.reload();
                    });
                    pauseCountdown();
                    countdownElement.innerHTML = "OUT OF TIME <br> Click me for replay!"
                    let highscoreplace = checkHighScore(totalScore + succesCount);
                    if (highscoreplace >= 0) {
                        const input = prompt("You made it to the highscore \uD83D\uDE00 Please enter your name:");
                        const newHighscore = {
                            player: input,
                            score: totalScore + succesCount
                        };
                        scoreset.highscores.splice(highscoreplace,0,newHighscore);
                        scoreset.highscores.splice(5,1);
                        writeToHighScore();
                    }
                }
            }
        }, 1000);
    }
    // HIGH_SCORE
    const checkHighScore = (finalScore) => {
        for (let index = 0; index < scoreset.highscores.length; index++) {
            const element = scoreset.highscores[index];
            if (finalScore > element.score) {
                return index;
            }
        }
        return -1;
    };

    const pauseCountdown = () => {
        paused = true;
        disableCards();
        clearInterval(countdownInterval);
        pauseButton.innerHTML = "RESUME";
    };

    // pause countdown when waiting for next level.
    const pauseCountdownNextLevel = () => {
        paused = true;
        clearInterval(countdownInterval);
        pauseButton.innerHTML = "RESUME";
    };

    const resumeCountdown = () => {
        paused = false;
        reEnableCards();
        countdown(globalMinutes, globalSeconds, "countdownLabel");
        pauseButton.innerHTML = "PAUSE";
    };

    pauseButton.addEventListener("click", () => {
        if (paused) {
            resumeCountdown();
        } else {
            pauseCountdown();
        }
    });
    closeGameButton.addEventListener("click", () => {
        location.reload();
    });
    countdown(globalMinutes, globalSeconds, "countdownLabel");
});