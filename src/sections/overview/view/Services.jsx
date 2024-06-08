// Example of importing Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState ,useEffect } from "react"
import { Row, Col, Card, Modal, CardBody, Container } from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Tr, Th, Td, Table, Thead, Tbody } from "react-super-responsive-table";

import InputField from "src/components/Common/InputField";
import api, { CATEGORY_API } from "src/components/Common/apiConfig";



const Services = () => {
    document.title = "Knowledge pro | Admission Status Entry"
    const [admissionDetails, setAdmissionDetails] = useState([])
    const [formdetails, setFormdetails] = useState({
        categoryName: "",
        categoryCode: "",
    })
    const [isEdit, setisEdit] = useState(false)
    const [deleteId, setDelteID] = useState(null)
    const [filterdata, setFilterdata] = useState([])
    // const [query, setQuery] = useState("")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)
    const [successMessage, setSuccessMessage] = useState("")
    const [formErrors, setFormErrors] = useState({
        categoryName: "",
    })
    const [errorMessage, setErrorMessage] = useState("")

    /// /////////-----------get-----------////////////
    const getAdmissionEntry = () => {
        const url = CATEGORY_API.GET_ALL_ADMISSION_STATUS
        api
            .get(url)
            .then(response => {
                console.log(response)
                setAdmissionDetails(response.data)
                setFilterdata(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    useEffect(() => {
        getAdmissionEntry()
    }, [])

    useEffect(() => {
        // eslint-disable-next-line no-shadow
        const successMessage = localStorage.getItem("successMessage")
        if (successMessage) {
            setSuccessMessage(successMessage)
            localStorage.removeItem("successMessage")
        }
    }, [])

    /// //------post---------------------------//////////////////////////////////
    const createAdmissionEntry = () => {
        // Clear any previous error message
        setErrorMessage("")

        const errors = {}

        if (!formdetails.name) {
            errors.name = "Admission Status Name is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            setSuccessMessage("")
            return
        }

        setFormErrors({
            name: "",
        })

        const {name} = formdetails
        const url = CATEGORY_API.POST_ADMISSION_STATUS
        api
            .post(url, formdetails)
            .then(response => {
                getAdmissionEntry()
                if (response.status === 200) {
                    // clearForm();
                    localStorage.setItem("successMessage", `${response.data}`)
                    localStorage.removeItem("errorMessage")
                    window.location.reload()
                } else {
                    console.error("Unexpected response:", response)
                }
            })
            .catch(error => {
                console.log("err", error)
                if (error.response) {
                    if (error.response.status === 417) {
                        console.error("Error 417:", error)

                        // setErrorMessage(error.response.data);
                        localStorage.setItem(
                            "errorMessage",
                            `${name}${error.response.data}`
                        )
                    } else if (error.response.status === 500) {
                        console.error("Error 500:", error)
                        localStorage.setItem("errorMessage", `${name}${error.response.data}`)
                    }
                }

                clearForm()
                localStorage.removeItem("successMessage")
                window.location.reload()
            })
    }

    useEffect(() => {
        // eslint-disable-next-line no-shadow
        const errorMessage = localStorage.getItem("errorMessage")
        if (errorMessage) {
            setErrorMessage(errorMessage)
            localStorage.removeItem("errorMessage")
        }
    }, [])

    /// ////----delete------////////////////
    const deleteAdmissionEntry = () => {
        const url = `${CATEGORY_API.DELETE_ADMISSION_STATUS}/${deleteId}`
        api
            .delete(url)
            .then(response => {
                console.log("del-res", response.data)

                if (response.status === 200) {
                    clearForm()
                    getAdmissionEntry()
                    localStorage.setItem("successMessage", `${response.data}`)
                    setShow(false)
                    window.location.reload()
                } else {
                    console.error("Unexpected response:", response)
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 417) {
                        console.error("Error 417:", error)
                        localStorage.setItem("errorMessage", `${error.response.data}`)

                    }
                }
            })
    }

    const clearForm = () => {
        window.location.reload()
    }
    const restDataHandler = () => {
        clearForm()
    }
    /// ////////////////////.....................edit........//////////////////////////////////
    const getEditEntry = user => {
        console.log(localStorage.getItem("token"))
        const url = `${CATEGORY_API.GET_ADMISSION_STATUS_BYID}/${user.id}`
        api.get(url).then(response => {
            console.log(response)
            setFormdetails(response.data)
            setisEdit(true)
        })
    }

    /// /////----- update----////////////
    const updateAdmissionEntry = () => {
        setErrorMessage("")

        const errors = {}

        if (!formdetails.name) {
            errors.name = "Admission Status Name is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            setSuccessMessage("")
            return
        }

        setFormErrors({
            name: "",
        })

        const req = {
            id: formdetails.id,
            name: formdetails.name,
        }
        const {name} = formdetails
        const url = CATEGORY_API.UPDATE_ADMISSION_STATUS
        api
            .put(url, req)
            .then(response => {
                if (response.status === 200) {
                    setisEdit(false)
                    clearForm()
                    localStorage.setItem("successMessage", `${name}${response.data}`)
                    window.location.reload()
                } else {
                    console.error("Unexpected response:", response)
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 417) {
                        console.error("Error 417:", error)
                        localStorage.setItem(
                            "errorMessage",
                            `${name}${error.response.data}`
                        )
                    } else if (error.response.status === 500) {
                        console.error("Error 500:", error)
                        localStorage.setItem("errorMessage", `${error.response.data}`)
                    }
                }

                clearForm()
                localStorage.removeItem("successMessage")
                window.location.reload()
            })
    }

    const handleInputChange = e => {
        const newStatus = { ...formdetails }
        const inputName = e.target.name
        newStatus[inputName] = e.target.value
        setFormdetails(newStatus)
    }
    useEffect(() => {
        getAdmissionEntry()
    }, [])



    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div className="table-rep-plugin">
                                        <div
                                            className="table-responsive mb-0"
                                            data-pattern="priority-columns"
                                        >

                                            <h6>
                                                {formErrors.name && (
                                                    <h7 className="error-message">{formErrors.name}</h7>
                                                )}{" "}
                                            </h6>
                                            <h6>
                                                {errorMessage && (
                                                    <div className="error-message">{errorMessage}</div>
                                                )}
                                            </h6>
                                            <h6>
                                                {successMessage && (
                                                    <div className="success-message">
                                                        {successMessage}
                                                    </div>
                                                )}
                                            </h6>
                                            <Table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <td align="right">
                                                            <span className="mandatory">*</span>{" "}
                                                            CategoryName :
                                                        </td>
                                                        <td align="left">
                                                            <InputField
                                                                type="text"
                                                                name="categoryName"
                                                                isRequired={false}
                                                                value={formdetails.categoryName}
                                                                onChange={e => {
                                                                    handleInputChange(e)
                                                                }}

                                                            />

                                                        </td>
                                                    </tr>
                                                </thead>
                                            </Table>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="hstack gap-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={isEdit ? updateAdmissionEntry : createAdmissionEntry}
                                                    >
                                                        {isEdit ? "Update" : "Submit"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={restDataHandler}
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>

                                            <Table
                                                id="tech-companies-1"
                                                className="table table-striped table-bordered"
                                            >
                                                <Thead>
                                                    <Tr>
                                                        <Th data-priority="1">Sl No</Th>
                                                        <Th data-priority="3">Category Name</Th>
                                                        <Th data-priority="1">Edit</Th>
                                                        <Th data-priority="3">Delete</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {admissionDetails.map((user, index) => (
                                                        <Tr key={index}>
                                                            <Td>{index + 1}</Td>
                                                            <Td>{user.admissionStatus}</Td>
                                                            <Td>
                                                                <button style={{ border: "none" }} />
                                                            </Td>
                                                            <Td>
                                                                <button
                                                                    style={{ border: "none" }}
                                                                    onClick={() => setDelteID(user.id)}
                                                                 />
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal
                    show={show}
                    centered
                    onHide={handleClose}
                    animation={false}
                >
                    <Modal.Header closebutton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to Delete.</Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleClose}>
                            Cancel
                        </button>
                        <button
                            variant="danger"
                            onClick={e => {
                                deleteAdmissionEntry()
                            }}
                        >
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            {successMessage && Object.keys(formErrors).length === 0 && (
                <div className="success-message">{successMessage}</div>
            )}
        </>
    )
}

// Services.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default Services
