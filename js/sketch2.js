var canvas;

var mySound;
var fft;                    // bg Gradient
var frequencyNum = 256;
var xPos;

function preload() {
  mySound = loadSound("Assets/nostalgic-tones.m4a");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  noStroke();

  getAudioContext().suspend();

  fft = new p5.FFT(0, frequencyNum);
  fft.setInput(mySound);
  
  // mySound.loop(0,1,1);
}

function draw() {

  colorMode(HSB);
  rectMode(CORNER);
  
  const data = fft.waveform();
  
  for(var x = 0; x < windowWidth; x++) {

      xPos = map(x, 0, frequencyNum, 0, windowWidth)
      var hue = map(data[x], -1, 1, 0, 360); 
    
      fill(hue, 100, 78);
      rect(xPos, 0, 5, windowHeight);
      
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
	userStartAudio();
	mySound.loop(0,1,1);

	if(getAudioContext().state == running) {
		mySound.pause();
	}
}

