import { Route, Routes } from 'react-router-dom';
import { lazy, useState, useEffect } from 'react';

import api from 'src/components/Common/api';
import { CATEGORY_API } from 'src/components/Common/apiConfig';

import Page404 from '../pages/page-not-found'
import { publicRoutes } from './publicRoutes';
import { Authentication } from './Authentication';

export const BlogPage = lazy(() => import('src/pages/blog'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const service = lazy(() => import('src/pages/service'));
export const Users = lazy(() => import('src/pages/Users'));
export const Payments = lazy(() => import('src/pages/Payments'));

export const EmailPage = lazy(() => import('src/pages/email'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ChatbotPage = lazy(() => import('src/pages/chat-bot'));
export const NoiseCancellationPage = lazy(() => import('src/pages/noise-cancellation'));
export const UserPersonasPage = lazy(() => import('src/pages/user-personas'));
export default function Router() {
  const [authRoutes, setAuthRoutes] = useState([
    {
      path: '/',
      element: IndexPage,
    },
    { path: '/services', element: service },
    { path: '/users', element: Users },
    // { path: '/blog', element: BlogPage },
    // { path: '/chat-bot', element: ChatbotPage },
    // { path: '/noise-cancellation', element: NoiseCancellationPage },
    { path: '/user-personas', element: UserPersonasPage },
    { path: '/payment-category', element: Payments },
  ]);


  useEffect(() => {
    const url = `${CATEGORY_API.GET_CATEGORY}?pageSize=${500}`;
    api.get(url)
      .then(response => {
        // Create an array of routes from API data
        const apiRoutes = response.data.map(item => ({
          path: `/${item.categoryName}/:categoryId`,
          element: EmailPage
        }));

        // Concatenate API routes with existing authRoutes array
        setAuthRoutes(existingRoutes => [...existingRoutes, ...apiRoutes]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  
  return (
    <Routes>
      <Route element={<Authentication />}>
        {authRoutes.map((val, i) => (
          <Route key={i} path={val.path} element={<val.element />} index={i === 0} />
        ))}
      </Route>

      {publicRoutes.map((val, i) => (
        <Route key={i} path={val.path} element={<val.element />} />
      ))}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
