function loadScript(url)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

//variables used to communicate with Particle. If device is changed, simply modify these variables
var myParticleAccessToken = "98807f8bc207e1dd4e9667ee2521c93a8ea3f73a"
var myDeviceId =            "4c004a000351353530373132"

var topic = "DoorLock"; //topics used to send and receive data from cloud

//initially, state is 9 (loading)
//state 15 is for testing, 9 is for normal loading for use
var state = 9;

var b;
var autoClose;
var autoToggle;
var newJSON;
var particle = new Particle();

//load Particle script
loadScript('resources/particle/particle.min.js');
console.log("loaded");

function init() { //initializes the UI
  document.getElementById("login").hidden = true;
  document.getElementById("basic-controls").hidden = false;
  document.getElementById("advanced-features").hidden = true;
  document.getElementById("create-account").hidden = true;
  document.getElementById("status-bar-unlocked").hidden = true;
  document.getElementById("status-bar-locked").hidden = true;
  document.getElementById("status-bar-unlocking").hidden = true;
  document.getElementById("status-bar-locking").hidden = true;
  document.getElementById("status-bar-loading").hidden = false;
  document.getElementById("status-bar-waiting").hidden = true;
  document.getElementById("status-bar-open").hidden = true;
  document.getElementById("door-open").hidden = true;
  document.getElementById("door-close").hidden = true;
  document.getElementById("adv").hidden = true;
  document.getElementById("sign-out").hidden = true;

}
/*
The following five functions hide and unhide div elements that corresponds to the different screens of the UI
For example advanced features, basic controls etc
These functions are called by the main listener
*/
function adv() {
  document.getElementById("login").hidden = true;
  document.getElementById("basic-controls").hidden = true;
  document.getElementById("advanced-features").hidden = false;
  document.getElementById("create-account").hidden = true;
}

function signOut() {
  document.getElementById("login").hidden = false;
  document.getElementById("basic-controls").hidden = true;
  document.getElementById("advanced-features").hidden = true;
  document.getElementById("create-account").hidden = true;
}

function home() {
  document.getElementById("login").hidden = true;
  document.getElementById("basic-controls").hidden = false;
  document.getElementById("advanced-features").hidden = true;
  document.getElementById("create-account").hidden = true;
}

function go2create() {
  document.getElementById("login").hidden = true;
  document.getElementById("basic-controls").hidden = true;
  document.getElementById("advanced-features").hidden = true;
  document.getElementById("create-account").hidden = false;
}

function create() {
  document.getElementById("login").hidden = false;
  document.getElementById("basic-controls").hidden = true;
  document.getElementById("advanced-features").hidden = true;
  document.getElementById("create-account").hidden = true;
}


function open() { //called when door open button is pressed
  callButton(); //in turn calls callButton which communicates with cloud

}

function close() { //called when door close button is pressed
  callButton(); //in turn calls callButton which communicates with cloud
}

/*
THIS IS AN IMPORTANT FUNCTION
It deals with hiding and unhiding elements of UI in the basic controls screen
Each if statement corresponds to a certain state
Each state unhides relavent HTML div elements and hides all others
*/

