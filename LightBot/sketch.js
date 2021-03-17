let serial;
let latestData = "waiting for data";
let classifier;

// Label
let label = 'listening...';
let score=0;
// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/75AJmMgtQ/';

var dummytext=["dum"];
var botState = ["Hello human \nWant some food?",
    "I can't cook for you \nbut I know recipes","Want to hear a joke?","Ok see you"];

var currentState=0;
var conversation=["dummy text"];
var newSpeech = false;
var res="";
var book;
var recipe;

function preload() {
    // Load the model
    book=loadJSON("./recipes.json",onFileload);
    classifier = ml5.soundClassifier(soundModel + 'model.json');
  }
function setup() {
  createCanvas(480, 480);
  
  //serial 
  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem1101');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);
  //model 
  classifier.classify(gotResult);
  //speech 
  speechRec = new p5.SpeechRec(gotSpeech);
  let continuous = true;
  let interim = false;
  
  speechRec.start(continuous, interim);
  
  speech= new p5.Speech();
  speech.onLoad = voiceReady;

  fill(255);
  textFont("Comic Sans MS");
  textSize(24);
  background(50);

}

function draw(){
  if(frameCount % 300 == 0){
    background(50);
  }
  if (speechRec.resultValue) {
    res = speechRec.resultString; 
    if(res && conversation[conversation.length-1] != res){
        conversation.push(res);
        newSpeech = true;
    }
    botSpeaking(); 
    if(newSpeech){
        speech.speak(botState[currentState]);
        text(botState[currentState], 120, 200);
        //text(botState[currentState], 120, 200);
        newSpeech = false;
    }
  }
  speechRec.resultValue = false;
  //console.log(speechRec);
}
function botSpeaking(){
   speech.setVoice("Microsoft Zira Desktop");

  regex = /hello*/;
  regex1 = /yes*/;
  regex2 = /no*/;
  regex3 = /recipes*/;

  if(res.match(regex)){
    //speech.speak("Hello Human!");
    currentState=0;
  }else if(res.match(regex1)){
    //speech.speak("Hello Human!");
    currentState=1;
  }else if(res.match(regex3)){
      var booklen = Object.keys(book).length;
      var obj_keys = Object.keys(book);
      var randomKey = obj_keys[Math.floor(Math.random()*booklen)];
    recipe = book[randomKey];
    createRecipe();
      speech.speak(recipe.instructions);
  }else if(res.match(regex2)){
    currentState = 3; 
  }
 
}

function createRecipe(){
  let myDiv = createDiv("name: "+ recipe.name).style('color', 'white');
  for(var rg of recipe.ingredients){
    createDiv(rg).style('color', 'white');
  }
  createP(recipe.instructions).style('color', 'white');
}

function gotSpeech() {
  //console.log(speechRec.resultValue);
 
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  //console.log(results[0]);
  label = results[0].label;
  score = results[0].confidence;
   // The results are in an array ordered by confidence.
  //console.log(results[0]);
  label = results[0].label;
  score = results[0].confidence;
  //console.log(results[0].label,results[0].confidence);
  if(label == "clap" && score > 0.82 ){
    serial.write(1);
  }
  if(label == "knock" && score > 0.60 ){
    serial.write(2);
  }
}
function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.read();
  if (!currentString) return;
  //console.log(currentString);
  latestData = currentString;
}
function voiceReady(){
  console.log("voice ready");
}

function onFileload(){
    console.log("book loaded");
  console.log(book["2"]);
}