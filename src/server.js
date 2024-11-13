import app from './app';
const port = 3001;

app.listen(port, '0.0.0.0', () => {
	console.log(`Server iniciado na porta ${port}`);
});
