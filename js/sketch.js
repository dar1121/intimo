var canvas; //canvas

var mySound;
var fft;                    // bg Gradient
var frequencyNum = 256;
var xPos;

let mic;
let recorder;          // voice record
let soundfile;

var startButton = document.getElementById('action');
var stopButton = document.getElementById('stopButton'); // DOM
// var saveButton = document.getElementById('saveButton');
var playBackButton = document.getElementById('playBackButton');

var amp;

function preload() {
  mySound = loadSound("Assets/nostalgic-tones.m4a");
  playBackButton.style.display = "none";
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  // amp = new p5.Amplitude();
  
  noStroke();
  
  mic = new p5.AudioIn();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundfile = new p5.SoundFile();

  getAudioContext().suspend();
  
  fft = new p5.FFT(0, frequencyNum);
  fft.setInput(mySound);
  
  mySound.loop(0,1,1);
  
}

function draw() {
  background(220);
  colorMode(HSB);
  rectMode(CORNER);
  
  const data = fft.waveform();
  
  for(var x = 0; x < windowWidth; x++) {

      xPos = map(x, 0, frequencyNum, 0, windowWidth)
      var hue = map(data[x], -1, 1, 0, 360); 
    
      fill(hue, 100, 78);
      rect(xPos, 0, 5, windowHeight);
      
  }
 
    var vol = mic.getLevel();
    fill(255);
    rectMode(CENTER);
    rect(width/2, height/2 + 30, vol*500, 5);
    
    // level = amp.getLevel();
    // console.log(level);
    // noStroke();
    // fill(255, 60);
    // ellipse(windowWidth/2, windowHeight/2, level*500, level*500);

}

function startRecording() {
    mic.start();
    recorder.record(soundfile);
    console.log("recording");
    startButton.disabled = true;
    mySound.pause();
     
}
      

function stopRecording() {
  mic.stop();
  recorder.stop();
  console.log("stopped");
  startButton.disabled = false;
  soundfile.play();
  stopButton.disabled = true;
  playBackButton.style.display = "block";
  
  // mySound.play();
  // saveButton.disabled = false;

}

// function saveFile() {
//   soundfile.play();
//   // save(soundfile, "rec1.wav");
//   console.log("saving");
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playBack() {
  soundfile.play();
}

function mousePressed() {
  userStartAudio();
  mySound.loop(0,1,1);

  if(getAudioContext().state == running) {
    mySound.pause();
    }
  }
