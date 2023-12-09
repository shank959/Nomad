# Nomad
**Disclaimer:** To run this app, you will need either a MacOS or iOS device: you can run the app if your computer isn’t a Mac but your phone is an iPhone, or if your computer is a Mac but your phone isn’t an iPhone. If both are Apple devices, we recommend running the app on your computer through the IOS simulator (discussed later on), but you can run it on your phone as well if you like. You cannot connect to the app with a public network unless you're running it on a Mac. 

Start by visiting the official Git website at git-scm.com and download the current version of Git corresponding to your local machine’s operating system. Next, visit the Node.js website at nodejs.org/en and install the latest LTS version of Node.js corresponding to your local machine’s operating system, and npm will automatically be installed as well. Visit the package manager installation section of the website as well at nodejs.org/en/download/package-manager#nvm and follow the instructions there to install the nvm package manager for Node.js.

Then, using your machine’s terminal command line, or using the terminal command line of the virtual development environment of your choice (e.g. VSCode, Xcode, etc.), download our app’s Github repository onto your local machine using the command:  

	git clone https://github.com/shank959/Nomad.git

Then, in the terminal, make sure you are in the project directory, and install all the dependencies listed in our package.json file using the command:  

	npm install

You will also need to install yarn globally. However, before doing this, check that you have the latest LTS release of Node.js installed with the command:  

	nvm install --lts

Then, install yarn using the command:  

	npm install --global yarn

Generate the yarn.lock file using the command:  

	yarn install

The Application is already connected to the MongoDB database. The server string is included within Server files.

Navigate to the file UserContext.js and set the URL variable in the format "http://{yourIP}:3000"
If you will be running the app on Mac through the IOS simulator (discussed later on), yourIP should be localhost.
If you will be running the app on your iPhone but loading the code on Windows, navigate to this Article to find your IP:
https://support.microsoft.com/en-us/windows/find-your-ip-address-in-windows-f21a9bbc-c582-55cd-35e0-73431160a1b9.
If you will be running the app on your iPhone but loading the code on Mac, navigate to this Article to find your IP:
https://www.hellotech.com/guide/for/how-to-find-ip-address-on-mac.

Ensure port 3000 is not being used by your computer for other processes.

To run the application, begin by starting the Node JS application defined within the Server.js. To do so, navigate to the Server directory of the project's working files. Next, you’ll need to connect to the server using the command:  

	node Server.js

Then, open up a new terminal process to get ready to start expo to host the frontend. 

**If you're using an iPhone to deploy the app:**
You will need to download the Expo Go app from the App Store on your iPhone. Make sure you are on a private WiFi network (hotspot works). Then, in your terminal, make sure you are in the app's root directory, Nomad, and run the command:  

	npx expo start —-tunnel

Using your iPhone’s camera, scan the QR code that shows up in the terminal and choose the “Open in the Expo Go” option that pops up. Our app will then load in the Expo Go app and you can interact with it as you please.

**If you're using MacOS to deploy the app:**
Start by checking that you have XCode installed on your Mac. If you do not, visit developer.apple.com/xcode and follow the instructions there to download the latest version of Xcode. Then, open Xcode and in the menu bar at the top of your screen, go to Xcode > Settings > Locations. Make sure that for the "Command Line Tools" option, Xcode 15.0.1 is selected. Next, in your terminal, make sure you are in the app's root directory, Nomad, and run the command:  

	npx expo start —-tunnel

Once you see a "Logs for your project will appear below." message in your terminal, press 'i' on your keyboard, and you will be able to run our app in Xcode's iOS simulator and interact with it as you please.


Thank you for taking the time to checkout our app, we hope you enjoy it! :)


