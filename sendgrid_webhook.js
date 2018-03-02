const localtunnel = require('localtunnel');
    
localtunnel(5000, { subdomain: 'fdcgvhbmn' }, 
function(err, tunnel) {
      console.log('LT running')
    });

