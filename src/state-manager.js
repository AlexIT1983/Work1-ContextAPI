// Наш менеджер состояний

import { createContext, useContext, useState } from "react";

const StateManagerContext = createContext({
	state: null,
	setState: () => {},
	// Одна функция для CRUD операций
	// updateState({existedKey: value}) - возможность перезаписать данные на основе existedKey
	// updateState([{id: existedId, ...data}]) - Возможность перезаписать данные в массиве конкретный элемент с existedId(существующий id)
	// updateState([{id: newId, ...data}]) - Возмжоность добавить в массив новый элемент по newId
	// updateState([{id: existedId}]) - Возможность удалить из массива элемент по existedId
	updateState: () => {},
});

// отдельная функция для проверки пустой ли объект
// преобразуем объект в массив ключей, если его длина равна 0, то он пустой
const checkEmptyObject = (obj) => Object.keys(obj).length === 0;

// функция для получения нового состояния массива
const getUpdatedState = (state, newStateData) =>
	Array.isArray(newStateData)
		? updateStateArray(state, newStateData)
		: updateStateObject(state, newStateData);

const updateStateArray = (state, newStateData) =>
	newStateData.reduce((updatedState, { id, ...newItemData }) => {
		if (checkEmptyObject(newItemData)) {
			// удаление
			return updatedState.filter(({ id: idToCheck }) => idToCheck !== id);
		}

		const foundItem = state.find(({ id: itemId }) => itemId === id);

		if (!foundItem) {
			// если не нашли объект, то добавляем его
			return [{ id, ...newItemData }, ...updatedState];
		}

		// обновление
		return updatedState.map((item) =>
			item.id === id ? { ...item, ...newItemData } : item,
		);
	}, state);

// функция для обновления состояния в объекте
const updateStateObject = (state, newStateData) =>
	Object.entries(newStateData).reduce(
		(updatedState, [key, value]) => ({
			...updatedState,
			[key]:
				typeof value === "object" && value !== null
					? getUpdatedState(updatedState[key], value)
					: value,
		}),
		state,
	);

// экспортируем наш менеджер, чтобы завернуть в него приложение
export const StateManager = ({ children, initialState }) => {
	const [state, setState] = useState(initialState);
	// функция для установки состояния
	const updateState = (newStateData) =>
		setState(getUpdatedState(state, newStateData));

	return (
		<StateManagerContext.Provider value={{ state, setState, updateState }}>
			{children}
		</StateManagerContext.Provider>
	);
};

// экспортируем хук для получения доступа к контексту
// чтобы каждый раз не импортировать useContext and StateManagerContext

export const useStateManager = () => useContext(StateManagerContext);
