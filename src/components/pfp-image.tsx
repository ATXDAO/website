import { Image, ImageProps } from '@chakra-ui/react';
import { FC } from 'react';

interface PfpImageProps extends ImageProps {
  pfpId?: number;
  active: boolean;
}

export const PfpImage: FC<PfpImageProps> = ({
  pfpId = 26,
  active,
  ...imageProps
}) => (
  <Image
    src={`/img/zilker/${pfpId}.png`}
    filter={`grayscale(${active ? '1%' : '95%'})`}
    transition="all 1200ms ease-in-out"
    _hover={{ filter: 'grayscale(1%)' }}
    borderRadius="50%"
    maxHeight="360px"
    width="auto"
    height="auto"
    {...imageProps}
  />
);
