import { ImageManipulator } from 'expo';

export const flipImage = (image: any, deg: any) => {
  return ImageManipulator.manipulateAsync(image.uri, [{ rotate: deg }]);
};
