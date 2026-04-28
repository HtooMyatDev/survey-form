import toast from 'react-hot-toast';
import { TOAST_STYLES } from './constants';

export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 4000,
    style: TOAST_STYLES.success
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 4000,
    style: TOAST_STYLES.error
  });
};

export const showLoadingToast = (message) => {
  return toast.loading(message, {
    style: {
      background: '#FFE4E1',
      color: '#C2185B',
      border: '2px solid #FF69B4'
    }
  });
};
