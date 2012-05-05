	var base 	= require('base-framework'),
		_ 		= require('underscore');

	var gatherer = base.createChild();


	gatherer.addInstanceMethods({

		init : function(){

			this.reset();

			return this;

		},

		createInvitation : function( callback ){

			var self = this;

			var invite = {
				status : -1
			};

			var accept = function(){

				invite.status = 0
				self.invitesAccepted++;
				self.checkInvites();

			};

			var decline = function(){

				invite.status = 1
				self.invitesDeclined++;
				self.checkInvites();

			}

			invite.callback = function(){

				callback(accept, decline);

			}

			self.invites.push(invite);

			return self;

		},

		sendInvitations : function( callback ){

			var self = this;

			self.onPartyStarted = callback;

			_.each(self.invites, function(invite){

				invite.callback();

			});

			return self;

		},

		checkInvites : function(){

			var self = this;

			var completed = self.invitesAccepted + self.invitesDeclined;

			if(completed === self.invites.length){

				self.onPartyStarted(self.invitesDeclined);

			}

			return self;

		},

		reset : function(){

			var self = this;

			this.invites = [];
			this.invitesAccepted = 0;
			this.invitesDeclined = 0;
			this.onPartyStarted = function(){};

			return self;

		}


	});


	exports = module.exports = gatherer;
