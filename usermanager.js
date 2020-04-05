const { getLogger } = require('./logger.js');
const securePassword = require('secure-password');
const express = require('express');
const passport = require('passport');

const pwd = securePassword();
const log = getLogger("usermanager");
const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
	if (req.user) {
		res.json({
			success: true,
		});
	}
	else {
		res.status(401).json({
			success: false,
		});
	}
});

module.exports = {
	router,

	/**
	 * Callback used by passport LocalStrategy to authenticate Users.
	 */
	async authCallback(email, password, done) {
		let user = await this.getUser({ email });
		let result = await pwd.verify(user.salt + password, user.hash);
		switch (result) {
			case securePassword.INVALID_UNRECOGNIZED_HASH:
				log.error(`${email}: Unrecognized hash. I don't think this should ever happen.`);
				done(null, false);
				break;
			case securePassword.INVALID:
				log.error(`${email}: Hash is invalid`);
				done(null, false);
				break;
			case securePassword.VALID_NEEDS_REHASH:
				log.info(`${email}: Hash is valid, needs rehash`);
				user.hash = await pwd.hash(Buffer.from(user.salt + password));

				// TODO: save User to database
			// eslint-disable-next-line no-fallthrough
			case securePassword.VALID:
				log.info(`${email}: Hash is valid`);
				done(null, user);
				break;

			default:
				break;
		}
	},

	/**
	 * Converts a User into their user id.
	 * Used for persistent session storage.
	 */
	serializeUser(user, done) {
		done(null, user.id);
	},

	/**
	 * Converts a user id into a User.
	 * Used for persistent session storage.
	 */
	deserializeUser(id, done) {
		let user = this.getUser({ id });
		done(null, user);
	},

	async registerUser({ username, password }) {
		let hash = await pwd.hash(Buffer.from(password));

		// TODO: save user in database
	},

	/**
	 * Gets a User based on either their email or id.
	 * @param {*} param0
	 */
	getUser({ email, id }) {
		// TODO: get User from database
	},
};
