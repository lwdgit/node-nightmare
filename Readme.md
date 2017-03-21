# Fork from [nightmare](https://github.com/segmentio/nightmare)

## Features

  * support require nodejs modules ( use `with` to deal with conflicts perfectly)
  * default import jquery@3.1.1
  * add show & hide api
  
## example

```javascript
const Nightmare = require('node-nightmare')
Nightmare({show: false}) 
  .goto('https://google.com')
  .wait('body')
  .show()
  .insert('input[aria-label="Search"]', 'node-nightmare github.com')
  .click('input[type="submit"]')
  .wait(1000)
  .wait('body')
  .hide()
  .evaluate(function() {
      return $('a:contains("node-nightmare")').text();
      // default require saved in __NODE namespace, but you can use it directly in `evaluate` scope
  })
  .then(function(ret) {
     console.log(ret)
  })
```

> default require saved in __NODE namespace, but you can use it directly in `evaluate` scope

