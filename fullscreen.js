var base_url = "https://raw.githubusercontent.com/ading2210/edulastic-tools/main"
if (typeof document.dev_env != "undefined") {
  base_url = document.dev_env;
}

async function get_hash(str) {
  if (!window.TextEncoder || !crypto.subtle.digest) {
    return "";
  }
  let str_encoded = new TextEncoder().encode(str);
  let hash_buffer = await crypto.subtle.digest("SHA-256", str_encoded);
  let hash_array = Array.from(new Uint8Array(hash_buffer));
  let output = "";
  for (let byte of hash_array) {
    output += byte.toString(16).padStart(2, "0");
  }
  return output
}

async function main() {
  let url_regex = /https:\/\/app\.edulastic\.com.+/;
  if (!url_regex.test(window.location)) {
    alert("Error: Invalid URL.\n\nFor reference, the URL should look like this:\nhttps://app.edulastic.com/student/assessment/*\nhttps://app.edulastic.com/home/assignments");
    return;
  }

  //self preservation code
  let token_list = JSON.parse(localStorage.getItem("tokens"));
  let token = localStorage.getItem(token_list[0]);
  let user_api = "https://app.edulastic.com/api/user/me";
  let r = await fetch(user_api, {
    headers: {"Authorization": token}
  });
  let user = (await r.json()).result;
  for (let district_id of user.districtIds) {
    let hash = await get_hash(district_id);
    if (hash === "b833afd0c1266f488d2efa5437eea3c696ef7406ed7642c0f4c0d463c017cfe5") {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      return;
    }
  }
  
  let url = base_url+"/fullscreen_payload.js";
  let r2 = await fetch(url);
  let script_text = await r2.text();
  let w = window.open(window.location.href);
  let script = w.document.createElement("script");
  script.innerHTML = script_text;
  w.document.body.appendChild(script);
}

main();