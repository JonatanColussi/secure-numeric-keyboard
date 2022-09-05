import { PropsWithChildren } from 'react';

export type StringOrNumber = string | number;

export interface IProps extends PropsWithChildren {
  deleteButtonContent: string;
  options: StringOrNumber[];
  separator: string;
}

export interface ISecureNumericKeyboard {
  possibilities: string[];
  selecteds: StringOrNumber[][];
}
