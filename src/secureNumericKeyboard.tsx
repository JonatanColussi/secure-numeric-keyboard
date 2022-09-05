import React, {
  cloneElement,
  forwardRef,
  ReactElement,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { calculatePossibilities, isEven, shuffleArray, splitIntoChunks } from './helpers';
import { IProps, ISecureNumericKeyboard, StringOrNumber } from './types';

export default forwardRef<ISecureNumericKeyboard, IProps>(
  ({ children, deleteButtonContent, options, separator }, ref) => {
    if (!isEven(options.length)) {
      throw new Error('"options" must be an array with even number of elements');
    }

    const keyboardRef = useRef<ISecureNumericKeyboard>({
      selecteds: [],
      possibilities: [],
    });

    useImperativeHandle(ref, () => keyboardRef.current);

    const shuffledOptions = useMemo(() => splitIntoChunks(shuffleArray(options), 2), [options]);

    const handleOptionClick = useCallback((option: StringOrNumber[]) => {
      keyboardRef.current.selecteds.push(option);
      keyboardRef.current.possibilities = calculatePossibilities(keyboardRef.current.selecteds);
    }, []);

    const handleDelete = useCallback(() => {
      keyboardRef.current.selecteds.pop();
      keyboardRef.current.possibilities = calculatePossibilities(keyboardRef.current.selecteds);
    }, []);

    return (
      <>
        {shuffledOptions.map(number => {
          return cloneElement(children as ReactElement, {
            onClick: () => {
              handleOptionClick(number);
            },
            key: number.join('-'),
            children: number.join(` ${separator} `),
          });
        })}
        {deleteButtonContent &&
          cloneElement(children as ReactElement, {
            onClick: handleDelete,
            children: deleteButtonContent,
          })}
      </>
    );
  },
);

export { ISecureNumericKeyboard } from './types';
