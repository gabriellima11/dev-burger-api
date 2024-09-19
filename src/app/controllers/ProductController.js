import * as Yup from 'yup';
import Product from '../models/Products';

class ProductController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			id_category: Yup.number().required(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (error) {
			return response.status(400).json({ error: error });
		}

		const { filename: path } = request.file;
		const { name, price, id_category } = request.body;

		const product = await Product.create({
			name,
			price,
			id_category,
			path,
		});

		return response.status(201).json({ product });
	}

	async index(request, response) {
		const products = await Product.findAll();

		return response.json(products);
	}
}

export default new ProductController();
