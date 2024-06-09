import { Helmet } from 'react-helmet-async';
import { PaymentsView } from 'src/sections/payments/view';

// eslint-disable-next-line import/named



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
