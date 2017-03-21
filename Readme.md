# Fork from [nightmare](https://github.com/segmentio/nightmare)

## Features

  * support require nodejs modules ( use `with` to deal with conflicts perfectly)
  * default import jquery@3 
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
  })
  .then(function(ret) {
     console.log(ret)
  })
  ```
