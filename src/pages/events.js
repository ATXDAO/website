import Connect from '../components/events/Connect';
import Event from '../components/events/Event';
import Layout from '../components/layout/Layout';
import { eventData } from '../util/mockData';
import { Box, Divider, Link } from '@chakra-ui/react';
import eventbrite from 'eventbrite';

function Events({ events }) {
  const contentPaddingX = ['1rem', '2rem', '3rem', '10rem'];
  const contentPaddingY = '3rem';

  return (
    <Layout>
      <Connect />
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
  const sdk = eventbrite({ token: 'KMNE2CUAUC2S5453DFYX' });
  const ORG_ID = '514468661905';
  let events = null;
  await sdk
    .request(`/organizations/${ORG_ID}/events/`)
    .then((response) => {
      console.log('Response:', response);
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
