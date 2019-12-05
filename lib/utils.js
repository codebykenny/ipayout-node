const Utils = {
	extend(parent, child) {
		if (!parent) {
			throw Error('Cannot extend without parameters.');
		}

		if (!child) {
			return parent;
		}

		if (typeof parent !== 'object' || typeof child !== 'object') {
			throw Error('Parameters must be objects.');
		}

		if (Array.isArray(parent)) {
			for (let i in child) {
				parent.push(child[i]);
			}
		} else {
			for (let i in child) {
				parent[i] = child[i];
			}
		}

		return parent;
	}
}

module.exports = Utils;
