/* eslint-disable no-console */
import { Image, ImageProps } from '@chakra-ui/react';
import { createRef, FC, useEffect } from 'react';

interface PfpImageProps extends ImageProps {
  pfpId?: number;
  active: boolean;
}

export const PfpImage: FC<PfpImageProps> = ({
  pfpId = 26,
  active,
  ...imageProps
}) => {
  const ref = createRef<HTMLImageElement>();
  useEffect(() => {
    if (active) {
      console.log('fading in new pfp...');
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
  }, [pfpId, active]);
  return (
    <Image
      src={`/img/zilker/${pfpId}.png`}
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
