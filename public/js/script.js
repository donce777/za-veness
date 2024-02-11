const answers = [
    "NEMA NE!",
    "Sigurna li si?",
    "Sigurna sigurna?",
    "Me lazis!",
    "NEMA NE. MORAS!",
    "OK, cao kozo",
]

const soundsNo = [
    "no1.mp3",
    "no2.mp3",
    "no3.mp3",
    "no1.mp3",
    "no2.mp3",
    "no3.mp3",
]


const images = [
    "images/no1.gif",
    "images/no2.gif",
    "images/no3.gif",
    "images/no4.gif",
    "images/no5.gif",
    "images/no6.gif",
]

const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
const message2 = document.getElementById('message2');
const heartContainer = document.getElementById('heart-container');
const heart = document.getElementById('heart');
const soundYes = document.getElementById('soundYes')
let soundNo = document.getElementById('sound');
let i = 0;
let size = 6;
let clicks = 0;

document.addEventListener('DOMContentLoaded', function() {
    let backgroundSound = document.getElementById('background-sound');
    backgroundSound.volume = 0.15;
    backgroundSound.play();
  });

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "./public/images/spongebobe.gif";
        refreshBanner();
    }
    clicks++;
    soundNo.src = `./public/sounds/${soundsNo[clicks]}`;
    soundNo.play();
    banner.src = `./public/${images[clicks]}`;
    message2.innerHTML = answers[i];
    // increase button height and width gradually to 250px
    const sizes = [10, 20, 25, 15, 30]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.padding = `${size}px`;
    let total = answers.length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = "NE";
        i++;
    } else if (i === total - 1) {
        alert(answers[i]);
        i = 0;
        no_button.innerHTML = "No";
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
        location.reload();
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "images/yes.gif";
    soundYes.play();
    refreshBanner();
    displayHeart();

    document.addEventListener('click', function (event) {
        createFallingObject(event.clientX, event.clientY);
      });
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
});

function createFallingObject(x, y) {
    const object = document.createElement('div');
    object.className = 'falling-object';
    
    // Set the position property to absolute
    object.style.position = 'absolute';
    
    // Adjust the starting position based on the cursor coordinates
    object.style.left = (x - 25) + 'px'; // Adjusted by 25px to center horizontally
    object.style.top = (y - 200) + 'px';  // Adjusted by 25px to center vertically
  
    // Add your custom SVG content here
    object.innerHTML = ' <img id="rose" src="./public/images/rose.png" alt="rose" /> ';
  
    document.getElementById('container').appendChild(object);
  
    object.addEventListener('animationend', function () {
      // Remove the element after the animation ends
      this.remove();
    });
  }


function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function displayHeart() {
    heartContainer.style.visibility = "visible";
    heart.style.width = "20px";
    heart.style.height = "20px";
    heart.style.transform = "scale(200)";
}