# HomeAutomation
App specially build for Raspberry Pi devices. 
It's easy to use it for controlling array relays. 
The project is based on: Angular 2 CLI project and node-js server for backend. Controlling the Raspberry is implemented with Johnny-Five library.  
## Wiring
The diagram below is showing how you need to wire you Raspbery with the 4 array relay module:
[Wiring](https://drive.google.com/open?id=0Bx5LQXY9Kwz_Wjh2RWVXZ3RINlE)
## Pre - requirements
* NodeJS installed 
* npm installed 

To install them run: 
```
sudo apt-get install nodejs npm node-semver
```
## Installation 
Run : 
```
git clone https://github.com/kasadawa/home_automation.git
```
Navigate to home_automation/server and  install the dependencies: 
```
npm install
```
Then start the server : 
```
node server
```
Open the browser and navigate to ```192.168.100.5:3000```.

*NOTE! your local IP should be 192.168.100.5 (check it with ifconfig).
If your IP is different you need to rebuild the project and restart the server.
For further information go to my [instructable]()*

The default usename and password are ```admin```.
When you login you can change them from the Advanced option tab. Also after the first login you need to provide your own database:

## Create MongoDB database
Register to [mlab](www.mlab.com), create new database, add collection with name: ```devices``` , include user, copy and paste the generated URI( it should look like ```mongodb://<user>:<password>n@ds117311.mlab.com:17311/mean_test``` ).  
Also Johnny-File requires [Raspi-io](https://github.com/nebrius/raspi-io) to be installed.

## Advanced Tab 
Can configure own username and password, to pass other Database URI and also to extend the pin selection.
