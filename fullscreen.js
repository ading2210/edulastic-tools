base_url = "https://raw.githubusercontent.com/RyanFu08/edulastic-tools/main"
if (typeof document.dev_env != "undefined") {
  base_url = document.dev_env;
}

function http_get(url, callback, headers=[], method="GET", content=null) {
  let request = new XMLHttpRequest();
  request.addEventListener("load", callback);
  request.open(method, url, true);
  for (const header of headers) {
    request.setRequestHeader(header[0], header[1]);
  }
  request.send(content);
}

function init() {
  
  var url = base_url+"/fullscreen_payload.js";
  http_get(url, function(){
    var w = window.open(window.location.href);
    var script = w.document.createElement("script");
    script.innerHTML = this.responseText;
    w.document.body.appendChild(script);
  })
}

init();
