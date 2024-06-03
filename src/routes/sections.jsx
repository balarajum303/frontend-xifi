import { Route, Routes } from 'react-router-dom';

import { authRoutes } from './authRoutes';
import { publicRoutes } from './publicRoutes';
import Page404 from '../pages/page-not-found'
import { Authentication } from './Authentication';
import { useEffect, useState } from 'react';
import api from 'src/components/Common/api';
import { CATEGORY_API } from 'src/components/Common/apiConfig';
export default function Router() {

  
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
