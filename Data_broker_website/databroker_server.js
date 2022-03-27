const http = require('http'); // Import Node.js core module
const url = require('url');
var qs = require('querystring');
var server = http.createServer(function (req, res) {   //create web server
  console.log(req.url);
  if(req.method == 'POST'){
    if(req.url == "/do-not-sell") {
      console.log('dns');
      var body = '';
      req.on('data', function (data) {
          body += data;
          // Too much POST data, kill the connection!
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6)
              req.connection.destroy();
      });
      req.on('end', function() {
            req.post = qs.parse(body);
            console.log(req.post);
            //call function here for validating user input

        });

      res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end();
      }
    }
});

server.listen(3003); // listen for any incoming requests

console.log('Node.js web server at port 3003 is running..')
