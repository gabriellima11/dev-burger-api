import { Sequelize, Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL, //Senha para o ambiente de desenvolvimento
				password_hash: Sequelize.STRING,
				admin: Sequelize.BOOLEAN,
			},
			{
				sequelize,
			},
		);

		//Criptografar senha
		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10);
			}
		});

		return this;
	}

	async comparePassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User;
