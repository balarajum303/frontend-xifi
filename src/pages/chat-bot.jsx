import { Helmet } from 'react-helmet-async';

import { ChatbotView } from 'src/sections/chat-bot/view';

// eslint-disable-next-line import/named


// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Email </title>
      </Helmet>

      <ChatbotView />
    </>
  );
}