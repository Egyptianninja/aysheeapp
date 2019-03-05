import axios from 'axios';
import { ImagePicker, ImageManipulator } from 'expo';
import secrets from '../../../constants/secrets';

export const uploadPhoto = async (
  file: any,
  uploadPreset: any,
  cloudeNmae: any
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('tags', 'app_upload');
  formData.append('timestamp', (Date.now() / 1000).toString());
  const config = {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  };
  return axios.post(
    `https://api.cloudinary.com/v1_1/${cloudeNmae}/image/upload`,
    formData,
    config
  );
};

export const uploadPhotos = async (
  photos: any,
  selectedImage: any,
  updateProgressBar: any
) => {
  let photoArray: any[] = [];
  if (photos) {
    const uploaders = photos.map(async (photo: any) => {
      const resizedImage = await compressImage(
        photo.file ? photo.file : photo.uri,
        1080,
        0.8
      );
      const { width, height } = resizedImage;
      const ratio = (height / width).toFixed(4);
      const base64Img = `data:image/jpg;base64,${resizedImage.base64}`;
      await uploadPhoto(
        base64Img,
        secrets.upload.UPLOAD_PRESET,
        secrets.upload.CLOUD_NAME
      ).then(response => {
        const uri = photo.file ? photo.file : photo.uri;
        const selected = uri === selectedImage ? 1 : 0;
        const { public_id } = response.data;
        const image = `${public_id}-${ratio}-${selected}`;
        photoArray = photoArray.concat(image);
      });
      updateProgressBar(1 / (3 + photos.length));
    });
    await axios.all(uploaders);
  }

  photoArray.sort((a, b) => {
    const lasta = Number(a.charAt(a.length - 1));
    const lastb = Number(b.charAt(b.length - 1));
    return lasta > lastb ? -1 : lasta < lastb ? 1 : 0;
  });
  return photoArray;
};

export const pickImage = async (
  editing = true,
  width = 1080,
  compress = 0.8
) => {
  const result: any = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: editing
  });
  if (result.cancelled) {
    return false;
  }
  const resizedImage = await compressImage(result.uri, width, compress);
  const base64Img = `data:image/jpg;base64,${resizedImage.base64}`;

  return uploadPhoto(
    base64Img,
    secrets.upload.UPLOAD_PRESET,
    secrets.upload.CLOUD_NAME
  ).then(response => {
    return response.data.public_id;
  });
};
export const pickImageWithoutUpload = async (editing = true) => {
  const result: any = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: editing
  });
  if (result.cancelled) {
    return false;
  }
  return result;
};
export const uploadPickedImage = async (
  image: any,
  width: 1080,
  compress: 0.8
) => {
  const resizedImage = await compressImage(image.uri, width, compress);
  const base64Img = `data:image/jpg;base64,${resizedImage.base64}`;

  return uploadPhoto(
    base64Img,
    secrets.upload.UPLOAD_PRESET,
    secrets.upload.CLOUD_NAME
  ).then(response => {
    return response.data.public_id;
  });
};

export const compressImage = async (
  localimage: any,
  width: number,
  compress: number
) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    localimage,
    [{ resize: { width } }],
    { compress, base64: true }
  );
  return manipResult;
};
