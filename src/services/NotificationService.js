import RootSiblingsManager from 'react-native-root-siblings';
// components
import NotificationMessage from 'src/modules/core/components/NotificationMessage';

class NotificationServiceCreator {
  notification = null;

  show = ({ title, message, onPress, onClose }) => {
    if (this.notification === null) {
      this.notification = new RootSiblingsManager(
        (
          <NotificationMessage
            title={title}
            message={message}
            onPress={() => {
              if (typeof onPress === 'function') {
                onPress();
              }
              this.notification.destroy();
              this.notification = null;
            }}
            onClose={() => {
              if (typeof onClose === 'function') {
                onClose();
              }

              this.notification.destroy();
              this.notification = null;
            }}
          />
        ),
      );
    }
  };

  remove = () => {
    if (this.notification !== null) {
      this.notification.destroy();
      this.notification = null;
    }
  };
}

const NotificationService = new NotificationServiceCreator();

export default NotificationService;
