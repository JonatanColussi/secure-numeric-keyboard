const numbers = [
  [2, 7],
  [1, 4],
  [9, 0],
  [1, 4],
  [9, 0],
  [1, 4],
];

let multiplier = 1;

const result = numbers
  .reduce((acc, item) => {
    acc.push(item.map(n => Array(multiplier).fill(n.toString())).flat());

    multiplier *= 2;

    return acc;
  }, [])
  .map(item => {
    while (item.length < multiplier) {
      item.push(...item);
    }

    return item;
  })
  .reduce((a, b) => a.map((v, index) => v + b[index]));

console.log(result);
console.log(result.map(index => index.length));
