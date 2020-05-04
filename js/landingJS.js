
//LIVESTREAM DOM ELEMENTS

var liveStreamStart = document.getElementById("startButton");
var liveStreamMute = document.getElementById("muteButton");
var liveStreamUnMute = document.getElementById("unMuteButton");

const liveStream = document.getElementById('player');

liveStreamMute.style.display = "none";
liveStreamUnMute.style.display = "none";

        // liveStream.muted = false; //MIGHT BE NECESSARY

//RECORD DOM ELEMENTS

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");
var restartButton = document.getElementById("restartButton");
var uploadButton = document.getElementById("uploadButton");
var recordingsList = document.getElementById("recordingsList");
var formats = document.getElementById("formats");
var restartButton = document.getElementById("restartButton");


recordButton.style.display = "none";
stopButton.style.display = "none";
pauseButton.style.display ="none";
restartButton.style.display ="none";
uploadButton.style.display ="none";
formats.style.display = "none";
restartButton.style.display = "none";



// RECORDING FUNCTIONS


URL = window.URL || window.webkitURL;

var gumStream;            
var rec;              
var input;              

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext 

function expand() {
  recordButton.style.display = "block";
  stopButton.style.display = "none";
  pauseButton.style.display ="none";
  restartButton.style.display ="none";
  uploadButton.style.display ="none";
  formats.style.display = "block";
  formats.innerHTML = "Click to start recording.";
  console.log("expanded");
}

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);

function startRecording() {
  console.log("recordButton clicked");
  var constraints = { audio: true, video:false };

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

    recordButton.style.display = "none";
    stopButton.style.display = "block";
    pauseButton.style.display = "block";

    audioContext = new AudioContext();

    document.getElementById("formats").innerHTML="Recording...";
    gumStream = stream;
    input = audioContext.createMediaStreamSource(stream);
    rec = new Recorder(input,{numChannels:1})
    rec.record()

    console.log("Recording started");

  }).catch(function(err) {
      recordButton.style.display = "block";
      stopButton.style.display = "none";
      pauseButton.style.display = "block"
  });
}

function pauseRecording(){
  console.log("pauseButton clicked rec.recording=",rec.recording );
  if (rec.recording){
    //pause    
    rec.stop();
    pauseButton.style.backgroundImage = "url('Assets/Imgs/resume.png')";
  }else{
    //resume
    rec.record()
    pauseButton.style.backgroundImage = "url('Assets/Imgs/pause.png')";

  }
}

function stopRecording() {
  console.log("stopButton clicked");

  
  stopButton.style.display = "none";
  recordButton.style.display = "none";
  pauseButton.style.display = "none";
  uploadButton.style.display = "block";
  formats.style.display = "none";
  pauseButton.innerHTML="Pause";
  rec.stop();
  gumStream.getAudioTracks()[0].stop();
  rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
  
  var url = URL.createObjectURL(blob);
  var au = document.createElement('audio');
  var li = document.createElement('li');
  var link = document.createElement('a');

  var filename = new Date().toISOString();

  au.controls = true;
  au.src = url;


  //add the new audio element to li
  li.appendChild(au);
  
  
  //restart link
  restartButton.style.display = "block";
  restartButton.addEventListener("click", recordScreen);

  //upload link
  uploadButton.style.display = "block";
  var upload = document.getElementById('uploadButton');
  upload.addEventListener("click", function(event){
      var xhr=new XMLHttpRequest();
      xhr.onload=function(e) {
          if(this.readyState === 4) {
              console.log("Server returned: ",e.target.responseText);
          }
      };
      var fd=new FormData();
      fd.append("audio_data",blob, filename);
      xhr.open("POST","upload.php",true);
      xhr.send(fd);
      var list = document.getElementById("recordingsList");
      list.removeChild(list.childNodes[0]); 
      formats.style.display = "block";

      formats.innerHTML = "Thank you for submitting to Intimo. Please check back on Monday at 6pm to hear your recording."
      restartButton.style.display = "block";
      restartButton.addEventListener("click", function(event){
        recordButton.style.display = "block";
      stopButton.style.display = "none";
      pauseButton.style.display = "none";
      uploadButton.style.display = "none";
      restartButton.style.display = "none";
      formats.style.display = "block";
      formats.innerHTML="Click to start Recording"  
      }
        );



  })
  li.appendChild(document.createTextNode (" "))//add a space in between
  li.appendChild(upload)//add the upload link to li

  //add the li element to the ol
  recordingsList.appendChild(li);


}

function recordScreen() {
    recordButton.style.display = "block";
      stopButton.style.display = "none";
      pauseButton.style.display = "none";
      uploadButton.style.display = "none";
      restartButton.style.display = "none";
      var list = document.getElementById("recordingsList");
      list.removeChild(list.childNodes[0]); 
      formats.style.display = "block";
      formats.innerHTML="Click to start Recording"  
      

}

// LIVESTREAM CONTROL FUNCTIONS       

  function startAudio() {
    // userStartAudio();
    liveStreamMute.style.display = "block";
    liveStreamStart.style.display = "none";
    liveStreamUnMute.style.display = "none";
    console.log("audioStarted");
  }

  function muteAudio() {
      liveStreamUnMute.style.display = "block";
      liveStreamStart.style.display = "none";
      liveStreamMute.style.display = "none";
      liveStream.muted = true;
      console.log("muted");
  } 

  function unMuteAudio() {
    liveStreamUnMute.style.display = "none";
    liveStreamStart.style.display = "none";
    liveStreamMute.style.display = "block";
    liveStream.muted = false;
    console.log("unmuted");
  }


// ARCHIVE DOM ELEMENTS

let file1 = document.getElementById("file1");
let file2 = document.getElementById("file2");
let file3 = document.getElementById("file3");
let file4 = document.getElementById("file4");
let file5 = document.getElementById("file5");
let file6 = document.getElementById("file6");
let file7 = document.getElementById("file7");
let file8 = document.getElementById("file8");

// ARCHIVE PLAY FUNCTIONS

  function playFile1() {
    file1.play();
  }

  function playFile2() {
    file2.play();
  }

  function playFile3() {
    file3.play();
  }

  function playFile4() {
    file4.play();
  }

  function playFile5() {
    file5.play();
  }

  function playFile6() {
    file6.play();
  }

  function playFile7() {
    file7.play();
  }

  function playFile8() {
    file8.play();
  }

  function pauseFile1() {
    file1.pause();
  }

  function pauseFile2() {
    file2.pause();
  }

  function pauseFile3() {
    file3.pause();
  }

  function pauseFile4() {
    file4.pause();
  }

  function pauseFile5() {
    file5.pause();
  }

  function pauseFile6() {
    file6.pause();
  }

  function pauseFile7() {
    file7.pause();
  }

  function pauseFile8() {
    file8.pause();
  }







        