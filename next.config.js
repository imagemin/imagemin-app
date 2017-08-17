'use strict';
module.exports = {
	webpack: config => {
		config.target = 'electron-renderer';
		return config;
	},
	exportPathMap: () => ({
		'/': {
			page: '/'
		}
	})
};
