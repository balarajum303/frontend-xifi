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
import edit from '../../../../public/assets/images/edit_icon.gif';

// ----------------------------------------------------------------------

export default function ServicesView() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [getData, setGetData] = useState([]);
  // const [maxCategoryCode, setMaxCategoryCode] = useState(1);
  const [isEdit, setisEdit] = useState(false);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formdetails, setFormdetails] = useState({
    categoryName: '',
    categoryDescription: '',
    categoryCode: '',
  });
  const [formErrors, setFormErrors] = useState({
    categoryName: '',
    categoryDescription: '',
    categoryCode: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  // /get category /////ro
 

  useEffect(() => {
     const getAllCategory = () => {
       const url = `${CATEGORY_API.GET_CATEGORY}?pageSize=${rowsPerPage}&pageNumber=${page}`;
       api
         .get(url)
         .then((response) => {
           console.log('get-all category', response);
           // const categories = response.data;
           // const maxCategoryCode = Math.max(...categories.map(category => parseInt(category.categoryCode)), 0); // Find max category code
           // setMaxCategoryCode(maxCategoryCode);
           setGetData(response.data);
         })
         .catch((error) => {
           console.error(error);
         });
     };
  
    getAllCategory();
  }, [page, rowsPerPage]);

  console.log(getData, 'get Data');

  const addCategoryHandler = () => {
    // setErrorMessage("");

    const errors = {};

    if (!formdetails.categoryName) {
      errors.categoryName = 'categoryName is required.';
    }
    if (!formdetails.categoryDescription) {
      errors.categoryDescription = 'categoryDescription is required.';
    }
    if (!formdetails.categoryCode) {
      errors.categoryCode = 'categoryCode is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSuccessMessage('');
      return;
    }

    setFormErrors({
      categoryName: '',
      categoryDescription: '',
      categoryCode: '',
    });
    const url = CATEGORY_API.POST_CATEGORY;
    // const newCategoryCode = maxCategoryCode + 1;
    const reqCategoryBody = {
      categoryName: formdetails.categoryName,
      categoryDescription: formdetails.categoryName,
      categoryCode: formdetails.categoryCode,
      status: 'active',
    };

    api
      .post(url, reqCategoryBody)
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage('service added successfully');
          window.location.reload();
        } else {
          console.error('Unexpected response:', response);
        }
      })
      .catch((error) => {
        console.log('err', error);
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

  console.log(page, 'page');

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // const dataFiltered = applyFilter({
  //   inputData: users,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });
  const dataFiltered = getData.filter((item) =>
    item.categoryName.toLowerCase().includes(filterName.toLowerCase())
  );

  const notFound = !dataFiltered.length && !!filterName;
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClickOpen = (row) => {
    console.log('row', row);
    if (row.categoryCode) {
      setisEdit(true);
      setFormdetails({
        ...row,
        categoryName: row.categoryName,
      });
    } else {
      setisEdit(false);
      setFormdetails({
        categoryName: '',
      });
      // Set isEdit to false when opening dialog for adding new service
    }
    console.log('isEdit:', isEdit);
    setOpen(true);
  };

  /// /////----- update----////////////
  const updateCategoryHandler = () => {
    console.log('formdetails in update', formdetails);

    const updateCategoryBody = {
      categoryName: formdetails?.categoryName,
      categoryDescription: formdetails.categoryDescription,
      categoryCode: formdetails.categoryCode,
    };
    console.log(updateCategoryBody, 'updateCategoryBody');
    const url = `${CATEGORY_API.UPDATE_CATEGORY}/${formdetails.publicId}`;
    api
      .patch(url, updateCategoryBody, {
        headers: {
          'x-coreplatform-concurrencystamp': formdetails.concurrencyStamp,
        },
      })

      .then((response) => {
        if (response.status === 204) {
          window.location.reload();
        } else {
          console.error('Unexpected response:', response);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 417) {
            console.error('Error 417:', error);
          } else if (error.response.status === 500) {
            console.error('Error 500:', error);
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
        <Typography variant="h4">Services</Typography>
        <h6>{successMessage && <div className="success-message">{successMessage}</div>}</h6>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickOpen}
        >
          New Service
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
                  { id: 'Category Name', label: 'Category Name' },
                  { id: 'status', label: 'Status' },
                  { id: 'Edit', label: 'Edit' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {getData
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      domain={row.categoryName}
                      status={row.status}
                      email={
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
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
          rowsPerPageOptions={[10, 20, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={open} onClose={handleClose} sx={{ width: '100vw' }}>
        <Box width="30vw" p={2} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{isEdit ? 'Update Service' : 'Add New Service'}</Typography>

            <Close
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleClose();
              }}
            />
          </Box>

          <TextField
            variant="outlined"
            placeholder="Please Enter Your categoryName"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                categoryName: e.target.value,
              }));
            }}
            value={formdetails.categoryName}
            fullWidth
            height="20px"
            style={{
              border:
                formErrors.categoryName && !formdetails.categoryName ? '1px solid red' : 'none',
              borderRadius: '8px',
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Please Enter Your categoryDescription"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                categoryDescription: e.target.value,
              }));
            }}
            value={formdetails.categoryDescription}
            fullWidth
            height="20px"
            style={{
              border:
                formErrors.categoryDescription && !formdetails.categoryDescription
                  ? '1px solid red'
                  : 'none',
              borderRadius: '8px',
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Please Enter Your categoryCode"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                categoryCode: e.target.value,
              }));
            }}
            value={formdetails.categoryCode}
            fullWidth
            height="20px"
            style={{
              border:
                formErrors.categoryCode && !formdetails.categoryCode ? '1px solid red' : 'none',
              borderRadius: '8px',
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={isEdit ? updateCategoryHandler : addCategoryHandler}
          >
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}
