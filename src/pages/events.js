import Event from '../components/events/Event';
import Layout from '../components/layout/Layout';
import { Logo } from '../img/logo';
import { eventData } from '../util/mockData';
import { Box, Button, Divider, Link } from '@chakra-ui/react';
import eventbrite from 'eventbrite';
import { useState } from 'react';

const eventbriteAPI = process.env.EVENTBRITE_API_KEY;
const orgID = process.env.ORG_ID;

export function createDiscountAndNavigate(
  eventCode,
  redirectURL,
  canAccess,
  setOptionalCode
) {
  if (canAccess) {
    const code = setOptionalCode | Math.floor(Math.random() * 1000000);
    const body = {
      discount: {
        type: 'access',
        code: `${code}`,
        event_id: `${eventCode}`,
        ticket_class_ids: [],
        quantity_available: 1,
      },
    };
    fetch(
      `https://www.eventbriteapi.com/v3/organizations/${orgID}/discounts/`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${eventbriteAPI}`,
        },
      }
    )
      .then((response) => {
        const isJson = response.headers
          .get('content-type')
          ?.includes('application/json');
        const data = isJson ? response.json() : null;

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = data || response.status;
          return Promise.reject(error);
        } else {
          window.open(`${redirectURL}?discount=${code}`);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }
}

function Events({ events }) {
  const contentPaddingX = ['1rem', '2rem', '3rem', '10rem'];
  const contentPaddingY = '3rem';
  const [isMember, setIsMember] = useState(false);

  return (
    <Layout>
      <Box paddingX={contentPaddingX} paddingTop={contentPaddingY}>
        {events.events.map((obj, i) => (
          <>
            {i !== 0 && (
              <Divider
                mb={['2rem', '3rem', '5rem']}
                borderBottomWidth="4px"
                borderRadius="6px"
              />
            )}
            <Box mb={['2rem', '3rem', '5rem']}>
              <Event
                title={obj.name.text}
                date={new Date(obj.start.local).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                startTime={new Date(obj.start.local).toLocaleTimeString(
                  'en-US',
                  {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  }
                )}
                endTime={new Date(obj.end.local).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
                description={obj.summary ? obj.summary : null}
                link={obj.url ? obj.url : null}
                img={obj.logo ? obj.logo.original.url : null}
                eventId={obj.id ? obj.id : null}
                shareable={obj.shareable ? obj.shareable : null}
                isMember={isMember}
              />
            </Box>
          </>
        ))}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const sdk = eventbrite({ token: `${eventbriteAPI}` });
  let events = null;
  await sdk
    .request(`/organizations/${orgID}/events/`)
    .then((response) => {
      events = response;
    })
    .catch((errInfo) => {
      console.error(errInfo.response['error_description']);

      // `ARGUMENT_ERROR` errors are parsed into `parsedError` property
      const parsedError = errInfo.parsedError;

      // equivalent to errorInfo.response.error
      console.log(parsedError.error);

      // equivalent to errorInfo.response['error_description']
      console.log(parsedError.description);
    });
  if (!events) {
    console.log('Didnt get events');
    return { notFound: true };
  }
  return { props: { events } };
}

export default Events;
