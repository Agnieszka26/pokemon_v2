import { MongoDataSource } from "apollo-datasource-mongodb";
import {UserModel} from "../models/User";

export default class UserMongo extends MongoDataSource<typeof UserModel> {
	checkUserExists(email: string) {
		console.log("email", email);
		return this.findByFields({ email });
	}

	async createUser(params) {
        const userDoc = new UserModel(params);
		console.log("params",  userDoc);
        await userDoc.save();
		// return //this.insertOne(params)
        const userFromDb = await UserModel.findOne({ name: 'test' });
        console.log('userFromDb', userFromDb)
	}


}
