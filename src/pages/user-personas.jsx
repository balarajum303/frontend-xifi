import { Helmet } from 'react-helmet-async';

import { UserPersonasView } from 'src/sections/user-personas/view';


// eslint-disable-next-line import/named


// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Email </title>
      </Helmet>

      <UserPersonasView />
    </>
  );
}