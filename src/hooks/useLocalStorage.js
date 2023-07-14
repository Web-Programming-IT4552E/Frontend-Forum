import React, { useState } from "react";
/**
 *
 * @param {*} key
 * @param {*} initialValue
 * @returns
 * @param storedValue This function is used to get the value from local storage and return initialValue if not found
 * @param setValue This function is used to set the value of local storage
 */
const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === "undefined") {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});
	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
};

export default useLocalStorage;
