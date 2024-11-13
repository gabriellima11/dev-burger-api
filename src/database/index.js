import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

//Models
import User from '../app/models/User';
import Product from '../app/models/Products';
import Category from '../app/models/Category';

//Config
import configDatabase from '../config/database';

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(
			'postgresql://postgres:lVNOnfgdmGnYxCPYZCdiIYHvKsXfVCnt@autorack.proxy.rlwy.net:46698/railway',
		);
		models
			.map((model) => model.init(this.connection))
			.map((model) => model.associate && model.associate(this.connection.models));
	}

	mongo() {
		this.mongoConnection = mongoose.connect(
			'mongodb://mongo:BRSxGcVxXhgAWpMusrIjzeWbjibJxSxU@autorack.proxy.rlwy.net:43354',
		);
	}
}

export default new Database();
