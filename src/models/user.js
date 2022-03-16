const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		phone_number: {
			type: String,
			validate: (value) => {
				if (value.length < 10 || value.length > 10) {
					throw Error("Invalid phone number");
				}
			},
			required: true,
		},
		email: {
			type: String,
			unique: true,
		},
		username: { type: String, required: true, unique: true },
		type: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
