import { useState, useEffect } from 'react';
import { ImageViewerProps } from './type';
import api from 'core/api';
import { Image } from './style';

export default function ImageViewer({ fileName }: ImageViewerProps) {
  const [imageUrl, setImageUrl] = useState('');

  const fetchImage = async () => {
    try {
      const response = await api.getImage(fileName);
      setImageUrl(URL.createObjectURL(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fileName && fetchImage();

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [fileName]);

  return <Image src={imageUrl} alt={fileName} />;
}
