import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import api from 'src/components/Common/api';
import { CATEGORY_API } from 'src/components/Common/apiConfig';

// ----------------------------------------------------------------------
////////----- update----////////////
const statusUpdateHandler = (selectedStatus) => {

  let statusUpdateBody = {
    status: selectedStatus
  }
  console.log(statusUpdateBody, "statusUpdateBody")
  const url = `${CATEGORY_API.STATUS_UPDATE_CATEGORY}/${formdetails.publicId}`;
  api.patch(url, updateCategoryBody, {
    headers: {
      'x-coreplatform-concurrencystamp': formdetails?.concurrencyStamp
    }
  })

    .then(response => {
      if (response.status === 204) {

        // window.location.reload()
      } else {
        console.error("Unexpected response:", response)
      }
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 417) {
          console.error("Error 417:", error)

        } else if (error.response.status === 500) {
          console.error("Error 500:", error)

        }
      }
    })
}
export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  company,
  domain,
  role,
  isVerified,
  status,
  email,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>


        <TableCell>{domain}</TableCell>



        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell>
          <Label >{email}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => statusUpdateHandler('active')}>
          Active
        </MenuItem>

        <MenuItem onClick={() => statusUpdateHandler('inactive')} sx={{ color: 'error.main' }}>
          Inactive
        </MenuItem>
      </Popover>


    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  email: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  domain: PropTypes.string,
};
