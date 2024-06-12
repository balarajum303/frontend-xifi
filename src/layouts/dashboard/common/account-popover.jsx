import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBContainer,
  MDBCardImage,

} from 'mdb-react-ui-kit';

import Box from '@mui/material/Box';
import { Dialog } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';

import api from 'src/components/Common/api';
import { CATEGORY_API } from 'src/components/Common/apiConfig';

import FileUpload from './FileUpload';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [userProfileData,setUserProfileData]=useState([])
  const handleOpenProfileDialog = () => {
    setOpenProfileDialog(true);

  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
const logoutHandler=()=>{
  localStorage.clear()
  window.location.replace(`${window.location.origin}/login`);
  setOpen(null);
}
const homeHandler=()=>{
  window.location.replace(`${window.location.origin}/`);
  setOpen(null);
}

/// Get User Profile /////
const getUserProfileData = () => {
  // const urls = `${API_BASE_URL}/${selectedPath}?categoryId=${selectedPublicId}`;
  // console.log("urls-get",urls)
  const url = `${CATEGORY_API.GET_USER_PROFILE}`;
  api
    .get(url)
    .then(response => {
      console.log("get user Profile", response.data)
      // const categories = response.data;
      // const maxrole = Math.max(...categories.map(category => parseInt(category.role)), 0); // Find max category code
      // setMaxrole(maxrole);
      setUserProfileData(response.data)
    })
    .catch(error => {
      console.error(error)
    })
}
useEffect(()=>{
  getUserProfileData()
},[])


  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          { userProfileData.name}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {userProfileData.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userProfileData.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label}  onClick={() => {
            if (option.label === 'Profile') {
              handleOpenProfileDialog();
            } else if (option.label === 'Home') {
              homeHandler();
            } else {
              handleClose();
            }
          }}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={logoutHandler}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
      <Dialog  open={openProfileDialog} onClose={handleCloseProfileDialog} sx={{ width: '100vw' }}  
        fullWidth maxWidth="md"
       >        {/* <section className="vh-100" style={{ backgroundColor: '#f4f5f7',display:"flex",flexDirection:"row",justifyContent:"space-evenly" }}> */}

        <section  style={{ backgroundColor: '#f4f5f7'}}>
      <MDBContainer className="py-5" style={{paddingLeft:"8%"}}>
        

        <MDBRow>
          <MDBCol lg="3">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <h3  style={{marginTop:"3px"}} className="text-muted mb-1">{userProfileData.name}</h3>
                
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfileData.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfileData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Role</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfileData.role}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfileData.mobileNumber}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                {/* <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Status</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfileData.status}</MDBCardText>
                  </MDBCol>
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow style={{ width: "97.5%", marginLeft: "-23px" }}>
          <FileUpload userProfileData={userProfileData} />
        </MDBRow>

        
      </MDBContainer>
    </section>


      
      </Dialog>
    </>
  );
}
