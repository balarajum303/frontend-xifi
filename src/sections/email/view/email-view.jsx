import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Close } from '@mui/icons-material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { Box, Dialog, TextField } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import api from 'src/components/Common/api';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { CATEGORY_API } from 'src/components/Common/apiConfig';

import { emptyRows } from '../utils';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import edit from "../../../../public/assets/images/edit_icon.gif"

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [getData, setGetData] = useState([])
  const [isEdit, setisEdit] = useState(false)

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formdetails, setFormdetails] = useState({
    name: '',
    email: "",
    role: "",
    mobileNumber: ""

  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: "",
    role: "",
    mobileNumber: ""

  });
  const [successMessage, setSuccessMessage] = useState("")

  /// //path and publicId's/////
  const path = window.location.pathname;
  const pathSegments = path.split('/'); // Split the path into segments
  const selectedPath = pathSegments[1]; // Extract the dynamic path segment
  const selectedPublicId = pathSegments[pathSegments.length - 1]; // Extract the last path segment (UUID)

  console.log("Selected Path:", selectedPath);
  console.log("Selected Public ID:", selectedPublicId);
  const capitalizedSelectedPath = selectedPath.charAt(0).toUpperCase() + selectedPath.slice(1);




  // /get category /////
  const getAllUsers = () => {
    // const urls = `${API_BASE_URL}/${selectedPath}?categoryId=${selectedPublicId}`;
    // console.log("urls-get",urls)
    const url = `${CATEGORY_API.GET_USERS}`;
    api
      .get(url)
      .then(response => {
        console.log("get-all users", response)
        // const categories = response.data;
        // const maxrole = Math.max(...categories.map(category => parseInt(category.role)), 0); // Find max category code
        // setMaxrole(maxrole);
        setGetData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const addCategoryHandler = () => {
    // setErrorMessage("");

    const errors = {};

    if (!formdetails.name) {
      errors.name = "name is required.";
    }
    if (!formdetails.email) {
      errors.email = "email is required.";
    }
    if (!formdetails.role) {
      errors.role = "role is required.";
    }
    if (!formdetails.mobileNumber) {
      errors.mobileNumber = "mobileNumber is required.";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSuccessMessage("");
      return;
    }

    setFormErrors({
      name: "",
      email: "",
      role: "",
      mobileNumber: ""
    });
    // const urls = `${API_BASE_URL}/${selectedPath}`
    // console.log("post-url",urls)
    const url = CATEGORY_API.POST_USERS
    // const newrole = maxrole + 1;
    const reqCategoryBody = {
      name: formdetails.name,
      email: formdetails.email,
      role: formdetails.role,
      mobileNumber: formdetails.mobileNumber,
      status: "active"
    }

    console.log("req-category-body-", reqCategoryBody)
    api
      .post(url, reqCategoryBody)
      .then(response => {

        if (response.status === 201) {
          setSuccessMessage("service added successfully")
          window.location.reload()
        } else {
          console.error("Unexpected response:", response)
        }
      })
      .catch(error => {
        console.log("err", error)
      })
  }


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const dataFiltered = getData.filter(item =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const notFound = !dataFiltered.length && !!filterName;
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClickOpen = (row) => {
    console.log("row", row)
    if (row.name) {
      setisEdit(true);
      setFormdetails({
        ...row,
        name: row.name,
      });
    } else {
      setisEdit(false);
      setFormdetails({
        name: '',
      });
      // Set isEdit to false when opening dialog for adding new service
    }
    console.log("isEdit:", isEdit);
    setOpen(true);

  };

  /// /////----- update----////////////
  const updateCategoryHandler = () => {

    console.log("formdetails in update", formdetails)


    const updateCategoryBody = {
      name: formdetails?.name,
      email: formdetails.email,
      role: formdetails.role,
      mobileNumber: formdetails.mobileNumber
    }
    console.log(updateCategoryBody, "updateCategoryBody")
    const url = `${CATEGORY_API.UPDATE_CATEGORY}/${formdetails.publicId}`;
    //  const urls = `${API_BASE_URL}/${selectedPath}/${selectedPublicId}`
    api.patch(url, updateCategoryBody, {
      headers: {
        'x-coreplatform-concurrencystamp': formdetails.concurrencyStamp
      }
    })

      .then(response => {
        if (response.status === 204) {
          window.location.reload()

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
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{capitalizedSelectedPath}</Typography>
        <h6>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
        </h6>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickOpen}
        >
          New {capitalizedSelectedPath}
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'Name', label: 'Name' },
                  { id: 'Email', label: 'Email' },
                  { id: 'Role', label: 'Role' },
                  { id: 'Mobile Number', label: 'Mobile Number' },

                  { id: 'status', label: 'Status' },
                  { id: 'Edit', label: 'Edit' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      domain={row.name}
                      email={row.email}
                      role={row.role}
                      mobileNumber={row.mobileNumber}
                      status={row.status}
                      edit={
                        <img
                          src={edit}
                          alt="Edit"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleClickOpen(row)}
                        />
                      }
                      publicId={row.publicId}
                      concurrencyStamp={row.concurrencyStamp}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      selectedPath={selectedPath}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={open} onClose={handleClose} sx={{ width: '100vw' }}>
        <Box width="30vw" p={2} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" justifyContent="space-between">

            <Typography variant="h5">
              {isEdit ? `Update ${capitalizedSelectedPath}` : `Add New ${capitalizedSelectedPath}`}
            </Typography>

            <Close
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleClose();
              }}
            />
          </Box>

          <TextField

            variant="outlined"
            placeholder="Please Enter Your name"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            value={formdetails.name}
            fullWidth
            height="20px"
            style={{
              border: formErrors.name && !formdetails.name ? "1px solid red" : "none",
              borderRadius: "8px"
            }}
          />
          <TextField

            variant="outlined"
            placeholder="Please Enter Your email"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            value={formdetails.email}
            fullWidth
            height="20px"
            style={{
              border: formErrors.email && !formdetails.email ? "1px solid red" : "none",
              borderRadius: "8px"
            }}
          />
          <TextField

            variant="outlined"
            placeholder="Please Enter Your role"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                role: e.target.value,
              }));
            }}
            value={formdetails.role}
            fullWidth
            height="20px"
            style={{
              border: formErrors.role && !formdetails.role ? "1px solid red" : "none",
              borderRadius: "8px"
            }}
          />
          <TextField

            variant="outlined"
            placeholder="Please Enter Your Mobile Number"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                mobileNumber: e.target.value,
              }));
            }}
            value={formdetails.mobileNumber}
            fullWidth
            height="20px"
            style={{
              border: formErrors.mobileNumber && !formdetails.mobileNumber ? "1px solid red" : "none",
              borderRadius: "8px"
            }}
          />
          <Button fullWidth variant="contained" color="primary" onClick={isEdit ? updateCategoryHandler : addCategoryHandler}>
            {isEdit ? "Update" : "Add"}
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}
