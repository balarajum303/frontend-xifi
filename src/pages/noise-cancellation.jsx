import { Helmet } from 'react-helmet-async';

import NoiseCancellation from 'src/sections/noise-cancellation/view/noise-cancellation-view';

// eslint-disable-next-line import/named


// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Email </title>
      </Helmet>

      <NoiseCancellation />
    </>
  );
}
