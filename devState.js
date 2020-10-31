let devState = true;

const log = (...t) => {
	if (devState) {
		console.log(...t);
	}
	return;
}


//