// компонент поиск

import { useRef } from "react";
import { debounce } from "./utils";
import styles from "./search.module.css";
import { useStateManager } from "../../../../state-manager";

export const Search = () => {
	const {
		state: {
			options: { searchInput, isAlphabetSorting },
		},
		updateState,
	} = useStateManager();

	const runSearch = (phrase, sorting) => {
		updateState({
			options: {
				searchInput: phrase,
				searchPhrase: phrase,
				isAlphabetSorting: sorting,
			},
		});
	};

	const debouncedRunSearch = useRef(debounce(runSearch, 1600)).current;

	const onChange = ({ target }) => {
		updateState({
			options: {
				searchInput: target.value,
			},
		});

		debouncedRunSearch(target.value, isAlphabetSorting);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		runSearch(searchInput);
	};

	return (
		<form className={styles.search} onSubmit={onSubmit}>
			<input
				className={styles.input}
				type="text"
				value={searchInput}
				placeholder="Поиск.."
				onChange={onChange}
			/>
		</form>
	);
};