function door() {
  if (state=="2") { //door is locked
    document.getElementById("status-bar-unlocked").hidden = true;
    document.getElementById("status-bar-locked").hidden = false;
    document.getElementById("status-bar-unlocking").hidden = true;
    document.getElementById("status-bar-locking").hidden = true;
    document.getElementById("status-bar-loading").hidden = true;
    document.getElementById("status-bar-waiting").hidden = true;
    document.getElementById("status-bar-open").hidden = true;
    document.getElementById("door-open").hidden = false;
    document.getElementById("door-close").hidden = true;


    document.getElementById("adv").hidden = false;
  }
  else if (state=="3") { //door is unlocking
    document.getElementById("status-bar-unlocked").hidden = true;
    document.getElementById("status-bar-locked").hidden = true;
    document.getElementById("status-bar-unlocking").hidden = false;
    document.getElementById("status-bar-locking").hidden = true;
    document.getElementById("status-bar-loading").hidden = true;
    document.getElementById("status-bar-waiting").hidden = true;
    document.getElementById("status-bar-open").hidden = true;
    document.getElementById("door-open").hidden = true;
    document.getElementById("door-close").hidden = true;
    document.getElementById("adv").hidden = false;
  }
  else if (state=="1") { //locking
    document.getElementById("status-bar-unlocked").hidden = true;
    document.getElementById("status-bar-locked").hidden = true;
    document.getElementById("status-bar-unlocking").hidden = true;
    document.getElementById("status-bar-locking").hidden = false;
    document.getElementById("status-bar-loading").hidden = true;
    document.getElementById("status-bar-waiting").hidden = true;
    document.getElementById("status-bar-open").hidden = true;
    document.getElementById("door-open").hidden = true;
    document.getElementById("door-close").hidden = true;

    //unhide the advanced features button
    document.getElementById("adv").hidden = false;
  }
  else if (state=="0") { //door is unlocked
    document.getElementById("status-bar-unlocked").hidden = false;
    document.getElementById("status-bar-locked").hidden = true;
    document.getElementById("status-bar-unlocking").hidden = true;
    document.getElementById("status-bar-locking").hidden = true;
    document.getElementById("status-bar-loading").hidden = true;
    document.getElementById("status-bar-waiting").hidden = true;
    document.getElementById("status-bar-open").hidden = true;
    document.getElementById("door-close").hidden = false;
    document.getElementById("door-open").hidden = true;
    //unhide the advanced features button
    document.getElementById("adv").hidden = false;
  }

  else if (state=="4") { //door is open
    document.getElementById("status-bar-unlocked").hidden = true;
    document.getElementById("status-bar-locked").hidden = true;
    document.getElementById("status-bar-unlocking").hidden = true;
    document.getElementById("status-bar-locking").hidden = true;
    document.getElementById("status-bar-loading").hidden = true;
    document.getElementById("status-bar-waiting").hidden = true;
    document.getElementById("status-bar-open").hidden = false;
    document.getElementById("door-open").hidden = true;
    document.getElementById("door-close").hidden = true;
    //unhide the advanced features button
    document.getElementById("adv").hidden = false;
  }
  else if (state=="9"||state=="6") { //loading
    document.getElementById("status-bar-unlocked").hidden = true;
    document.getElementById("status-bar-locked").hidden = true;
    document.getElementById("status-bar-unlocking").hidden = true;
    document.getElementById("status-bar-locking").hidden = true;
    document.getElementById("status-bar-loading").hidden = false;
    document.getElementById("status-bar-waiting").hidden = true;
    document.getElementById("status-bar-open").hidden = true;
    document.getElementById("door-open").hidden = true;
    document.getElementById("door-close").hidden = true;
    //advanced features button hidden during 'waiting' period
    document.getElementById("adv").hidden = true;
  }
  else if (state=="5") { //waiting
    document.getElementById("status-bar-unlocked").hidden = true;
    document.getElementById("status-bar-locked").hidden = true;
    document.getElementById("status-bar-unlocking").hidden = true;
    document.getElementById("status-bar-locking").hidden = true;
    document.getElementById("status-bar-loading").hidden = true;
    document.getElementById("status-bar-waiting").hidden = false;
    document.getElementById("status-bar-open").hidden = true;
    document.getElementById("door-close").hidden = true;
    document.getElementById("door-open").hidden = true;
    document.getElementById("adv").hidden = false;
  }
  else if (state=="15") { //testing - this can be used for debugging
    document.getElementById("login").hidden = true;
    document.getElementById("basic-controls").hidden = false;
    document.getElementById("advanced-features").hidden = true;
    document.getElementById("create-account").hidden = true;
    document.getElementById("status-bar-unlocked").hidden = false;
    document.getElementById("status-bar-locked").hidden = false;
    document.getElementById("status-bar-loading").hidden = true;
    //set loading to false for real thing
    document.getElementById("status-bar-fault").hidden = true;
    document.getElementById("door-close").hidden = true;
    document.getElementById("door-open").hidden = true;
    document.getElementById("adv").hidden = true;
    document.getElementById("sign-out").hidden = true;
  }
}


