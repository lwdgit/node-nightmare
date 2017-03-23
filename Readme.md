# Fork from [nightmare](https://github.com/segmentio/nightmare)

## Features

  * support require nodejs modules ( use `with` to deal with conflicts perfectly)
  * default import jquery@3.1.1
  * add show & hide api
  
  
## install

```bash
> npm install --save node-nightmare
```

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
  .wait('#resultStats')
  .end()
  .evaluate(function() {
      let text = $('a:contains("node-nightmare")').text();
      require('fs').writeFileSync('./results.txt', text);
      //you should install shelljs first in your workspace
      return require('shelljs').ls().stdout; 
  })
  .then(function(ret) {
     console.log(ret)
  })
```

> default require saved in __NODE namespace, but you can use it directly in `evaluate` scope

