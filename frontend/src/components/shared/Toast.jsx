import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { hideToast } from '../../redux/toastSlice';
import { CircleCheck, CircleX, Info } from 'lucide-react';

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector((state) => state.toast);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`fixed w-fit flex gap-2 bg-gray-300 bottom-5 right-5 p-4 rounded shadow z-50 border-l-6 text-sm font-semibold
        ${type === 'success' ? 'text-green-600' : type === 'error' ? 'text-red-600' : 'bg-blue-600'}
        animate-[toast_0.9s_ease-out_forwards] origin-right
      `}
      style={{
        animationName: 'toast',
        '@keyframes toast': {
          '0%': { width: '0' },
          '100%': { width: 'fit' },
        }
      }}>
      {
        message.type === 'error' ?<CircleX/> :message.type==='success' ?<CircleCheck/> : <Info/>
      }{message}
    </div>
  );
};

export default Toast;
