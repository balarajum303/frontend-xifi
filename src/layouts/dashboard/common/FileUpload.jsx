import React, { useState, useEffect } from "react";
import { Tr, Td, Table, Tbody } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
    Row,
    Col,
    Card,
    Button,
    CardBody,
    Container
} from "reactstrap";

import api from "src/components/Common/api";
import { CATEGORY_API } from "src/components/Common/apiConfig";

const FileUpload = () => {
    const [formdetails, setFormdetails] = useState({
        docTypeId: "",
        progarmId: "",
        firstPrefrence: "",
        academicYear: "",
        needToProduce: "",
        needToProduceSemwiseMc: "",
        isMarksCard: "",
        isConsolidatedMarks: "",
        isSemesterWise: "",
        isIncludeLanguage: "",
        isPreviousExam: "",
        isExamReq: "",
    });

    const [show, setShow] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({ photo: "", voice: "" });
    const [files, setFiles] = useState({
        photo: null,
        voice: null
    });

    const handleFileUpload = (e, fileType) => {
        const uploadedFile = e.target.files[0];
        setFiles(prevFiles => ({ ...prevFiles, [fileType]: uploadedFile }));
    };

    useEffect(() => {
        const successMessage = localStorage.getItem("successMessage");
        if (successMessage) {
            setSuccessMessage(successMessage);
            localStorage.removeItem("successMessage");
        }
    }, []);

    const createFileUpload = (fileType) => {
        const errors = {};
        setErrorMessage("");

        if (!files[fileType]) {
            errors[fileType] = `Please upload the ${fileType} file.`;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setSuccessMessage("");
            return;
        }

        setFormErrors({ photo: "", voice: "" });

        const formData = new FormData();
        formData.append(fileType, files[fileType]);

        console.log(`FormData for ${fileType}:`, formData.get(fileType));

        const url = CATEGORY_API.POST_FILE_UPLOAD;

        api
            .post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(`${fileType} upload response:`, response.data);
                    localStorage.setItem("successMessage", `${fileType} uploaded successfully.`);
                    localStorage.removeItem("errorMessage");
                    window.location.reload();
                } else {
                    console.error("Unexpected response:", response);
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 417) {
                        console.error("Error 417:", error);
                        setErrorMessage(error.response.data);
                    } else if (error.response.status === 500) {
                        console.error("Error 500:", error);
                        setErrorMessage("Something Went Wrong!");
                    }
                }
            });
    }

    useEffect(() => {
        const errorMessage = localStorage.getItem("errorMessage");
        if (errorMessage) {
            setErrorMessage(errorMessage);
            localStorage.removeItem("errorMessage");
        }
    }, []);

    const clearForm = () => {
        setFiles({ photo: null, voice: null });
        setFormErrors({ photo: "", voice: "" });
        setErrorMessage("");
        setSuccessMessage("");
        window.location.reload()
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div className="table-rep-plugin">
                                        <div className="table-responsive mb-0" data-pattern="priority-columns">
                                            <h6>
                                                {formErrors.photo && (
                                                    <h7 className="error-message">{formErrors.photo}</h7>
                                                )}
                                                {formErrors.voice && (
                                                    <h7 className="error-message">{formErrors.voice}</h7>
                                                )}
                                            </h6>
                                            <h6>
                                                {successMessage && (
                                                    <div className="success-message">
                                                        {successMessage}
                                                    </div>
                                                )}
                                            </h6>
                                            <h6>
                                                {errorMessage && (
                                                    <div className="error-message">{errorMessage}</div>
                                                )}
                                            </h6>
                                            <Table className="table table-striped table-bordered">
                                                <Tbody>
                                                    <Tr className="fieldLabel">
                                                        <Td align="right">
                                                            <span className="mandatory">*</span>Photo:
                                                        </Td>
                                                        <Td style={{ width: "40px" }}>
                                                            <input
                                                                className={`${formErrors.photo ? "error-input" : ""}`}
                                                                type="file"
                                                                onChange={(e) => handleFileUpload(e, 'photo')}
                                                            />
                                                        </Td>

                                                        <Td>
                                                            <span className="mandatory">*</span>Voice:
                                                        </Td>
                                                        <Td>
                                                            <input
                                                                className={`${formErrors.voice ? "error-input" : ""}`}
                                                                type="file"
                                                                onChange={(e) => handleFileUpload(e, 'voice')}
                                                            />
                                                        </Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                            &nbsp;
                                            <div className="d-flex justify-content-center gap-3">
                                                <Button color="danger" onClick={clearForm} className="me-2">
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => createFileUpload('photo')}
                                                >
                                                    Submit Photo
                                                </Button>
                                                <Button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => createFileUpload('voice')}
                                                >
                                                    Submit Voice
                                                </Button>
                                            </div>
                                            &nbsp;
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {successMessage && Object.keys(formErrors).length === 0 && (
                <div className="success-message">{successMessage}</div>
            )}
        </>
    );
}

export default FileUpload;
