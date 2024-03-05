function http_get(url, callback, headers=[], method="GET", content=null) {
  let request = new XMLHttpRequest();
  request.addEventListener("load", callback);
  request.open(method, url, true);
  for (const header of headers) {
    request.setRequestHeader(header[0], header[1]);
  }
  request.send(content);
}

function main() {
  var token = prompt("Enter token:");
  if (token == "" || token == null) {
    alert("Token required.");
    return;
  }

  validate_token(token);
}

function validate_token(token) {
  var url = "https://assessment.peardeck.com/api/user/me";
  var headers = [
    ["Authorization", token]
  ];

  http_get(url, function(){
    var response = JSON.parse(this.responseText);
    if (this.status == 200) {
      set_token(token, response.result);
    }
    else {
      var response_pretty = JSON.stringify(response, null, 2);
      alert("Error:\n"+response_pretty)
    }
  }, headers)
}

function set_token(token, user) {
  localStorage.clear();
  sessionStorage.clear();

  var new_key = `user:${user._id}:role:${user.role}`;
  localStorage.setItem("tokens", `["${new_key}"]`);
  localStorage.setItem(new_key, token);
  sessionStorage.setItem("tokenKey", new_key);

  window.location.href = "https://assessment.peardeck.com/";
}

main();
