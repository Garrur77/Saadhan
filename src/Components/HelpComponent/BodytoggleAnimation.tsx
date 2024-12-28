import {LayoutAnimation} from 'react-native';
export const Bodytoggleanimation = {
  duration: 500,
  update: {
    duration: 500,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 500,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};