import { Helmet } from 'react-helmet-async';

import { UsersView } from 'src/sections/users/view';
// eslint-disable-next-line import/named



// ----------------------------------------------------------------------

export default function userPage() {
    return (
        <>
            <Helmet>
                <title> Service </title>
            </Helmet>

            <UsersView/>
        </>
    );
}
