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
  let url_regex = /https:\/\/app\.edulastic\.com\/home\/class\/([a-f0-9]+)\/test\/([a-f0-9]+)\/testActivityReport\/([a-f0-9]+)/;
  if (!url_regex.test(window.location)) {
    alert("Error: Invalid URL.\n\nFor reference, the URL should look like this:\nhttps://app.edulastic.com/home/class/CLASS_ID/test/TEST_ID/testActivityReport/TEST_REPORT_ID");
    return;
  }
  let matches = url_regex.exec(window.location);
  let group_id = matches[1];
  let test_id = matches[3];
  let request_url = `https://app.edulastic.com/api/test-activity/${test_id}/report?groupId=${group_id}`;
  
  let token_list = JSON.parse(localStorage.getItem("tokens"));
  let token = localStorage.getItem(token_list[0]);

  let headers = [
    ["Authorization", token]
  ];
  http_get(request_url, function(){
    let report = JSON.parse(this.responseText);
    let wrong = report.result.testActivity.wrong;
    let total = report.result.questionActivities.length;
    alert(`${total-wrong}/${total} questions correct`);
  }, headers);
}

main();
