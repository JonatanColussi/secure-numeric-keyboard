/* eslint-disable security/detect-object-injection */
function concatArrayPositions<T extends string>(acc: T[], current: T[]) {
  return acc.map((value, index) => value + current[index]);
}

function removeDuplicates<T>(element: T, index: number, array: T[]) {
  return array.indexOf(element) === index;
}

function arrayPad<T>(length: number) {
  return (item: T[]) => {
    while (item.length < length) {
      item.push(...item);
    }

    return item;
  };
}

export function splitIntoChunks<T>(input: T[], chunkSize: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < Math.ceil(input.length / chunkSize); index++) {
    chunks.push(input.slice(index * chunkSize, (index + 1) * chunkSize));
  }

  return chunks;
}

export function shuffleArray<T>(array: T[]) {
  const shuffledArray = [...array];

  for (let index = shuffledArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledArray[index], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[index],
    ];
  }

  return shuffledArray;
}

export function isEven(input: number) {
  return input % 2 === 0;
}

export function calculatePossibilities<T extends string | number>(options: T[][]) {
  let multiplier = 1;

  return options.length
    ? options
        .reduce((acc, item) => {
          acc.push(item.map(n => Array(multiplier).fill(n.toString())).flat());

          multiplier *= 2;

          return acc;
        }, [] as string[][])
        .map(arrayPad(multiplier))
        .reduce(concatArrayPositions)
        .filter(removeDuplicates)
    : [];
}
