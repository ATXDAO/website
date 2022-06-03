import { limitChars } from '../utils/helpers';
import { Grid, Box, Heading, Text, Button, Flex, Link } from '@chakra-ui/react';
import { createHash } from 'crypto';
import { useUser } from 'hooks/app-hooks';
import { FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface EventProps {
  img: string;
  shareable: boolean | null;
  link: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  eventId: string | null;
  status: string;
  isMember: boolean;
  address: string | undefined;
}

export const Event: FC<EventProps> = ({
  img,
  shareable,
  link,
  title,
  date,
  startTime,
  endTime,
  description,
  eventId,
  status,
  isMember,
  address,
}) => {
  const [user] = useUser();
  const ecode = async (
    eventCode: string | null,
    user_address: string | undefined
  ): Promise<string> => {
    const code = `atxdao-${createHash('sha256')
      .update(
        [eventCode, user_address, process.env.NEXT_PRIVATE_EVENTBRITE_KEY].join(
          '-'
        )
      )
      .digest('hex')
      .substring(0, 8)}`;
    return code;
  };

  const CreateDiscountAndNavigate = async (
    eventCode: string | null,
    redirectURL: string,
    _isMember: boolean,
    isOpen: boolean | null
  ): Promise<void> => {
    if (user.nftOwner) {
      const res = await fetch(
        `/api/events/discount-code?eventCode=${eventCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        const { code } = await res.json();
        window.open(`${redirectURL}?discount=${code}`);
      } else if (res.status === 500) {
        // try to see if user didnt use code yet, else error out
        const code = await ecode(eventCode, address);
        window.open(`${redirectURL}?discount=${code}`);
      }
    } else if (!_isMember && isOpen) {
      window.open(`${redirectURL}`);
    }
  };

  return (
    <Grid
      minHeight="300px"
      gridTemplateColumns={['1fr', '1fr', '2fr 3fr']}
      gap={['1rem', '1rem', '3rem']}
      borderRadius="12px"
      transition="0.2s"
      _hover={{
        cursor: 'pointer',
        color: 'orange',
        backgroundColor: '#252b38',
      }}
    >
      <Box
        minHeight="250px"
        borderRadius="12px"
        backgroundImage={img}
        backgroundSize="cover"
        backgroundPosition="center"
      />
      <Flex
        paddingY={['0', '0', '2rem']}
        paddingX={['0.5rem', '1rem', '0']}
        justifyContent="space-between"
        flexDirection="column"
      >
        {isMember || shareable ? (
          <Link href={link} target="_blank">
            <Box>
              <Heading mb="2">{title}</Heading>
              <Text fontSize="1.5rem" color="white !important">
                {date}
              </Text>
              <Text fontWeight="bold" color="white !important">
                {`${startTime} - ${endTime}`}
              </Text>
              <Text mt="2" fontSize="1.2rem" color="white !important">
                {limitChars(description, 120)}
              </Text>
            </Box>
          </Link>
        ) : (
          <Box>
            <Heading mb="2">{title}</Heading>
            <Text fontSize="1.5rem" color="white !important">
              {date}
            </Text>
            <Text fontWeight="bold" color="white !important">
              {`${startTime} - ${endTime}`}
            </Text>
            <Text mt="2" fontSize="1.2rem" color="white !important">
              {limitChars(description, 120)}
            </Text>
          </Box>
        )}
        <Button
          variant="unstyled"
          rightIcon={<FaArrowRight />}
          textAlign="left"
          transition="inherit"
          onClick={() =>
            CreateDiscountAndNavigate(eventId, link, isMember, shareable)
          }
          disabled={
            !(isMember || shareable) ||
            status === 'completed' ||
            status === 'draft'
          }
        >
          {isMember || shareable ? 'Get Tickets' : 'Members Only'}
        </Button>
      </Flex>
    </Grid>
  );
};

export default Event;
