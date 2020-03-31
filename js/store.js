window.storage = new Store(
	{
		Main: {
			sudoku: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			userSolve: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
		}
	},
	{
		SUDOKU_SOLUTION: (action, state) => {
			const { sudoku } = action;
			state.Main.sudoku = sudoku;
			return { newState: state }
		},
		SET_VALUE: (action, state) => {
			const { pos, value } = action;
			state.Main.userSolve[pos] = value;
			if(isSolvedSudoku(state.Main.userSolve)) alert('Wiiii you won');
			return { newState: state }
		}
	}
)