'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				primaryKey: true,
				allowNull: false, //campo obrigatório
				type: Sequelize.UUID, //gerador de id universal
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING, //tipo string
				allowNull: false, //campo obrigatório
			},
			email: {
				type: Sequelize.STRING, //tipo string
				allowNull: false, //campo obrigatório
				unique: true, //campo único
			},
			password_hash: {
				//senha criptografada
				type: Sequelize.STRING,
				allowNull: false,
			},
			admin: {
				//usuario administrador
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				//auditoria data de criacao
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				//auditoria data de update
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Users');
	},
};
