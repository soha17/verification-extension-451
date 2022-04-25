# verification-extension-451

When California residents exercise their rights under CCPA by asking data brokers to give them their information or delete their information, these users are asked to verify their identities. This verification process can be a nuisance, since it’s not uniform across different data brokers and users have to go through it with each data broker. Instead of making users navigate this arduous process each time they have to verify their identities with data brokers, we’re proposing a browser extension that verifies the user once, and sends a signal to the data broker that this user has already been verified and can skip the normal verification process. 

<h2> Clone this git reposetory </h2> 
Navigate to your terminal and use the following command to clone the repositoory in your desired directoory: <br> </br>
<code> git clone https://github.com/soha17/verification-extension-451.git </code> 

<h2> Install the Uni-verify extension in Chrome in developer mode</h2>

Steps to install extension in Chrome in developer mode: https://bashvlas.com/blog/install-chrome-extension-in-developer-mode 

<h2> Software architecture and worflow of the extension </h2>

![EPS_Plugin_architecture](https://user-images.githubusercontent.com/101018642/165030083-754ea37b-e905-4cdc-8722-5e3f1d2ee7bc.jpg)

<h2> Install and run services </h2>

<h3>Run a sample data broker website</h3> 
In order to test the uni-verify extension you will need to navigate to a data broker website. For this project we assume that data broker websites have a form with certain UI elemts so that the etxension can run successfully. We provide a sample data broker website. <br></br>
Using your terminal navigate to /Data_broker_website directory and run the sample website <br>

<code> cd Data_broker_website </code> <br>
<code> python3 -m http.server </code> <br>

Note: If you don't have python3, you can find instruction to download and install it here: https://www.python.org/downloads/ <br>

To access the website, using Chrome navigate to <br>
<code> localhost:8000/requestform.html </code>  <br> 

Now to run the backend server of the data broker website. From the Data_broker_website directory in your terminal run the following command: <br> 

<code> node databroker_server.js </code> 
<br> 

<b>Note:</b> If you don't have node, you can find instructions to download and install it here: https://nodejs.org/en/download/package-manager/ <br> 


<h3> Run the verification micro-services </h3> 
We need to run the verification micro-service so that the extension can verify a usre's identity. <br> 
In a new terminal window go into /verification_microservices directory and run the following commands: <br> 
<code> cd verification_microservices </code> <br>
<code> python3 -m venv .venv </code> <br> 
<code> source .venv/bin/activate </code> <br>
<code> pip install flask </code> <br> 
If you don't have pandas installed do <code> pip install pandas </code> <br> 
<code> python -m flask run </code> <br> 

Your Flask micro-service should be up and running! 

Note: <br> 
If you don't have python3, you can find instruction to download and install it here: https://www.python.org/downloads/ <br> 
You can find more information on Flask here: https://flask.palletsprojects.com/en/2.1.x/installation/ <br> 

<h3> Run the Node server for the extension </h3> 

In a new terminal wnavigate to the /Node_server folder and run the following command: 
<code> cd Node_server </code> <br> 
<code> node app.js </code> <br>

This service lets you  access the extension’s registration and privacy policy pages. <br> 

<h4> You now have all the services up and running! </h4> <br> 

<h2> Workflow </h2> 
1. Go to your Chrome browser and navigate to <code> localhost:8000/requestform.html </code> <br> 
2. In your extension you should be able to see the Uni-verify extension, click on it, you should see the extension popup window. <br> 
3. Click on the "Registration" button. This should opoen a new tab with the registration form. <br>
4. Fill out the form with appropriate values and hit submit. You should see message indicating your successful registration. <br>
5. Go back to the data broker website and fill out the form. <br>
6. Click on the login button on the extension windown. Login using your username and password that you registered with. <br> 
7. Click on the verify button. <br> 
8. You should see on the form the uni-verify has verified you. <br> 
9. Click the submit button on the data broker form. <br> 
10. Go to your terminal window which has the data_broker server running. You should see the data the form submitted through the post request. You should see the "uni-verify-signal" field set to 1, which indicates that you have been verified to be a legitimate CA resident and that the data broker does not need to do any additional verification. <br>

Note: "uni-verify-signal" field set to 0, indicates that the user is not registered with uni-verify services and the data broker should use other means to verify this user. 

<h2> Current work in progress </h2> 
1. Currently we are in the middle of implementing 2FA using Twillio. The code for this can be found at: <> <br> 

In order to run this code and test 2FA capabilities, you will have to register with Twillio, the steps to that are bellow: <br> 

steps
  
<br> 
  
  
After you have registered an account with Twillio you will have to slightly modify the code as follows: <br> 
  
 steps
 
<br> 

Now follow all the steps under section "Install and run survices" to run all the services. <br> 
Follow steps 1-9 under the "Workflow" section above. <br> 
1. After you click on the verify button on the extension, you should get an SMS with an OPT. <br>
2. Enter the value in the OPT field on the extension window and hit verify again. <br> 
You should see on the form the uni-verify has verified you. <br> 
3. Click the submit button on the data broker form. <br> 
4. Go to your terminal window which has the data_broker server running. You should see the data the form submitted through the post request. You should see the "uni-verify-signal" field set to 1, which indicates that you have been verified to be a legitimate CA resident and that the data broker does not need to do any additional verification. <br>

Note: "uni-verify-signal" field set to 0, indicates that the user is not registered with uni-verify services and the data broker should use other means to verify this user. 

<h2> Future work </h2> 
1. Currently we don't have proper access tokens for login and authentication. As next steps we will implement Google's OAuth 2.0 for authentication. <br>
2. Currently there is no database integration. We have looked into different kinds of databases and want to use a NoSql database as we don't need a relational database for our use case. <br> 


<h2> Refrences </h2> 

All images and logos used under: https://www.canva.com/policies/free-media-license-agreement-2022-01-03/

Reference to the Node js Server: https://nodejs.org/es/docs/guides/getting-started-guide/

Reference for the chrome extension guide: https://developer.chrome.com/docs/extensions/mv3/devguide/
