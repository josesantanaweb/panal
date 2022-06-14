// Truncate string
export const truncate: any = (str: string, n: number) => {
	return str.length > n
		? str.substr(0, n - 1) + ' ' + truncate(str.substr(n - 1, str.length), n)
		: str;
};

// Retorna la primera letra de un string
export const findFirstLetter = (string: string) => {
	let extractedString = [];

	for (var i = 0; i < string?.length; i++) {
		if (
			string.charAt(i) === string.charAt(i).toUpperCase() &&
			string.charAt(i) !== ' '
		) {
			extractedString.push(string.charAt(i));
		}
	}
	if (extractedString.length > 1) {
		return extractedString[0] + extractedString[1];
	} else {
		return extractedString[0];
	}
};

// Save localstorage
export const saveValue = (key: string, value: any) => {
	if (typeof value === 'object') {
		localStorage.setItem(key, JSON.stringify(value));
	} else {
		localStorage.setItem(key, value);
	}
};

// Read localstorage
export const getValue = (key: string, shouldParse?: any) => {
	if (shouldParse) {
		return JSON.parse(localStorage.getItem(key) || '{}');
	}
	return localStorage.getItem(key);
};

export const removeItem = (key: string) => localStorage.removeItem(key);

export const getUserLocalStorage = JSON.parse(getValue('user'));
