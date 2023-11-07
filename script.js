// Number of circles we have in the game
var numCircles = 6;
// The color variable should be an array that contains as many random RGB colors as there are circles.
var colors = [];
// This pickedColor is the RGB color we are trying to guess (string)
var pickedColor;
// This is the default color of the game.
let defaultColor = "#582c99";

// Grab all appropriate elements from the HTML.
var circles = document.querySelectorAll(".circle"); // No change here
var colorToGuess = document.getElementById("colour-to-guess"); // Adjusted to match the HTML ID
var resultMessage = document.getElementById("result-message"); // Adjusted to match the HTML ID
var banner = document.querySelector("h1"); // Using h1 as the banner selector as per your HTML structure
var resetButton = document.getElementById("restart"); // Adjusted to match the HTML ID

// The init function should reset the stage and set a new RGB color
function init() {
  // Call the reset function
  reset();
  // Set the text of the colorToGuess element to display the correct RGB color
  colorToGuess.textContent = pickedColor;
}

// Setup so that when the reset button is clicked, the reset function gets called
resetButton.addEventListener("click", reset);

// Define what should happen when any circle is clicked.
function clickCircle() {
  // When a circle is clicked, it should check if the color of a circle
  // is the same as the color to be guessed. If it is, you have won. You should set
  // the display message to "You win", change the text of the reset button to "Play again"
  // and set the color of each circle and of the banner to be the color we were guessing.
  // If the color you clicked on was incorrect, you should set the color of the circle you just clicked to be the default color
  // and change the result text to be "Try again"
  var clickedColor = this.style.backgroundColor.replace(/\s+/g, '');
  var correctColor = pickedColor.replace(/\s+/g, '');
  if (clickedColor === correctColor) {
    resultMessage.textContent = "You win!";
    resetButton.textContent = "Play again";
    changeColors(pickedColor);
    banner.style.backgroundColor = pickedColor;
  } else {
    this.style.backgroundColor = defaultColor;
    resultMessage.textContent = "Try again";
  }
}

// The reset function should set new values for the colors array by calling genRandomColors.
// pick a color from these and set it as the color you are trying to pick. This color
// should be obtained by calling chooseColor.
// Display the color RGB value on the main page.
// Set the color of the circles to the random colors you generated.
// Set the color of the banner to the default color, set the text of the reset
// button to "Restart" and the result text to an empty String.
// Ensure that if a circle is clicked that the clickCircle function is called.
function reset() {
  colors = genRandomColors(numCircles);
  pickedColor = chooseColor();
  colorToGuess.textContent = pickedColor;
  for (var i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = colors[i];
    circles[i].removeEventListener("click", clickCircle); // Remove any old event listeners
    circles[i].addEventListener("click", clickCircle);
  }
  banner.style.backgroundColor = defaultColor;
  resetButton.textContent = "Restart";
  resultMessage.textContent = "";
}

// Write a function to make a random RGB color. For RGB colors are
// made up of 3 values from 0 to 256. You should basically generate 3 random
// numbers and create a string "rgb(0,0,0)" but replace the 0 with random values.
// return that string
function makeColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Write a function that will set new values for the colors array.
// It should contain as many RGB color strings as there are circles
function genRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(makeColor());
  }
  return arr;
}

// Return one of the 6 RGB colors you created and stored in colors
// this function should set the color you are guessing.
function chooseColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Write a function that will change the color of each circle
// as well as the h1 background to be the color that is passed in.
function changeColors(color) {
  // change each circle to match given color
  for (var i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = color;
  }
  // change the banner color as well
  banner.style.backgroundColor = color;
}

// Initialize the game
init();
