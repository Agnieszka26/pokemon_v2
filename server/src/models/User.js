import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(  {
	name: String,
	email: { type: String, unique: true },
	nick: String,
	password: String,
	confirmed: { type: Boolean, default: false },
});
export const UserModel = mongoose.model('User', userSchema);

// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();
// 	this.password = bcrypt.hash(this.password, 10);
// 	next();
// });

