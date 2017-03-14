var Nightmare = require('.');
var nightmare = Nightmare({ show: false })

nightmare
  .on('page', function (type, ...args) { 
      console.log(args);
  })
  .goto('https://google.com').show().wait(1000).hide().wait(1000).end()
  .then(function (result) {
    //console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });