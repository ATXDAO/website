import { DaoEvent } from '../data/eventbrite';
import { Event } from './event';
import { Box, Divider } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface EventsProps {
  events: DaoEvent[];
  isMember: boolean;
  address?: string;
}

const Events: FC<EventsProps> = ({ events, isMember, address }) => (
  <>
    {events
      .map((event, i: number) => (
        <div key={event.id}>
          {i !== events.length - 1 && (
            <Divider
              mb={['2rem', '3rem', '5rem']}
              borderBottomWidth="4px"
              borderRadius="6px"
            />
          )}
          <Box mb={['2rem', '3rem', '5rem']}>
            <Event event={event} isMember={isMember} address={address} />
          </Box>
        </div>
      ))
      .reverse()}
  </>
);
export default Events;
