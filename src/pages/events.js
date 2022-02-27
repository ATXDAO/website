import Event from '../components/events/Event';
import Layout from '../components/layout/Layout';
import { Logo } from '../img/logo';
import { eventData } from '../util/mockData';
import { Box, Divider, Link } from '@chakra-ui/react';
import eventbrite from 'eventbrite';

const eventbriteAPI = process.env.EVENTBRITE_API_KEY;
const orgID = process.env.ORG_ID;

function Events({ events }) {
  const contentPaddingX = ['1rem', '2rem', '3rem', '10rem'];
  const contentPaddingY = '3rem';

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
              <Link href="#" target="_blank">
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
                  description={obj.summary}
                  link={obj.url}
                  img={obj.logo.original.url}
                />
              </Link>
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
