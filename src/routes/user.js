const User = require("../models/user");

const router = require("express").Router();

router.post("/users", async function (req, res) {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.get("/users/:number", async (req, res) => {
	try {
		const user = await User.findOne({
			phone_number: req.params.number,
		}).lean();
		if (!user) {
			return res.status(404).send({
				message: "Invalid number",
				status: false,
				number: req.params.number,
			});
		}
		res.send({
			...user,
			status: true,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.get("/users/email/:email", async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.params.email,
		}).lean();
		if (!user) {
			return res.status(404).send({
				message: "Invalid email",
				status: false,
				number: req.params.email,
			});
		}
		res.send({
			...user,
			status: true,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.delete("/users/:number", async (req, res) => {
	try {
		const user = await User.findOneAndRemove({
			phone_number: req.params.number,
		}).lean();
		if (!user) {
			return res.status(404).send({
				message: "Invalid number",
				status: false,
				number: req.params.number,
			});
		}
		res.send({
			...user,
			message: "User has been deleted",
			status: true,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.delete("/users/email/:email", async (req, res) => {
	try {
		const user = await User.findOneAndRemove({
			email: req.params.email,
		}).lean();
		if (!user) {
			return res.status(404).send({
				message: "Invalid email",
				status: false,
				number: req.params.email,
			});
		}
		res.send({
			...user,
			message: "User has been deleted",
			status: true,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
