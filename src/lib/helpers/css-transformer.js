const positionToStyle = (position) => {
	if (!position) return '';
	const cssProps = ['width', 'height', 'top', 'bottom', 'left', 'right'];
	const keyToChange = ['w', 'h', 't', 'b', 'l', 'r'];

	const style = Object.keys(position).map((key) => {
		const index = keyToChange.findIndex((v) => v === key);
		if (index < 0) return '';
		const css = key.replace(key, cssProps[index]);
		return `${css}:${position[key]}%`;
	});
	return style.join(';');
};

export default positionToStyle;
