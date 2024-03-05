// начальное состояние
export const initialState = {
	todos: [],
	editingTodo: {
		id: null,
		title: "",
	},
	options: {
		searchPhrase: "",
		isAlphabetSorting: false,
		searchInput: "",
		isLoading: true,
	},
};
