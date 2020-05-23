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

var actions = {
	hide: function(elem) {
	  elem.style.display = "none";
	},
	show: function(elem) {
	  elem.style.display = null;
	}
  };
  
  function customQuery(query, action) {
	for (var element of document.querySelectorAll(query)) {
	  if (typeof element[action] === "function") element[action]();
	  else actions[action](element);
	}
  }
  
  ipcRenderer.on("customQuery", function (event, ...args) {
	customQuery(...args);
  });