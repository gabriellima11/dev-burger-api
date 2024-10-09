import * as Yup from 'yup';
import User from '../models/User';

import jwt from 'jsonwebtoken';
import Auth from '../../config/auth';

class SessionController {
	async store(request, response) {
		//Validação dos dados expostos
		const schema = Yup.object({
			email: Yup.string().email().required(), //String, tipo email, obrigatorio
			password: Yup.string().min(6).required(), // String, minimo de 6 caracteres e obrigatorio
		});

		const isValid = await schema.isValid(request.body);

		const emailOrPasswordIncorrect = () => {
			response.status(400).json({ error: 'Email or password are wrong!' });
		};

		if (!isValid) {
			return emailOrPasswordIncorrect();
		}

		const { email, password } = request.body;

		//Validação de e-mail do usuario
		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			return emailOrPasswordIncorrect();
		}

		//Validação de senha do usuario
		const isSamePassword = await user.comparePassword(password);
		if (!isSamePassword) {
			return emailOrPasswordIncorrect();
		}

		return response.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			admin: user.admin,
			token: jwt.sign({ id: user.id, name: user.name }, Auth.secret, { expiresIn: Auth.expireIn }),
		});
	}
}

export default new SessionController();
