// BUTTONS
let playButton = document.querySelector('#playButton');
let infoButton = document.querySelector('#infoButton');
let highscoreButton = document.querySelector('#highscoreButton');
let cancelButton = document.querySelector('#cancelButton');
let splashButton = document.querySelector('#splashButton');

// DIALOGS
let gameDialog = document.querySelector("#gameDialog")
let aboutDialog = document.querySelector("#aboutDialog")
let highscoreDialog = document.querySelector("#highscoreDialog")
let cancelDialog = document.querySelector("#cancelDialog")

let highscoreContainer = document.querySelector("#cancelDialog")

let closeButtons = document.querySelectorAll(".closeButton")

function animateButton(button, animationName, animationDuration)
{
    button.style.animationName = animationName;
    button.style.animationDuration = animationDuration;
}

function animateDialog(dialog, animationType)
{
    dialog.style.display = "flex";
    dialog.style.animation = animationType;
}

function displayDialog(dialog)
{
    dialog.style.display = "flex";
}

function loadScript(url)
{
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

function loadCSS(href)
{
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

playButton.addEventListener("click", () =>
{
    splashButton.style.display = "block";
    animateButton(playButton, "animationWithKeyframes", "1s");
    animateDialog(gameDialog, "expandGame 1s ease-out, fade-in 1s ease-out");
    displayDialog(gameDialog);
    loadScript("./scripts/main.js");
    loadCSS("./css/splash.css");
    setTimeout(() =>
    {
        loadCSS("./css/main.css");
    }, 1000); // <-- Must be same as duration of expan/contract
})

infoButton.addEventListener("click", () =>
{
    animateButton(infoButton, "animationWithKeyframes", "1s");
    animateDialog(aboutDialog, "expand 1s ease-out");
})

highscoreButton.addEventListener("click", () =>
{
    animateButton(highscoreButton, "animationWithKeyframes", "1s");
    animateDialog(highscoreDialog, "expand 1s ease-out");
    setTimeout(() =>
    {
        loadCSS("./css/highscore.css");
        loadScript("./scripts/highscore.js");
    }, 1000); // <-- Must be same as duration of expan/contract
})

cancelButton.addEventListener("click", () =>
{
    animateButton(cancelButton, "animationWithKeyframes", "1s");
    animateDialog(cancelDialog, "expand 1s ease-out");

})

closeButtons.forEach((button) =>
{
    let dialogBox = button.parentNode;
    button.style.display = "block";
    button.addEventListener("click", () =>
    {
        button.style.animation = "fade-out 1s ease-out";
        dialogBox.style.animation = "contract 1s ease-out,fade-out 1s ease-out";
        dialogBox.addEventListener("animationend", () =>
        {
            dialogBox.style.display = "none";
            button.style.animation = "fade-in 1s ease-out";
            dialogBox.style.animation = "expand 1s ease-out,fade-in 1s ease-out";
        }, { once: true });
    });
});