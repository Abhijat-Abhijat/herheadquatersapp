// hooks
import useAlertOnBack from 'src/modules/core/hooks/useAlertOnBack';

function AlertOnBack({
  shouldShowAlert,
  title,
  message,
  stayText,
  leaveText,
  handleLeave = () => {},
  handleStay = () => {},
  children,
}) {
  useAlertOnBack(shouldShowAlert, {
    title,
    message,
    stayText,
    handleStay,
    leaveText,
    handleLeave,
  });

  return children;
}

export default AlertOnBack;
