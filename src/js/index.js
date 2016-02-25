/**
 * the animation for the arrows
 * @param  {string} classname the name of the class that each arrow has
 */
(classname=>{
  // https://gist.github.com/james2doyle/5694700
  // easing functions http://goo.gl/5HLl8
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) {
      return c/2*t*t + b;
    }
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };
  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
  })();

  function scrollTo(to, callback, duration) {
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }
    function position() {
      return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }
    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
    duration = (typeof(duration) === "undefined") ? 500 : duration;
    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof(callback) === "function") {
          // the animation is done so lets callback
          callback();
        }
      }
    };
    animateScroll();
  }

  //adding the scroll to the arrows
  var addListener = function(i) {
    i.addEventListener("click",function(e) {
      scrollTo(document.getElementById(i.href.substr(i.href.indexOf("#")+1)).offsetTop,function() {
        document.location = i.href;
      });
      e.preventDefault();
    });
  };

  var arrows = document.getElementsByClassName(classname);
  for (var i = 0; i < arrows.length; i++) {
    addListener(arrows[i]);
  }
})("full--arrow");
