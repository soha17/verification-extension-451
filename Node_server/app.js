const http = require('http'); // Import Node.js core module
const fs = require('fs'); // to read a file
const url = require('url');
var qs = require('querystring');
var server = http.createServer(function (req, res) {   //create web server
  console.log(req.url);
  if(req.method == 'POST'){
    if(req.url == "/loginRequest") {
      console.log('in login');
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
  else {
    if(req.url == "/register") {
        console.log('in register');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = fs.readFileSync('./../verification_microservices/templates/register.html');
        res.write(html);
        res.end();
      }

    if(req.url == "/resetPassword") {
        console.log('in reset password');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p> Reset Password form</p></body></html>');
        res.end();
      }

      if(req.url == "/privacyPolicy") {
          console.log('in privacy policy');
          res.writeHead(200, { 'Content-Type': 'text/html' });
          var html = fs.readFileSync('./../privacypolicy.html');
          res.write(html);
          res.end();
    }
    }
});

server.listen(3000); // listen for any incoming requests

console.log('Node.js web server at port 3000 is running..')



//const fs = require('fs')

// fs.readFile('./login.txt', 'utf8' , (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   if(!data) {
//     console.log('file empty');
//   }
// console.log(data);
// res.write(data.toString());
