const base4StarChar = [5.1, 5.1, 5.1, 5.1, 5.1, 5.1, 5.1, 5.1, 56.1, 100, 100];
const base4StarLC = [6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 66, 100, 100];
const base5StarChar = [];
const base5StarLC = [];

// Droprate for Starter, regular & character Banner
for (let i = 0; i < 73; i++) base5StarChar.push(0.6);
// Character Banner's hard pity 74 - 90
for (let i = 1; i < 17; i++) {
	const probability = 0.6 + 6 * i;
	base5StarChar.push(probability);
}
base5StarChar.push(100); // guaranteed at pity 90

// Droprate for Lightcones Banner
for (let w = 0; w < 62; w++) base5StarLC.push(0.8);
// Lightcone Banner's hard pity 63 - 80
for (let w = 1; w < 12; w++) {
	const probability = 0.8 + 7 * w;
	base5StarLC.push(probability);
}
base5StarLC.push(81.2); // 74
base5StarLC.push(84.7); // 75
base5StarLC.push(88.2); // 76
base5StarLC.push(91.7); // 77
base5StarLC.push(95.2); // 78
base5StarLC.push(98.7); // 79
base5StarLC.push(100); // guaranteed at pity 80;

// Random Item by probability
const prob = (items) => {
	let chances = [];
	for (let i = 0; i < items.length; i++) {
		chances[i] = items[i].chance + (chances[i - 1] || 0);
	}
	const random = Math.random() * chances[chances.length - 1];
	const result = items[chances.findIndex((chance) => chance > random)];
	return result;
};

export default prob;
export { base4StarChar, base4StarLC, base5StarChar, base5StarLC };
