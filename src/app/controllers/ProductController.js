import * as Yup from 'yup';
import Product from '../models/Products';
import Category from '../models/Category';

class ProductController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			id_category: Yup.number().required(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (error) {
			return response.status(400).json({ error: error });
		}

		const { admin: isAdmin } = await User.findByPk(request.userId);

		if (!isAdmin) {
			return response.status(401).json();
		}

		const { filename: path } = request.file;
		const { name, price, id_category, offer } = request.body;

		const product = await Product.create({
			name,
			price,
			id_category,
			path,
			offer,
		});

		return response.status(201).json({ product });
	}

	async update(request, response) {
		const schema = Yup.object({
			name: Yup.string(),
			price: Yup.number(),
			id_category: Yup.number(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (error) {
			return response.status(400).json({ error: error });
		}

		const { admin: isAdmin } = await User.findByPk(request.userId);

		if (!isAdmin) {
			return response.status(401).json();
		}

		const { id } = request.params;
		const findProduct = await Product.findByPk(id);

		if (!findProduct) {
			return response.status(400).json({ error: 'Make sure your your product ID is correct' });
		}

		let path;
		if (request.file) {
			path = request.file.filename;
		}

		const { name, price, id_category, offer } = request.body;

		await Product.update(
			{
				name,
				price,
				id_category,
				path,
				offer,
			},
			{
				where: {
					id,
				},
			},
		);

		return response.status(200);
	}

	async index(request, response) {
		const products = await Product.findAll({
			include: [
				{
					model: Category,
					as: 'category',
					attributes: ['id', 'name'],
				},
			],
		});

		return response.json(products);
	}
}

export default new ProductController();
