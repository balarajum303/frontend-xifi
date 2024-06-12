import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import api from 'src/components/Common/api';
import Iconify from 'src/components/iconify';
import { CATEGORY_API } from 'src/components/Common/apiConfig';

// ----------------------------------------------------------------------

export default function UserTableRow({
  domain,
  email,
  role,
  mobileNumber,
  status,
  edit,
  publicId,
  concurrencyStamp,
  handleClick,
  selected,
  selectedPath,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const statusUpdateHandler = (selectedStatus) => {
    console.log("check-status", publicId, concurrencyStamp);
    const statusUpdateBody = {
      status: selectedStatus,
    };
    console.log(statusUpdateBody, "statusUpdateBody");
    const url = `${CATEGORY_API.STATUS_UPDATE_USER_CATEGORY}/${publicId}`;

    api.patch(url, statusUpdateBody, {
      headers: {
        'x-coreplatform-concurrencyStamp': concurrencyStamp,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          window.location.reload();
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 417) {
            console.error("Error 417:", error);
          } else if (error.response.status === 500) {
            console.error("Error 500:", error);
          }
        }
      });
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{domain}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>{mobileNumber}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell>
          <Label>{edit}</Label>
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
        <MenuItem onClick={() => statusUpdateHandler('active')}>Active</MenuItem>
        <MenuItem onClick={() => statusUpdateHandler('inactive')} sx={{ color: 'error.main' }}>
          Inactive
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  domain: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  edit: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
  concurrencyStamp: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  selectedPath: PropTypes.string.isRequired,
};
