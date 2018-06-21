function sunsetbutton(){
  window.location.href = 'http://www.google.com';
}

//listeners
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('sunsetbutton').addEventListener("click", sunsetbutton) //go to advanced-features
  console.log("started"); //post on console that the JavaScript has started working
});
