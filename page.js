function sunsetbutton(){
  window.location.href = 'https://www.buzzfeed.com/erinchack/places-nyc-locals-go-to-watch-the-sunset?utm_term=.huolWGGy#.kl20B443';
}

//listeners
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('sunsetbutton').addEventListener("click", sunsetbutton) //go to advanced-features
  console.log("started"); //post on console that the JavaScript has started working
});
