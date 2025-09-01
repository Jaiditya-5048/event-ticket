import { NavigateFunction } from 'react-router-dom';

let navigator: NavigateFunction;

export const setNavigator = (navFn: NavigateFunction) => {
  navigator = navFn;
};

export const getNavigator = (): NavigateFunction => {
  if (!navigator) {
    throw new Error('Navigator not initialized');
  }
  return navigator;
};
