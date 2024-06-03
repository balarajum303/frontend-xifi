import { lazy } from 'react';

export const BlogPage = lazy(() => import('src/pages/blog'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const service = lazy(() => import('src/pages/service'));
export const EmailPage = lazy(() => import('src/pages/email'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ChatbotPage = lazy(() => import('src/pages/chat-bot'));
export const NoiseCancellationPage = lazy(() => import('src/pages/noise-cancellation'));
export const UserPersonasPage = lazy(() => import('src/pages/user-personas'));

export const authRoutes = [
  {
    path: '/',
    element: IndexPage,
  },
  { path: '/services', element: service },
  { path: '/email', element: EmailPage },
  { path: '/products', element: ProductsPage },
  { path: '/blog', element: BlogPage },
  { path: '/chat-bot', element: ChatbotPage },
  { path: '/noise-cancellation', element: NoiseCancellationPage },
  { path: '/user-personas', element: UserPersonasPage },
  
];
