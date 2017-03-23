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
  .show()
  .goto('https://google.com')
  .wait('input[type="submit"]')
  .insert('input[name="q"]', 'node-nightmare github.com')
  .click('input[type="submit"]')
  .wait(1000)
  .wait('#resultStats')
  .end()
  .evaluate(function() {
      let text = $('a:contains("node-nightmare")').text();
      require('fs').writeFileSync('./results.txt', text);
      return require('shelljs').cat('./results.txt').stdout;//you should install shelljs in your workspace
      // default require saved in __NODE namespace, but you can use it directly in `evaluate` scope
  })
  .then(function(ret) {
     console.log(ret)
  }).catch(function(e) {
     console.log(e)
  })
```

> default require saved in __NODE namespace, but you can use it directly in `evaluate` scope

