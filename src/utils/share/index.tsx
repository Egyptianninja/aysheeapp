import { Share } from "react-native";

export const onShare = async (message: any, toggleModal: any) => {
  try {
    const result: any = await Share.share({
      message
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        toggleModal();
      } else {
        toggleModal();
      }
    } else if (result.action === Share.dismissedAction) {
      toggleModal();
    }
  } catch (error) {
    alert(error.message);
  }
};
