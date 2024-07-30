import { FC } from 'react';

interface IImage {
  className?: string;
  src: string;
  alt: string;
}

const Images: FC<IImage> = ({ className, src, alt }) => (
    <img className={className} src={src} alt={alt} />
);

export default Images;
