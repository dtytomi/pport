'use strict';

module.exports = {
	db: 'mongodb://localhost/passionport-dev',
	app: {
		title: 'passionport - Development Environment'
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