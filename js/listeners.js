document.addEventListener('DOMContentLoaded', () => {
	emptyBlockListeners();
	keyboardListener();
});
/**
 * Listen only to the empty blocks
 */
function emptyBlockListeners() {
	const blocks = document.querySelectorAll('.empty');
	blocks.forEach(block => {
		block.addEventListener('click', () => {
			selectLine(block);
		})
	})
}

/**
 * select a block and deselect the old one;
 * @param {HTMLElement} block 
 */
function selectLine(block) {
	const selectedBefore = document.querySelectorAll('.selected');
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
			const selected = document.querySelector('.selected');
			if (selected !== null) {
				window.storage.dispatch({
					type: 'SET_VALUE',
					pos: getLinearPosition(selected),
					value: key
				});
				selected.innerHTML = key !== 0 ? key : "";
			}
		}
	})
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