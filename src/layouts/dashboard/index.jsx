import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Fab, Fade, Avatar, Popper } from '@mui/material';

import ChatBotComponent from 'src/components/ChatBotComponent';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
      <Fab aria-label="add" sx={{ position: 'absolute', right: '2%', top: '90%' }} onClick={handleClick}>
        <Avatar src="/assets/icons/glass/ic_glass_users.png" />
      </Fab>
      <Popper placement='top-start' id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{  bgcolor: '#C2DAF9',borderRadius:"10px" }}>
              <ChatBotComponent />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
