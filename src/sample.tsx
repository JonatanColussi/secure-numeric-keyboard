import React, { useCallback, useRef } from 'react';

import SecureNumericKeyboard, { ISecureNumericKeyboard } from './secureNumericKeyboard';

export default function App() {
  const keyboardRef = useRef<ISecureNumericKeyboard>({
    selecteds: [],
    possibilities: [],
  });

  const handleClick = useCallback(() => {
    console.log(keyboardRef.current);
  }, []);

  return (
    <>
      <SecureNumericKeyboard
        ref={keyboardRef}
        deleteButtonContent="<-"
        options={[...Array(10).keys()]}
        separator="-"
      >
        <button aria-label="Passcode option" type="button" />
      </SecureNumericKeyboard>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={handleClick} type="button">
        get possibilities
      </button>
    </>
  );
}
