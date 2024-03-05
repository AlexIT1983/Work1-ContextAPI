// Задание 1. Переработать список дел. Contex API(7.Context API)
// JSON Server

import { useEffect, useState } from "react";
import { Todo, ControlPanel } from "../components";
import { readTodos } from "../api";
import { useStateManager } from "../state-manager";
import styles from "./App.module.css";

export const App = () => {
	const { state, setState } = useStateManager();
	const {
		todos,
		options: { searchPhrase, isAlphabetSorting },
	} = state;

	const [isLoadingLabel, setIsLoadingLabel] = useState(false);

	useEffect(() => {
		setIsLoadingLabel(true);

		readTodos(searchPhrase, isAlphabetSorting)
			.then((loadedTodos) => {
				setState({
					...state,
					todos: loadedTodos,
					options: {
						...state.options,
						isLoading: false,
					},
				});
			})

			.finally(() => setIsLoadingLabel(false));
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{isLoadingLabel ? (
					<div className={styles.loadingLabel}></div>
				) : (
					todos.map(({ id, title, completed }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
						/>
					))
				)}
			</div>
		</div>
	);
};
