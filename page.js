function sunsetbutton(){
  window.location.href = 'https://www.buzzfeed.com/erinchack/places-nyc-locals-go-to-watch-the-sunset?utm_term=.huolWGGy#.kl20B443';
}
function roll(){
  window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
}
//listeners
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('sunsetbutton').addEventListener("click", sunsetbutton)
  document.getElementById('second').addEventListener("click", roll)
  console.log("started"); //post on console that the JavaScript has started working
});
