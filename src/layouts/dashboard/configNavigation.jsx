import { BsCashCoin } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import api from 'src/components/Common/api';
import SvgColor from 'src/components/svg-color';
import { CATEGORY_API } from 'src/components/Common/apiConfig';

const ConfigNavigation = () => {
  const [navConfig, setNavConfig] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `${CATEGORY_API.GET_CATEGORY}?pageSize=${500}`;
        const response = await api.get(url);
        const categories = response.data;
        const mappedNavConfig = categories
          .filter(category => category.status === 'active') // Filter active categories
          .map(category => ({
            title: category.categoryName,
            path: `/${category.categoryName}/${category.publicId}`,
            icon: icon('ic_user'), // Example icon name generation based on title
          }));

        const newNavConfig = [
          {
            title: 'dashboard',
            path: '/',
            icon: icon('ic_analytics'),
          },
          {
            title: 'Users SetUp Page',
            path: '/user-personas',
            icon: icon('ic_user'),
          },
          {
            title: 'Services',
            path: '/services',
            icon: icon('ic_blog'),
          },
          {
            title: 'users',
            path: '/users',
            icon: icon('ic_user'),
          },
          ...mappedNavConfig,
          {
            title: 'Payment-Category',
            path: '/payment-category',
            icon: <BsCashCoin style={{ width: '22px', height: '22px' }} />,
          },
        ];

        setNavConfig(newNavConfig);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Function to generate an icon component
  const icon = name => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );

  return navConfig;
};

export default ConfigNavigation;
