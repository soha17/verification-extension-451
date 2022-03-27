const http = require('http'); // Import Node.js core module
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
        res.write('<html><body><p> Some registration form</p></body></html>');
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
          res.write('<html><head><title>Privacy Policy</title></head> <body><h1>Privacy Policy for Uni-verify (as on 26th March 2022) [1]</h1><p>At Uni-verify Browser Extension, accessible from the Chrome Extension Web Store, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Uni-verify Browser Extension and how we use it.If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our extension with regards to the information that they shared in the Uni-verify Browser extension. This policy is not applicable to any information collected offline or via channels other than this website.</p><h2>Consent</h2><p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p><h2>Information we collect</h2><p> The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p><p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p><p>When you register for an Account, we may ask for your contact information, including items such as first name, last name, contact number, California state ID or drivers license and email address.</p><h2>How we use your information</h2><p>We use the information we collect in various ways, including to:</p><ul><li>Provide, operate, and maintain our browser extension</li><li>Verify your identity in a seamless and standardized manner enabling you to spend less time while interacting with a data broker’s verification request</li><li>Provide data brokers with a signal that confirms that you have been properly verified</li><li>Improve, personalize, and expand our browser extension</li><li>Develop new features, and functionality</li></ul><h2>Log Files</h2><p>Uni-verify Browser extension does not log or collect any data other than the data previously mentioned. We do not log any information that is personally identifiable.</p><h2>Advertising Partners Privacy Policies</h2><p>Uni-verify browser extension does not have any advertising partners. We do not serve advertisements and links. We do not make use of Web Beacons and cookies. No third-party ad servers or ad networks automatically receive your IP address and you will not be subject to any personalized advertisement while using the Uni-verify browser extension.</p><h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2><p>Under the CCPA, among other rights, California consumers have the right to:</p><p>Request that a business that collects a consumers personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p><p>Request that a business delete any personal data about the consumer that a business has collected.</p><p>Request that a business that sells a consumers personal data, not sell the consumers personal data.</p><p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at privacypolicy@univerify.com.</p><h2>GDPR Data Protection Rights</h2><p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p><p>The right to access: You have the right to request copies of your personal data. We may charge you a small fee for this service.</p><p>The right to rectification: You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p><p>The right to erasure: You have the right to request that we erase your personal data, under certain conditions.</p><p>The right to restrict processing: You have the right to request that we restrict the processing of your personal data, under certain conditions.</p><p>The right to object to processing: You have the right to object to our processing of your personal data, under certain conditions.</p><p>The right to data portability: You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p><p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at privacypolicy@univerify.com.</p><h2>Childrens Information</h2><p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Uni-verify Browser extension does not knowingly collect any Personal Identifiable Information from children under the age of 16. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p><p>[1] Privacy Policy Template from Privacy Policy Generator (https://www.privacypolicygenerator.info)</p></body></html>');
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
