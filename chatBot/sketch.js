let myCharacteristic;
let input;
//speech rec
let speechRec;
let speech;
let res = "";
let conv=["dummy text"];
let botRes=["dummy text"];
let botWords="dummy text";
let newSpeech = false;
var voices;
var voice;
//animations
var balls = [];
var angle = 0;

function setup() {
  createCanvas(400, 400);
  //loading speechrec
  angleMode(DEGREES);
  generateCircles();
  
  speechRec = new p5.SpeechRec(gotSpeech);
  let continuous = true;
  let interim = false;
  
  speechRec.start(continuous, interim);
  
  speech= new p5.Speech();
  speech.onLoad = voiceReady;
  speech.started(startSpeaking);
  speech.ended(endSpeaking);
  

  function startSpeaking(){
     changeColor('#FFF126');
  }
  function endSpeaking(){
     changeColor('white');
  }
}

function draw() {
  background(50);
  ret = speechRec.resultValue;
  drawRing(200);
  if (ret) {
    res = speechRec.resultString;
    if(res){ 
      conv.push(res);
      createConversation(res,'human');
      newSpeech = true;
    }
    botState();
    
    if(newSpeech){
      botRes.push(botWords);
      speech.speak(botWords);
      createConversation(botRes[botRes.length-1],'robot');
      newSpeech = false;
    }
  }
  speechRec.resultValue = false;
}
//change moving circle's color based on commands
function changeColor(clr) {
  for (i = 0; i < balls.length; i++) {
    balls[i].changeFill(clr);
  }
}

function generateCircles() {
  for (var i = 0; i < 360; i++) {
    var rad = random(100, 200);
    var x = rad * cos(i);
    var y = rad * sin(i);
    balls.push(new myCircle(x, y));
  }
}

//draw ring of circles
function drawRing(val) {
  //noFill();
  push();
  translate(width / 2, height / 3);
  for (i = 0; i < balls.length; i++) {
    //stroke('#222EE5');
    //strokeWeight(2);
    noStroke();
    balls[i].show();
  }
  pop();

}

function createConversation(str,tag){
  let myDiv = createDiv(tag+": " + str);
  myDiv.style('font-size', '18px');
  myDiv.style('color', 'white');
}

function botState(){
  if(random(100) % 1 == 0){
    botWords = "aaaaaaa I hadddddd a buggggggg";
  }
   //bot state 1
    regex = /online*/;
    regex1 = /stupid|\bdumb\b|\busless\b/;
    regex2 = /can (.*) do/;
    regex3 = /stop/;
    regex4 = /square root of -1/;
    regex5 = /no/;
    if (res.match(regex)) {
      botWords = 'hello human';
    }else if (res.match(regex1)) {
      botWords = 'that is not nice human';
    }else if (res.match(regex2)) {
      botWords = 'I can change voice. ';
      voices = speech.voices;
      voice = random(voices);
      speech.setVoice(voice.name);
      botWords += "Do you like my new voice?";
      //newSpeech = false;
      //speech.speak(botWords);
      //speech.speak(botWords);
    }else if (res.match(regex3)) {
      botWords = 'I will stop talking. Bye bye';
      speech.speak(botWords);
      createConversation(botWords,'robot');
      newSpeech = false;
      
    }else if(res.match(regex4)){
    botWords = "aaaaaaaa I I I I I haddddddd aaaaaa buuuuuuuuuuggggggg";
      speech.speak(botWords);
      createConversation("aaaaaaaa I I I I I haddddddd aaaaaa buuuuuuuuuuggggggg",'robot');

  }else if (res.match(regex5)) {
      botWords = "Ok that\'s fine." ;
      voices = speech.voices;
      voice = random(voices);
      speech.setVoice(voice.name);
      botWords += "How about this?";
      //newSpeech = false;
      //speech.speak(botWords);
      //speech.speak(botWords);
    }else{
      botWords = "The stuff you are saying is boring. Say something else human." ;
    }
    
}

function gotSpeech() {
  if (speechRec.resultValue) {
    console.log(speechRec); 
  }
}

function voiceReady(){
  //console.log(speech.voices);
}


class myCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(10, 20);
    this.angle = 0;
    this.color = 200;
  }
  show() {
    fill(this.color);
    circle(this.x, this.y, this.r);
    rotate(this.angle);
    this.angle += 0.001;
    
  }
  changeFill(val) {
    this.color = val;
  }
  blink() {
    if (frameCount % 12 == 0) {
      this.color = 200;
    } else {
      this.color = '#FFF126';
    }
  }

}