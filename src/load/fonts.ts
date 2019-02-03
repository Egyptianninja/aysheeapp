import { Font } from 'expo';

export const loadFonts = async () => {
  await Font.loadAsync({
    'multaqa-font': require('../../assets/fonts/VIPRawyRegular.otf'),
    'cairo-bold': require('../../assets/fonts/Cairo-Bold.ttf'),
    'cairo-regular': require('../../assets/fonts/Cairo-Regular.ttf'),
    'cairo-light': require('../../assets/fonts/Cairo-Light.ttf'),
    'comfortaa-bold': require('../../assets/fonts/Comfortaa-Bold.ttf'),
    'comfortaa-Regular': require('../../assets/fonts/Comfortaa-Regular.ttf'),
    'comfortaa-light': require('../../assets/fonts/Comfortaa-Light.ttf')
  });
};
