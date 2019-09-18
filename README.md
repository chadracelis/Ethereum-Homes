<h2>Getting Started</h2> 
<p></p>

Global dependencies - </br>
•	Node @9.10.0 </br>
•	Truffle @5.0.5 </br>
•	Node-gyp @3.6.2 </br>

Other - </br>
•	Ganache </br>
•	Metamask Extension for Google Chrome </br>

1. Start by cloning this repo </br>
2. Inside the new folder, npm install to install all req'd dependencies </br>
3. Open up Ganache and click 'Quick Start' </br>
5. Go to your terminal, cd your folder and '<strong>truffle compile</strong>' to compile your contracts </br>
6. Then migrate your contracts to deploy to our local blockchain aka ganache - '<strong>truffle migrate</strong>' </br>
7. Go to src/content.js and replace the address under line 13 with the address you deployed with aka ganache (This will allow the 'Add Land' form to be only visible to the contract owner. </br>
7. Go to your metamask extension and create a new network configured to your Ganache network. In that network, import a new account w/ one of the private keys inside your Ganache. </br>
8. '<strong>npm start</strong>' to load up the project on your local browser. (make sure you're on your ganache network in your metamask extension) </br>

<p></p>
<img src="./project.png" alt="Project">

