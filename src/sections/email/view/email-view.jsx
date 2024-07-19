import React, { useState, useEffect } from 'react';
import { Box, Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import api from 'src/components/Common/api';
import { CATEGORY_API } from 'src/components/Common/apiConfig';
import { InputSelect } from 'src/components/Common/InputField';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { users } from 'src/_mock/user';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows } from '../utils';
import UserTableHead from '../user-table-head';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import TableNoData from '../table-no-data';
import { Close } from '@mui/icons-material';
import edit from "../../../../public/assets/images/edit_icon.gif"

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [getData, setGetData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formDetails, setFormDetails] = useState({ usersId: "" });
  const [formErrors, setFormErrors] = useState({ usersId: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const[errorMessage,setErrorMessage]=useState("")
  const [allUsers, setAllUsers] = useState([]);
  const path = window.location.pathname;
  const pathSegments = path.split('/');
  const selectedPath = pathSegments[1];
  const selectedPublicId = pathSegments[pathSegments.length - 1];
  const capitalizedSelectedPath = selectedPath.charAt(0).toUpperCase() + selectedPath.slice(1);

  useEffect(() => {
    const getAllUsers = () => {
      const url = `${CATEGORY_API.GET_USERS}?pageSize=50`;
      api.get(url)
        .then(response => {
          setAllUsers(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    getAllUsers();
  }, [page, rowsPerPage]);



  useEffect(() => {
    const getAllServices = () => {
      const url = `${CATEGORY_API.GET_USER_CATEGORY}`;
      api.get(url)
        .then(response => {
          setGetData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    getAllServices();
  }, [page, rowsPerPage, selectedPublicId]);

  const addCategoryHandler = () => {
    const errors = {};
    if (!formDetails.usersId) {
      errors.usersId = "Please select a user.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSuccessMessage("");
      return;
    }

    setFormErrors({ usersId: "" });

    const reqCategoryBody = {
      categoryId: selectedPublicId,
      usersId: formDetails.usersId,
      status: "active"
    };

    api.post(CATEGORY_API.GET_USER_CATEGORY, reqCategoryBody)
      .then(response => {
        if (response.status === 201) {
          setSuccessMessage("Service added successfully");
          window.location.reload();
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          setErrorMessage(error.response.data.details.message || "User Already Exists");
        }
        console.log("Error:", error);
      });
  };

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
    {
      console.log(item, selectedPublicId, "item")
    return item.user && item.user.name.toLowerCase().includes(filterName.toLowerCase()) && item?.category?.publicId === selectedPublicId
    }
  );
  console.log(dataFiltered, 'data filete fata')
  const notFound = !dataFiltered.length && !!filterName;
  const [open, setOpen] = useState(false);

  const handleClickOpen = (row) => {
    console.log("row in edit",row)
    if (row.usersId) {
      setIsEdit(true);
      setFormDetails({
        ...row,
        usersId: row.usersId,
      });
    } else {
      setIsEdit(false);
      setFormDetails({
        usersId: '',
      });
    }
    setOpen(true);
  };

  const updateCategoryHandler = () => {
    const updateCategoryBody = {
      categoryId: selectedPublicId,
      usersId: formDetails.usersId,
    };
    console.log("updateCategoryBody",updateCategoryBody)
    console.log("concurrenct stamp in update",formDetails)

    const url = `${CATEGORY_API.GET_USER_CATEGORY}/${formDetails.publicId}`;
    api.patch(url, updateCategoryBody, {
      headers: {
        'x-coreplatform-concurrencystamp': formDetails.concurrencyStamp
      }
    })
      .then(response => {
        if (response.status === 204) {
          window.location.reload();
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 417) {
            setErrorMessage(error.response.data.details.message || "User Already Exists");
          } else if (error.response.status === 500) {
            setErrorMessage(error.response.data.details.message || "User Already Exists");
          }
        }
      });
  };
  
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
                      key={row?.user?.id}
                      domain={row?.user?.name}
                      email={row?.user?.email}
                      role={row?.user?.role}
                      mobileNumber={row?.user?.mobileNumber}
                      status={row?.status}
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
          rowsPerPageOptions={[5,10, 20, 50, 100]}
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
              onClick={handleClose}
            />
          </Box>
          <h6>
              {formErrors.usersId && (
                <span className="error-message">
                  {formErrors.usersId}
                </span>
              )}
            </h6>
            <h6>
              {errorMessage && (
                <span className="error-message">
                  {errorMessage}
                </span>
              )}
            </h6>
          <InputSelect
            label="Users :"
            style={{ width: "373px", padding: "8px" }}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                usersId: e.target.value,
              }));
            }}
            value={formDetails.usersId}
            valueKey="publicId"
            labelKey="name"
            isRequired={true}
            select={true}
            options={allUsers}
          />

          <Button fullWidth variant="contained" color="primary" onClick={isEdit ? updateCategoryHandler : addCategoryHandler}>
            {isEdit ? "Update" : "Add"}
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}
