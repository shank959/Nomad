# Nomad
**Disclaimer:** To run this app, you will need either a MacOS or iOS device: you can run the app if your computer isn’t a Mac but your phone is an iPhone, or if your computer is a Mac but your phone isn’t an iPhone. If neither your phone or computer is an apple device, you won’t be able to run the app. If both are apple devices, we recommend running the app on your computer, but you can run it on your phone as well if you like.

Start by visiting the official Git website at git-scm.com and download the current version of git corresponding to your local machine’s operating system. Next, visit the Node.js website at nodejs.org/en and install the latest LTS version of Node.js corresponding to your local machine’s operating system, and npm will automatically be installed as well. Visit the package manager installation section of the website as well at nodejs.org/en/download/package-manager#nvm and follow the instructions there to install the nvm package manager for Node.js.

Then, using your machine’s terminal command line, or using the terminal command line of the virtual development environment of your choice (e.g. VSCode, Xcode, etc.), download our app’s Github repository onto your local machine using the command:
	git clone https://github.com/shank959/Nomad.git
Then, in the terminal, make sure you are in the project directory, and install all the dependencies listed in our package.json file using the command:
	npm install
You will also need to install yarn globally. However, before doing this, check that you have the latest LTS release of Node.js installed with the command: 
	nvm install —lts
Then, install yarn using the command:
	npm install --global yarn
Generate the yarn.lock file using the command:
	yarn



PLACEHOLDER - *explain how to gain access to MongoDB database*
Next, you’ll need to connect to the database using the command:
	node Server.js



**If you don’t have a MacOS computer:**
If you don’t have a MacOS computer, you will need to download the Expo Go app from the App Store on your iPhone. Make sure you are on a private WiFi network (hotspot works). Then, in your terminal, run the command:
	npx expo start —tunnel
Using your iPhone’s camera, scan the QR code that shows up in the terminal and choose the “Open in the Expo Go” option that pops up. Our app will then load in the Expo Go app and you can interact with it as you please.

**If you do have a MacOS computer:**
PLACEHOLDER - *explain how to run the app on iOS simulator in XCode*
