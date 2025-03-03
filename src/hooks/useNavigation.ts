import { useState, useCallback } from 'react';
import { Screen } from '../types';

export function useNavigation(initialScreen: Screen = "main") {
  const [currentScreen, setCurrentScreen] = useState<Screen>(initialScreen);
  const [previousScreen, setPreviousScreen] = useState<Screen>("main");

  const navigateTo = useCallback((screen: Screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  }, [currentScreen]);

  const goBack = useCallback(() => {
    setCurrentScreen(previousScreen);
  }, [previousScreen]);

  return {
    currentScreen,
    navigateTo,
    goBack
  };
}