import { limitChars } from '../utils/helpers';
import {
  Grid,
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Link,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const eventbriteAPI = process.env.NEXT_PRIVATE_EVENTBRITE_KEY;
const orgID = process.env.NEXT_PRIVATE_EVENTBRITE_ORGID;

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
}) => {
  const toast = useToast();

  const CreateDiscountAndNavigate = async (
    eventCode: string | null,
    redirectURL: string,
    _isMember: boolean,
    isOpen: boolean | null
  ): Promise<void> => {
    if (_isMember) {
      try {
        const code = Math.floor(Math.random() * 1000000);
        const body = {
          discount: {
            type: 'access',
            code: `${code}`,
            event_id: `${eventCode}`,
            ticket_class_ids: [],
            quantity_available: 1,
          },
        };

        await axios({
          method: 'post',
          url: `https://www.eventbriteapi.com/v3/organizations/${orgID}/discounts/`,
          data: body,
          headers: {
            Authorization: `Bearer ${eventbriteAPI}`,
          },
        });

        window.open(`${redirectURL}?discount=${code}`);
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Error handling your request',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
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
