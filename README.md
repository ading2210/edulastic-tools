# Edulastic Tools

This script can fetch the number of questions you got correct on any Edulastic assignment, even if the score isn't released. 

To use it, add this bookmarklet, or run script.js in the console: 
```
javascript: var r = new XMLHttpRequest(); r.open("GET", "https://raw.githubusercontent.com/ading2210/edulastic-tools/main/script.js", true); r.addEventListener("load", function(){eval(this.responseText);}); r.send();
```

Make sure the URL follows this format: 
```
https://app.edulastic.com/home/class/CLASS_ID/test/TEST_ID/testActivityReport/TEST_REPORT_ID
```

## License:
This project is licensed under the GNU GPL v3. 