/* eslint-disable no-console */
import { Image, ImageProps } from '@chakra-ui/react';
import { createRef, FC, useEffect } from 'react';

interface PfpImageProps extends ImageProps {
  imageHash?: string;
  active: boolean;
}

export const PfpImage: FC<PfpImageProps> = ({
  imageHash = '00db2b',
  active,
  ...imageProps
}) => {
  const ref = createRef<HTMLImageElement>();
  useEffect(() => {
    if (active) {
      ref.current?.animate(
        { filter: 'grayscale(1%)' },
        {
          duration: 800,
          easing: 'ease-out',
        }
      );
    } else {
      ref.current?.animate(
        { filter: 'grayscale(95%)' },
        {
          duration: 0,
        }
      );
    }
    // eslint-disable-next-line no-console
  }, [imageHash, active]);
  return (
    <Image
      // src={`/img/bluebonnet/${imageHash}.png`}
      src="/img/atxdao-logo-square-color.png"
      transition="all 800ms ease-out"
      filter={active ? 'grayscale(1%)' : 'grayscale(95%)'}
      borderRadius="50%"
      width="auto"
      height="auto"
      ref={ref}
      {...imageProps}
    />
  );
};
