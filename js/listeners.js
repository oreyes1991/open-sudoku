document.addEventListener('DOMContentLoaded', () => {
	emptyBlockListeners();
	keyboardListener();
	mobileControllsListener();
	optionListener();
});
/**
 * Listen only to the empty blocks
 */
function emptyBlockListeners() {
	const blocks = document.querySelectorAll('.empty');
	blocks.forEach(block => {
		block.addEventListener('click', () => {
			selectLine(block);
		});
		block.addEventListener('contextmenu', (ev) => {
			ev.preventDefault();
			selectNoteLine(block);
		})
	})
}

function selectNoteLine(block) {
	const selectedBefore = document.querySelectorAll('.selected');
	const selectedNoteBefore = document.querySelectorAll('.note-selected');
	selectedNoteBefore.forEach(old => { old.classList.remove('note-selected') });
	selectedBefore.forEach(old => { old.classList.remove('selected') });
	block.classList.add('note-selected')
}

/**
 * select a block and deselect the old one;
 * @param {HTMLElement} block 
 */
function selectLine(block) {
	const selectedBefore = document.querySelectorAll('.selected');
	const selectedNoteBefore = document.querySelectorAll('.note-selected');
	selectedNoteBefore.forEach(old => { old.classList.remove('note-selected') });
	selectedBefore.forEach(old => { old.classList.remove('selected') });
	block.classList.add('selected')
}
/**
 * Listen to the keyboard, if a number is press and some block is selected dispatch value
 */
function keyboardListener() {
	document.addEventListener('keydown', (ev) => {
		const key = parseInt(ev.key);
		if(!isNaN(key)) {
			setValue(key);
		}
	})
}
/**
 * Set value to the selected or note-selecte block
 * @param {Number} key Integer from 0 to 9
 */
function setValue(key) {
	const selected = document.querySelector('.selected');
	const noteSelected = document.querySelector('.note-selected');
	if (selected !== null) {
		window.storage.dispatch({
			type: 'SET_VALUE',
			pos: getLinearPosition(selected),
			value: key
		});
		selected.querySelector('.solution').innerHTML = key !== 0 ? key : "";
		selected.querySelector('.notes').innerHTML = '';
	} else if(noteSelected !== null) {
		window.storage.dispatch({
			type: 'SET_VALUE',
			pos: getLinearPosition(noteSelected),
			value: 0
		});
		noteSelected.querySelector('.solution').innerHTML = '';
		noteSelected.querySelector('.notes').innerHTML += `|${key}|`;
		if(key === 0) noteSelected.querySelector('.notes').innerHTML = '';
	}
}
/**
 * Given a position y and x convert it to a linear postion 
 * (y*9) + x
 * @param {HTMLElement} block 
 */
function getLinearPosition(block) {
	let fc = block.classList[0];
	let pos = fc.slice(6);
	pos = pos.split('-');
	return parseInt(pos[0]) * 9 + parseInt(pos[1]);
}
/**
 * Listen to the mobile controlls
 */
function mobileControllsListener() {
	const controlls = document.querySelectorAll('.mobile-controls > *');
	controlls.forEach(con => {
		con.addEventListener('click', () => {
			let n = con.classList[0].split('-');
			let key = parseInt(n[1]);
			setValue(key)
		})
	})
}

function optionListener() {
	document.querySelectorAll('.options > *').forEach((opt, i) => {
		opt.addEventListener('click', () => {
			switch (i) {
				case 1:
					download();
					break;
				case 2:
					upload();
					break;
				case 3: 
					hint();
					break;
				case 4:
					reroll();
					break
				default:
					save();
					break;
			}
		})
	})
}
/**
 * Download saved game as a json file
 */
function download() {
	const main = window.storage.getState().Main;
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(main));
	const link = document.createElement('a');
	link.href = dataStr;
	link.download = 'saved-game.json';
	document.body.appendChild(link);
	console.log(dataStr)
	link.click();
	document.body.removeChild(link);
	delete link;
}
/**
 * Load game from Json file
 */
function upload() {
	const input = document.createElement('input');
	input.type = 'file';
	document.body.appendChild(input);
	input.classList.add('hidden');
	input.click();
	input.onchange = async () => {
		const files = input.files;
		const text = await files[0].text()
		const savedGame = JSON.parse(text);
		load(savedGame);
		emptyBlockListeners();
		document.body.removeChild(input);
	}
}

function save() {
	const main = window.storage.getState().Main;
	localStorage.setItem('saved_sudoku', JSON.stringify(main));
}

function hint() {
	const { hintN, sudoku } = window.storage.getState().Main;
	console.log(hintN, sudoku)
	const selected = document.querySelector('.selected');
	if(selected !== null) {
		if (hintN !== 0) {
			const linear = getLinearPosition(selected);
			selected.querySelector('.solution').innerHTML = sudoku[linear];
			window.storage.dispatch({ type: 'SET_VALUE', pos: linear, value: sudoku[linear] });
			window.storage.dispatch({ type: 'USE_HINT' });
			alert(`You used a hint, there's is ${hintN - 1} hints left`)
		}
	} else {
		alert(`You have to select a block for a hint, you have: ${hintN} hints left`);
	}
}
/**
 * Reroll, the game
 */
function reroll() {
	newSudoku();
	emptyBlockListeners();
}