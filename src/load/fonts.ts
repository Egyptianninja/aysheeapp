import { Font } from 'expo';

export const loadFonts = async () => {
  await Font.loadAsync({
    'multaqa-font': require('../../assets/fonts/VIPRawyRegular.otf'),
    'cairo-black': require('../../assets/fonts/Cairo-Black.ttf'),
    'cairo-bold': require('../../assets/fonts/Cairo-Bold.ttf'),
    'cairo-regular': require('../../assets/fonts/Cairo-Regular.ttf'),
    'cairo-light': require('../../assets/fonts/Cairo-Light.ttf')
  });
};
