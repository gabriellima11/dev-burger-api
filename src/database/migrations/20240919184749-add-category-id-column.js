'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Products', 'id_category', {
			type: Sequelize.INTEGER,
			references: {
				model: 'Categories', //Na tabela de categories
				key: 'id', //Usando o id da tabela categories
			},
			onUpdate: 'CASCADE', //Quando der update vai sofrer update também na tabela de produtos
			onDelete: 'SET NULL', // Quando a tabela for excluida vai deixar como nulo
			allowNull: true, //Campo obrigatorio
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('Products', 'id_category');
	},
};
