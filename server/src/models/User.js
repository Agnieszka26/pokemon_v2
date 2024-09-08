import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema("User", {
	name: String,
	email: { type: String, unique: true },
	nick: String,
	password: String,
	confirmed: { type: Boolean, default: false },
});
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = bcrypt.hash(this.password, 10);
	next();
});

export default userSchema;
