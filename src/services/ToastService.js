import Toast from 'react-native-root-toast';
// configs
import config from '../config';
// styles
import { dangerColor, successColor } from 'src/assets/jss/styles';

function showToast(message, type = 'info', duration = config.toastDuration) {
  const options = {
    duration,
    position: 100,
  };

  switch (type) {
    case 'danger': {
      options.backgroundColor = dangerColor;
      options.textColor = 'white';
      options.position = -60;
      break;
    }

    case 'success': {
      options.backgroundColor = successColor;
      options.textColor = 'black';
      break;
    }
    default: {
      break;
    }
  }

  Toast.show(message, options);
}

export default {
  showToast,
};
