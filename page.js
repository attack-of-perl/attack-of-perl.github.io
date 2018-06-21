function sunsetbutton(){
  window.location.href = 'https://www.google.com/search?q=best+places+to+see+the+sunset+in+nyc&rlz=1C5CHFA_enUS764US764&oq=best+places+to+see+the+sunset&aqs=chrome.1.69i57j0l5.6605j1j7&sourceid=chrome&ie=UTF-8';
}

//listeners
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('sunsetbutton').addEventListener("click", sunsetbutton) //go to advanced-features
  console.log("started"); //post on console that the JavaScript has started working
});
