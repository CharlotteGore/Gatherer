	var should = require('should'),
		gatherer = require('../lib/gatherer');

	describe('using gatherer with 100 invitations, no timeout', function(){

		describe('and all invitations accepted' ,function(){

			it('fires a callback without an error', function(done){

				var gathering = gatherer();

				for(var i = 0; i < 100; i++){

					gathering.createInvitation(function(accept, decline){

						setTimeout(function(){

							accept();

						}, Math.floor((Math.random() * 500)) );

					});

				}

				gathering.sendInvitations(function(err){

					err.should.not.be.ok;
					gathering.invitesAccepted.should.equal(100);
					done();

				});

			
			});

		});


		describe('using gatherer with 100 invitations, no timeout', function(){

			describe('and some invites declined', function(){

				it('fires a callback with error', function(done){

					var gathering = gatherer();

					for(var i = 0; i < 100; i++){

						gathering.createInvitation(function(accept, decline){

							setTimeout(function(){

								(Math.round(Math.random())) ? accept() : decline();

							}, Math.floor((Math.random() * 500)) );

						});

					}

					gathering.sendInvitations(function(err){

						err.should.be.ok;

						(gathering.invitesAccepted + gathering.invitesDeclined).should.equal(100)

						done();

					});

				
				});

			});

		});

	});


/*


'' -> 'Hello world'
'@@ -0,0 +1,11 @@\n+Hello world\n'


'Hello world' -> 'Goodbye cruel world'
'@@ -1,9 +1,17 @@\n-Hello\n+Goodbye cruel\n  wor\n'

'Goodbye cruel world' -> 'Goodbye cruel world, we\'ll miss you'
'@@ -12,8 +12,24 @@\n el world\n+, we\'ll miss you\n'

*/