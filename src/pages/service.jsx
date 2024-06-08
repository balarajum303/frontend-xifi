import { Helmet } from 'react-helmet-async';

import {ServicesView} from 'src/sections/services/view';
// eslint-disable-next-line import/named



// ----------------------------------------------------------------------

export default function servicePage() {
    return (
        <>
            <Helmet>
                <title> Service </title>
            </Helmet>

            <ServicesView/>
        </>
    );
}
