import {ToastContainer, ToastPosition} from 'react-toastify';
import {body, container, progress, root} from './p-toast-view.styles';
import 'react-toastify/dist/ReactToastify.css';
import {Device} from 'types/custom';

export const PToastView = ({position, width, device}: {position?: ToastPosition; width?: string; device?: Device}) => (
  <ToastContainer
    toastClassName={root({device})}
    bodyClassName={body}
    progressClassName={progress}
    className={container({width})}
    position={position}
  />
);
