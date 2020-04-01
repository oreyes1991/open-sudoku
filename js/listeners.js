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

function download() {
	const main = window.storage.getState().Main;
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(main));
	window.open(dataStr, '_blank');
}

function upload() {

}

function save() {
	const main = window.storage.getState().Main;
	localStorage.setItem('saved_sudoku', JSON.stringify(main));
}

function hint() {

}

function reroll() {

}