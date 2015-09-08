'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/passionport',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.min.js', 
				'public/lib/angular-cookies/angular-cookies.min.js',  
				'public/lib/angular-animate/angular-animate.min.js', 
				'public/lib/angular-touch/angular-touch.min.js', 
				'public/lib/angular-sanitize/angular-sanitize.min.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1032155876806360',
		clientSecret: process.env.FACEBOOK_SECRET || 'cb6f1729c063303adf079065cfccae6a',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'g1dtfruJ9oAZo93RBGFlhByDk',
		clientSecret: process.env.TWITTER_SECRET || 'tAWOt8qHCrwJXVQvMM0wYUlo6MId61ukkoZKQEA4GsIiJfNC49',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '702886656050-nnbtua9d154japhde5b2kq2qrdj7b5p8.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'Aia5Q_zkyIdFcIZVQmCICmPU',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};