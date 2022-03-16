const User = require("../models/user");

const router = require("express").Router();

router.post("/admin", async function (req, res) {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.get("/admin/:number", async (req, res) => {
	try {
		const user = await User.findOne({
			phone_number: req.params.number,
			type: "admin",
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

router.delete("/admin/:number", async (req, res) => {
	try {
		const user = await User.findOneAndRemove({
			phone_number: req.params.number,
			type: "admin",
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
			message: "Admin has been deleted",
			status: true,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
