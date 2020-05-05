//nothing to show here
(async () => {
	const fs = require('fs').promises;

	for (let i = 0; i < 10; i++) {
		let list = await fs.readdir('.', {withFileTypes: true});
		for (let file of list) {
			if (file.isFile()) {
				console.log('Reading file', file.name);
				await fs.readFile(file.name, 'utf-8');
			}
		}
	}

	console.log('done');
})();
