import { Suspense, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const Authentication = () => {
  const [authenticate, setAuthenticate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // const UserData = localstorage.getElementById("UserData")

    if (token) {
      setAuthenticate(true);
      // console.log("token---True");
    } else {
      setAuthenticate(false);
      // console.log("token---False");
      navigate('/login');
    }
  }, [navigate]);

  return (
    authenticate && (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    )
  );
};
