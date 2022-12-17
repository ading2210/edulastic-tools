# Edulastic Tools
![jsdelivr monthly badge](https://data.jsdelivr.com/v1/package/gh/ading2210/edulastic-tools/badge/month)
![jsdelivr weekly badge](https://data.jsdelivr.com/v1/package/gh/ading2210/edulastic-tools/badge/week)
![jsdelivr daily badge](https://data.jsdelivr.com/v1/package/gh/ading2210/edulastic-tools/badge/day)

This is a collection of scripts for screwing around with the online testing software Edulastic.

## Exit Bypass
This script can bypass Edulastic's check for whether you're on the assignment or not, allowing you to switch out of the assignment tab undetected. 

To use it, add this bookmarklet, or run fullscreen.js in the console: 
```js
javascript: var r = new XMLHttpRequest(); r.open("GET", "https://cdn.jsdelivr.net/gh/ading2210/edulastic-tools@latest/fullscreen.js", true); r.addEventListener("load", function(){eval(this.responseText);}); r.send();
```

Run the script on the Edulastic assignments page or the prompt to enter fullscreen. Once you run the script, a new tab should open, and the title will be changed to "js injection successful" for a few seconds to indicate that the script was successful. You can then close the original tab and complete the Edulastic assignment as normal, but if you ever exit fullscreen or switch tabs, it won't be recorded. However, if you ever refresh the page, the script's changes will be reverted. 

## Unreleased Scores
This script can fetch the number of questions you got correct on any Edulastic assignment, even if the score isn't released. 

To use it, add this bookmarklet, or run scores.js in the console: 
```js
javascript: var r = new XMLHttpRequest(); r.open("GET", "https://cdn.jsdelivr.net/gh/ading2210/edulastic-tools@latest/scores.js", true); r.addEventListener("load", function(){eval(this.responseText);}); r.send();
```

Make sure the URL follows this format: 
```
https://app.edulastic.com/home/class/{CLASS_ID}/test/{TEST_ID}/testActivityReport/{TEST_REPORT_ID}
```

## License:
This project is licensed under the GNU GPL v3. 

Source code: https://github.com/ading2210/edulastic-tools