function enableAC(event) { //this is the autoclose function that uses IFTT
  if (document.getElementById('enableAC').checked) {
    console.log("checked registered");
    autoToggle = 1;
    callaToggle();
    document.getElementById("ACcontrols").hidden = false;
  }
  else {
    document.getElementById("ACcontrols").hidden = true;
    console.log("unchecked registered");
    autoToggle = 0;
    callaToggle();
  }
}

//LISTENERS which check for changes in the UI, including button presses, and call particular functions based on those
//user interactions
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('adv').addEventListener("click", adv) //go to advanced-features
  document.getElementById('sign-out').addEventListener("click", signOut) //go to sign out
  document.getElementById('return-home').addEventListener("click", home) //return home
  document.getElementById('login-button').addEventListener("click", home) //login, takes you to basic controls
  document.getElementById('login-button').addEventListener("click", initUI) //same as above
  document.getElementById('go2create').addEventListener("click", go2create) //goes to create
  document.getElementById('create').addEventListener("click", create) //goes to login
  document.getElementById('door-open').addEventListener("click", open) //calls open function, which in turn communicates with cloud
  document.getElementById('door-close').addEventListener("click", open) //calls open function, which in turn communicates with cloud
  document.getElementById('enableAC').addEventListener('change', enableAC); //autoclose function
  init(event); //unitialize the UI
  door(); //diplay door
  console.log("started"); //post on console that the JavaScript has started working
  initUI();


});

var particle = new Particle();
particle.getEventStream({ deviceId: myDeviceId, name: topic, auth: myParticleAccessToken }).then(function(stream) {
  stream.on('event', function(data) {
    console.log("Event: ", data);
    newJSON = JSON.parse(data.data); //these lines are used to parse the JSON in such a way that the data can be used inside the JavaScript
    state = newJSON.doorState;
    autoToggle = newJSON.autoOn;
    autoClose=newJSON.autoClose/1000;
    if (autoToggle==1) { //feature is on
      document.getElementById('enableAC').checked = true;
    }
    else if (autoToggle==0) { //feature is off
      document.getElementById('enableAC').checked = false;
    }
    console.log("State: ", state); //publish state to the console
    door();
  });
});


//functions used to communicate with particle
  function initUI(){ //this one gets initial data from particle to ensure communication has been established
    var fnPr = particle.callFunction({ deviceId: myDeviceId, name: 'INITUI', argument: 'arg', auth: myParticleAccessToken });

      fnPr.then(
        function(data) {
          console.log('init called succesfully:', data);
        }, function(err) {
          console.log('An error occurred:', err);
        });
  }
  function callButton(){ //main button pressed on UI, communicates that to the cloud
    var fnPr = particle.callFunction({ deviceId: myDeviceId, name: 'button', argument: 'arg', auth: myParticleAccessToken });

      fnPr.then(
        function(data) {
          console.log('callButton called succesfully:', data);
        }, function(err) {
          console.log('An error occurred:', err);
        });
  }

  function callaToggle(){ //used for the auto-lock function, called when checkbox is checked
    console.log("CALLATOGGLE REACHED: ");
    console.log(autoToggle);
    if(autoToggle==0){ //feature is turned off
      var fnPr = particle.callFunction({ deviceId: myDeviceId, name: 'autoToggle', argument: "0", auth: myParticleAccessToken });
        fnPr.then(
          function(data) {
            console.log('autoToggle called succesfully:', data);
          }, function(err) {
            console.log('An error occurred:', err);
          });
    }
    else if(autoToggle==1){ //feature is turned on
      var fnPr = particle.callFunction({ deviceId: myDeviceId, name: 'autoToggle', argument: "1", auth: myParticleAccessToken });
        fnPr.then(
          function(data) {
            console.log('autoToggle called succesfully:', data);
          }, function(err) {
            console.log('An error occurred:', err);
          });
    }
  }
