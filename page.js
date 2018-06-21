function sunsetbutton(){
  window.location.href = 'https://www.buzzfeed.com/erinchack/places-nyc-locals-go-to-watch-the-sunset?utm_term=.huolWGGy#.kl20B443';
}
function roll(){
  window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
}
function idibari(){
  window.location.href = 'https://www.instagram.com/idibari/?hl=en';
}

//listeners
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('sunsetbutton').addEventListener("click", sunsetbutton)
  document.getElementById('second').addEventListener("click", roll)
  document.getElementById('idibari').addEventListener("click", idibari)
  console.log("started"); //post on console that the JavaScript has started working
});
