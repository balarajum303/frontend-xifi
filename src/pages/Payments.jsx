import React from 'react';
import { Helmet } from 'react-helmet-async';

import { PaymentsView } from 'src/sections/payments/view';




// ----------------------------------------------------------------------

export default function userPage() {
    return (
        <>
            <Helmet>
                <title> Payments </title>
            </Helmet>

            <PaymentsView/>
        </>
    );
}
