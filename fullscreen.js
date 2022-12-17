base_url = "https://raw.githubusercontent.com/ading2210/edulastic-tools/main"
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
  let url_regex = /https:\/\/app\.edulastic\.com\/student\/assessment\/([a-f0-9]+)\/class\/([a-f0-9]+)\/uta\/([a-f0-9]+)\/itemId\/([a-f0-9]+)/;
  if (!url_regex.test(window.location)) {
    alert("Error: Invalid URL.\n\nFor reference, the URL should look like this:\nhttps://app.edulastic.com/student/assessment/{ID}/class/{ID}/uta/{ID}/itemId/{ID}");
    return;
  }
  
  var url = base_url+"/fullscreen_payload.js";
  http_get(url, function(){
    var w = window.open(window.location.href);
    var script = w.document.createElement("script");
    script.innerHTML = this.responseText;
    w.document.body.appendChild(script);
  })
}

init();