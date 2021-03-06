window.storage = new Store(
	{
		Main: {
			sudoku: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			userSolve: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			hintN: 5
		}
	},
	{
		SUDOKU_SOLUTION: (action, state) => {
			const { sudoku, positions } = action;
			state.Main.sudoku = sudoku;
			state.Main.positions = positions;
			return { newState: state }
		},
		SET_VALUE: (action, state) => {
			const { pos, value } = action;
			state.Main.userSolve[pos] = value;
			if(isSolvedSudoku(state.Main.userSolve)) alert('Wiiii you won');
			return { newState: state }
		},
		LOAD_SAVED_GAME: (action, state) => {
			const { savedGame } = action;
			state.Main = savedGame;
			return { newState: state }
		},
		USE_HINT: (action, state) => {
			state.Main.hintN = state.Main.hintN - 1;
			return { newState: state }
		}
	}
)