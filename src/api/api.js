// Наши функции для приложения

import { HTTP_METHOD } from "../constants";

const fetchServer = (method, { id, ...payload } = {}) => {
	// функция для обработки запроса
	let url = `http://localhost:3005/todos`;
	let options = {
		method,
		headers: { "Content-type": "application/json" },
	};
	if (method === HTTP_METHOD.GET) {
		const { searchPhrase, isAlphabetSorting } = payload;
		const sortingParams = isAlphabetSorting
			? "_sort=title&_order=asc"
			: "_sort=id&_order=desc";
		url += `?${sortingParams}&title_like=${searchPhrase}`;
	} else {
		if (method !== HTTP_METHOD.POST) {
			url += `/${id}`;
		}
		if (method !== HTTP_METHOD.DELETE) {
			options.body = JSON.stringify(payload);
		}
	}

	return fetch(url, options).then((jsonData) => jsonData.json());
};

// функция добавления задачи
export const createTodo = (newTodo) => fetchServer("POST", newTodo);

// функция чтения данных
export const readTodos = (searchPhrase = "", isAlphabetSorting = false) =>
	fetchServer("GET", { searchPhrase, isAlphabetSorting });

// функция редактированя задачи
export const updateTodo = (todoData) => fetchServer("PATCH", todoData);

// функция удаления задачи
export const deleteTodo = (todoId) => fetchServer("DELETE", { id: todoId });
