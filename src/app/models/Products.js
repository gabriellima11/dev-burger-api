import Sequelize, { Model } from 'sequelize';

class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.INTEGER,
				path: Sequelize.STRING,
				offer: Sequelize.BOOLEAN,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `https://devburger-api-production.up.railway.app/product-file/${this.path}`;
					},
				},
			},
			{
				sequelize,
			},
		);
		return this;
	}

	static associate(models) {
		this.belongsTo(models.Category, {
			foreignKey: 'id_category',
			as: 'category',
		});
	}
}

export default Product;
