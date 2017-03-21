# Fork from [nightmare](https://github.com/segmentio/nightmare)

## Features

  * support require nodejs modules ( use `with` to deal with conflicts perfectly)
  * default import jquery@3 
  * add show & hide api
  
## example

  ```
    const Nightmare = require('node-nightmare')
    Nightmare({show: false})
    .goto('https://google.com')
    .show()
    .evaluate(function() {
        var lodash = require('lodash')  //
        return $('*').length;
    })
  ```
