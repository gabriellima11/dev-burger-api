import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
		});

		//Validar dados
		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (error) {
			return response.status(400).json({ error: error });
		}

		const { name } = request.body;

		//Validar repetido
		const categoryExists = await Category.findOne({
			where: {
				name,
			},
		});

		if (categoryExists) {
			return response.status(400).json({ error: 'Category already exists' });
		}

		//Criar
		const category = await Category.create({
			name,
		});

		return response.status(201).json({ category });
	}

	//Listar
	async index(request, response) {
		const categories = await Category.findAll();

		return response.json(categories);
	}
}

export default new CategoryController();
