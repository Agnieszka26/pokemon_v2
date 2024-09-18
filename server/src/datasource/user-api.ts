import { MongoDataSource } from "apollo-datasource-mongodb";
import { UserModel } from "../models/User";
export default class UserMongo extends MongoDataSource<typeof UserModel> {
	checkUserExists(email: string) {
		console.log("email", email);
		return this.findByFields({ email });
	}

	async createUser(params) {
		console.log('params', params)
		const user = new UserModel({
			name: params.name,
			email: params.email,
			nick: params.nick,
			password: params.password,
			confirmed: false,
		});
		const res = await user.save();
		console.log('res', res)
		return {
			id: res.id,
			...res._doc
		}
	}
}
