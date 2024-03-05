var url_regex = /https:\/\/assessment\.peardeck\.com\/student\/assessment\/([a-f0-9]+)\/class\/([a-f0-9]+)\/uta\/([a-f0-9]+)\/itemId\/([a-f0-9]+)/;

//overwrite the addEventListener function with one that blocks certain events
Element.prototype._addEventListener = Element.prototype.addEventListener;
Element.prototype.addEventListener = function(type, listener, options) {
  var blocked_events = ["focus", "focusin", "focusout", "blur", "visibilitychange", "webkitvisibilitychange", "mozvisibilitychange", "msvisibilitychange", "focusin", "focusout"]
  var fullscreen_events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"]
  
  if (blocked_events.includes(type)) {
    console.log("edulastic-tools: blocked event "+type)
  }

  //intercept fullscreenchange events to block ones where fullscreen is being exited
  else if (fullscreen_events.includes(type)) {
    console.log("edulastic-tools: intercepted event "+type);
    var callback = function(event) {
      if (document.fullscreenElement == null && url_regex.test(window.location)) {
        console.log("edulastic-tools: blocked fullscreenchange function call");
      }
      else {
        listener(event);
      }
    }
    this._addEventListener(type, callback, options);
  }
    
  else {
    this._addEventListener(type, listener, options);
    console.log("edulastic-tools: allowed event "+type);  
  }
};

//overwrite the other addEventListener functions
function payload() {
  window.addEventListener = Element.prototype.addEventListener;
  window._addEventListener = Element.prototype._addEventListener;
  document.addEventListener = Element.prototype.addEventListener;
  document._addEventListener = Element.prototype._addEventListener;
  console.log("edulastic-tools: overwritten addEventListener");  

  //indicator that script has been successful
  document.oldTitle = document.title;
  document.title = "js injection success";
  setTimeout(function(){document.title = document.oldTitle}, 5000)
}
window.onload = payload;
