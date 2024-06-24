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
import { InputSelect } from 'src/components/Common/InputField';

import TableNoData from '../table-no-data';
import { emptyRows } from '../utils'; 
import UserTableToolbar from '../user-table-toolbar'; 
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';

import edit from '../../../../public/assets/images/edit_icon.gif';


// ----------------------------------------------------------------------

export default function PaymentsView() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [getData, setGetData] = useState([]);
  const [isEdit, setisEdit] = useState(false);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formdetails, setFormdetails] = useState({
    categoryId: '',
    amount: '',
    status: "active"
  });
  const [formErrors, setFormErrors] = useState({
    categoryId: '',
    amount: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const[errorMessage,setErrorMessage]=useState("")

  const [getServices, setGetServices] = useState([])
 
  useEffect(() => {
    const getAllCategory = () => {
      const url = `${CATEGORY_API.GET_CATEGORY}?pageSize=${rowsPerPage}&pageNumber=${page}`;
      api
        .get(url)
        .then((response) => {
          console.log('get-all category', response);
          setGetServices(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getAllCategory();
  }, [page, rowsPerPage]);

  useEffect(() => {
    // /get payment /////
    const getAllPayments = () => {
      const url = `${CATEGORY_API.GET_PAYMENT_CATEGORY}`;
      api
        .get(url)
        .then((response) => {
          console.log('get-all payments', response);
          // const categories = response.data;
          // const maxrole = Math.max(...categories.map(category => parseInt(category.role)), 0); // Find max category code
          // setMaxrole(maxrole);
          setGetData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllPayments();
  }, [rowsPerPage, page]);

  const addPaymentHandler = () => {
    // setErrorMessage("");

    const errors = {};

    if (!formdetails.categoryId) {
      errors.categoryId = 'Please Select Category.';
    }
    if (!formdetails.amount) {
      errors.amount = 'Amount is required.';
    } else if (!/^\d+$/.test(formdetails.amount)) {
      errors.amount = 'Amount must be a number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSuccessMessage('');
      return;
    }

    setFormErrors({
      categoryId: '',
      amount: '',
    });
    const url = CATEGORY_API.GET_PAYMENT_CATEGORY;

    const reqCategoryBody = {
      categoryId: formdetails.categoryId,
      amount: parseInt(formdetails.amount,10), // Convert amount to integer before sending
      status: "active",
    };

    console.log('payment-post-body-', reqCategoryBody);
    api
      .post(url, reqCategoryBody)
      .then((response) => {
        if (response) {
          setSuccessMessage('Payment added successfully');
          window.location.reload();
        } else {
          console.error('Unexpected response:', response);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          setErrorMessage(error.response.data.details.message || "Category Or Amount Already Exists");
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
  const dataFiltered = getData.filter((item) =>
    item?.category?.categoryName.toLowerCase().includes(filterName.toLowerCase())
  );

  const notFound = !dataFiltered.length && !!filterName;
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = (row) => {
    console.log('row', row);
    if (row.category?.categoryName) {
      setisEdit(true);
      setFormdetails({
        ...row,
        amount:row?.amount,
        categoryId: row.category.publicId,
        
      });
    } else {
      setisEdit(false);
      setFormdetails({
        categoryId: '',
        amount:""
      });
      // Set isEdit to false when opening dialog for adding new service
    }
    console.log('isEdit:', isEdit);
    setOpen(true);
  };

  /// /////----- update----////////////
  const updatePaymentHandler = () => {
    console.log('formdetails in update', formdetails);

    const updateCategoryBody = {
      categoryId: formdetails?.category?.publicId,
      amount: parseInt(formdetails.amount,10)
    };
    console.log(updateCategoryBody, 'updateCategoryBody');
    const url = `${CATEGORY_API.GET_PAYMENT_CATEGORY}/${formdetails.publicId}`;
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
      .catch(error => {
        if (error.response) {
          if (error.response.status === 417) {
            setErrorMessage(error.response.data.details.message || "Category Already Exists");
          } else if (error.response.status === 500) {
            setErrorMessage(error.response.data.details.message || "Amount Or Category  Already Exists");
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
        <Typography variant="h4">Payments</Typography>
        <h6>{successMessage && <div className="success-message">{successMessage}</div>}</h6>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickOpen}
        >
          New Payment
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
                  { id: 'Amount', label: 'Amount' },

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
                      domain={row?.category?.categoryName}
                      amount={row?.amount}
                      status={row?.status}
                      edit={
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
          rowsPerPageOptions={[10, 20, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={open} onClose={handleClose} sx={{ width: '100vw' }}>
        <Box width="30vw" p={2} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{isEdit ? 'Update Payment' : 'Add New Payment'}</Typography>

            <Close
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleClose();
              }}
            />
          </Box>
          <h6>
            {formErrors.categoryId && (
              <span className="error-message">
                {formErrors.categoryId}
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
            label="Categories :"
            style={{ width: "373px", padding: "8px" }}
            name="categoryId"
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                categoryId: e.target.value,
              }));
            }}
            value={formdetails.categoryId}
            valueKey="publicId"
            labelKey="categoryName"
            isRequired
            select
            options={getServices}
          />
          <TextField
            variant="outlined"
            placeholder="Please Enter Your amount"
            value={formdetails?.amount}
            onChange={(e) => {
              setFormdetails((prev) => ({
                ...prev,
                amount: e.target.value,
              }));
            }}
            fullWidth
            height="20px"
            style={{
              border: formErrors.amount && !formdetails.amount ? '1px solid red' : 'none',
              borderRadius: '8px',
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={isEdit ? updatePaymentHandler : addPaymentHandler}
          >
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}
