/* métodos sequelize
store --> cadastrar/adicionar
index --> listar vários
show --> listar apenas um
update --> atualizar
delete --> deletar
*/

import User from '../models/User';

import { v4 } from 'uuid';
import * as Yup from 'yup';

class UserController {
	async store(request, response) {
		//Validação de dados usando YUP
		const schema = Yup.object({
			name: Yup.string().required(), //String e obrigatorio
			email: Yup.string().email().required(), //String, tipo email, obrigatorio
			password: Yup.string().min(6).required(), // String, minimo de 6 caracteres e obrigatorio
			admin: Yup.boolean(), // tipo boolean
		});

		const isValid = await schema.isValid(request.body); //Validar dados, retorna true ou false

		try {
			schema.validateSync(request.body, { abortEarly: false }); //Se estiver válido roda, abortEarly: false mostra todos os erros(não deixa abortar no primeiro)
		} catch (error) {
			return response.status(400).json({ error: error.errors }); //Se estiver inválido retorna os erros e status 400
		}

		const { name, email, password, admin } = request.body;

		//Verificar e-mail duplicado
		const userExists = await User.findOne({
			where: {
				email,
			},
		});

		if (userExists) {
			return response.status(400).json({ error: 'User already exists' });
		}

		const user = await User.create({
			id: v4(),
			name,
			email,
			password,
			admin,
		});

		return response.status(201).json({
			id: user.id,
			name,
			email,
			admin,
		});
	}
}

export default new UserController();
