import { cloneElement, PropsWithChildren, ReactElement, useEffect, useMemo, useState } from 'react';

import {
  arrayPad,
  concatArrayPositions,
  isEven,
  removeDuplicates,
  shuffleArray,
  splitIntoChunks,
} from './helpers';

interface Props<T> extends PropsWithChildren {
  length: number;
  onCompleted: (possibilities: string[]) => void;
  options: T[];
  separator: string;
}

export function SecurePasscodeKeyboard<T extends string | number>(props: Props<T>) {
  const { children, length, onCompleted, options, separator } = props;

  if (!isEven(options.length)) {
    throw new Error('"options" must be an array with even number of elements');
  }

  const numbers = useMemo(() => splitIntoChunks(shuffleArray(options), 2), [options]);

  const [selecteds, setSelecteds] = useState<T[][]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (selecteds.length === length) {
      setDisabled(true);

      let multiplier = 1;

      onCompleted(
        selecteds
          .reduce((acc, item) => {
            acc.push(item.map(n => Array(multiplier).fill(n.toString())).flat());

            multiplier *= 2;

            return acc;
          }, [] as string[][])
          .map(arrayPad(multiplier))
          .reduce(concatArrayPositions)
          .filter(removeDuplicates),
      );
    }
  }, [length, onCompleted, selecteds]);

  return (
    <>
      {numbers.map(number => {
        return cloneElement(children as ReactElement, {
          disabled,
          onClick: () => {
            setSelecteds([...selecteds, number]);
          },
          key: number.join('-'),
          children: number.join(` ${separator} `),
        });
      })}
    </>
  );
}

SecurePasscodeKeyboard.defaultProps = {
  children: <button aria-label="Passcode option" type="button" />,
  length: 4,
  onCompleted: (_: string[]) => {
    // nothing
  },
  options: [...Array(10).keys()],
  separator: 'or',
};
