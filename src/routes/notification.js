var { google } = require("googleapis");
var MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
var SCOPES = [MESSAGING_SCOPE];

const { default: axios } = require("axios");

const router = require("express").Router();

function getAccessToken() {
	return new Promise(function (resolve, reject) {
		var key = require("../service-account.json");
		var jwtClient = new google.auth.JWT(
			key.client_email,
			null,
			key.private_key,
			SCOPES,
			null
		);
		jwtClient.authorize(function (err, tokens) {
			if (err) {
				reject(err);
				return;
			}
			resolve(tokens.access_token);
		});
	});
}

async function sendFcmMessage({ token, body, title }) {
	const response = await getAccessToken().then(async function (accessToken) {
		var config = {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: "Bearer " + accessToken,
			},
		};

		const response = await axios.post(
			"https://fcm.googleapis.com/v1/projects/awareness-a5c48/messages:send",
			{
				message: {
					token,
					notification: {
						body,
						title,
					},
				},
			},
			config
		);
		return response.data;
	});
	return response;
}

router.post("/notification", async function (req, res) {
	try {
		const response = await sendFcmMessage(req.body);
		res.send(response);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
