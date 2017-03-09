var Nightmare = require('.');
var nightmare = Nightmare({ show: true })

nightmare
  .on('page', function (type, ...args) {
        
            console.log(args);
        
  })
  .goto('https://m.alibaba.com/wholesale/products/audi%20a4%20diesel.html')
  .then(function (result) {
    //console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });