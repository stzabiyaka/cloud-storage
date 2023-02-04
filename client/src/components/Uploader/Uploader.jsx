import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  selectShowUploader,
  purgeUploadsStack,
  selectUploadStack,
} from '../../redux/filesState/filesStateSlice';
import UploaderItem from '../UploaderItem';
import CloseButton from '../CloseButton';
import './Uploader.scss';

const Uploader = () => {
  const uploads = useSelector(selectUploadStack);

  const isVisible = useSelector(selectShowUploader);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(purgeUploadsStack());
  };

  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <p className="uploader__header-title">Uploads progress</p>
          <CloseButton onClose={handleClose} />
        </div>
        <ul className="uploader__uploads">
          {uploads.map(item => (
            <UploaderItem key={nanoid(6)} item={item} />
          ))}
        </ul>
      </div>
    )
  );
};

export default Uploader;
