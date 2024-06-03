import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/named
import { EmailView } from 'src/sections/email/view';


// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Email </title>
      </Helmet>

      <EmailView />
    </>
  );
}
