import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// utils
import { showLeaveAlert } from 'src/services/helpers';

const defaultOptions = {
  handleLeave: () => {},
  handleStay: () => {},
};

const useAlertOnBack = (shouldShowAlert, passedOptions = {}) => {
  const options = Object.assign({}, defaultOptions, passedOptions);

  const { handleLeave, handleStay, title, message, stayText, leaveText } =
    options;

  const navigation = useNavigation();

  useEffect(() => {
    if (shouldShowAlert) {
      const unsubscribe = navigation.addListener('beforeRemove', (ev) => {
        if (navigation.isFocused()) {
          ev.preventDefault();

          const forceBack = () => {
            navigation.dispatch(ev.data.action);
          };

          showLeaveAlert({
            title,
            message,
            stayText,
            leaveText,
            onLeave: () =>
              handleLeave({
                dispatch: navigation.dispatch,
                event: ev,
                forceBack,
              }),
            onStay: () =>
              handleStay({
                dispatch: navigation.dispatch,
                event: ev,
                forceBack,
              }),
          });
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [
    navigation,
    shouldShowAlert,
    handleLeave,
    handleStay,
    title,
    message,
    stayText,
    leaveText,
  ]);
};

export default useAlertOnBack;
