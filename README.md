#Gatherer

## Intro

When developing Node.js applications sometimes you need to know when a whole bunch of callbacks have finished. You *could* just use synchronous methods, but that defeats the point of using Node, doesn't it? 

Gatherer lets you set a callback to be run after a whole bunch of other callbacks have returned, but because that sounds incredibly boring it uses a metaphor of parties:

Invite your guests to your gathering.
Once all your guests have accepted their invites, start the party!

### The Code

To install

	npm install gatherer
	cd node_modules/gatherer
	npm install

In your javascript file.

	var gathering = require('gatherer');

## Creating a party

Create a new gathering..

	var gathering = gatherer(); 

Create your invitations...

	_.each(files, function( file ){
		gathering.createInvitation( function( accept, decline ){
			fs.readFile( file, 'utf8', function( err, data ){
				if( !err ){
					// do something with your file data..
					accept();
				} else {
					decline();
				}
			});
		});
		
	});

Send the invitations, executing a callback when they're done. Returns 'err' if there's an err, otherwise nothing.

	gathering.sendInvitations(function(err){
		if(!err){
			// all invites were accepted
		} else {
			// some invites were declined... err === number of declines
		}
	});

You can also set a limit on how long you want to wait for the invites:

	gathering.sendInvitations(function(){
		if(err==='Error: Timed out'){
			// it waited 2000 miliseconds then gave up			
		}
	}, { timeout : 2000 }) // will give up after 2000 ms. Warning: This doesn't cancel the execution of callbacks that are still running.


### Run the tests

You need mocha and should.js.

	make test
