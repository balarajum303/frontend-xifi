import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Container,
    Button
} from "reactstrap";
import { Table, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { CATEGORY_API } from "src/components/Common/apiConfig";
import api from "src/components/Common/api";

const FileUpload = ({ userProfileData }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({ photo: "", voice: "" });
    const [files, setFiles] = useState({
        photo: null,
        voice: null
    });
    const [uploadedFiles, setUploadedFiles] = useState({
        photoUrl: "",
        voiceUrl: ""
    });

    const handleFileUpload = (e, fileType) => {
        const uploadedFile = e.target.files[0];
        setFiles(prevFiles => ({ ...prevFiles, [fileType]: uploadedFile }));
        createFileUpload(fileType, uploadedFile);
    };

    const createFileUpload = (fileType, file) => {
        const errors = {};
        setErrorMessage("");

        if (!file) {
            errors[fileType] = `Please upload the ${fileType} file.`;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setSuccessMessage("");
            return;
        }

        setFormErrors({ photo: "", voice: "" });

        const formData = new FormData();
        formData.append("file", file);

        const url = CATEGORY_API.POST_FILE_UPLOAD;

        api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            if (response.status === 200) {
                setSuccessMessage(`${fileType} uploaded successfully.`);
                setUploadedFiles(prevState => ({
                    ...prevState,
                    [`${fileType}Url`]: response.data.filename
                }));
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
    };

    const allFilesUploadeHandler = () => {
        const errors = {};
        setErrorMessage("");

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setSuccessMessage("");
            return;
        }

        setFormErrors({ photo: "", voice: "" });

        const updateBody = {
            name: userProfileData?.name,
            voiceUrl: uploadedFiles.voiceUrl,
            profileUrl: uploadedFiles.photoUrl
        };

        const url = CATEGORY_API.UPDATE_FILE_UPLOAD;
        console.log("updateBody", updateBody);

        api.patch(url, updateBody, {
            headers: {
                'x-coreplatform-concurrencystamp': userProfileData?.concurrencyStamp
            }
        })
        .then(response => {
            if (response.status === 204) {
                setSuccessMessage("Files uploaded successfully.");
                window.location.reload()
                
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
    };

    const clearForm = () => {
        setFiles({ photo: null, voice: null });
        setFormErrors({ photo: "", voice: "" });
        setErrorMessage("");
        setSuccessMessage("");
        window.location.reload();
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div className="table-rep-plugin">
                                        <div className="table-responsive mb-0" data-pattern="priority-columns">
                                            <h6>
                                                {formErrors.photo && (
                                                    <span className="error-message">{formErrors.photo}</span>
                                                )}
                                                {formErrors.voice && (
                                                    <span className="error-message">{formErrors.voice}</span>
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
                                                    onClick={allFilesUploadeHandler}
                                                >
                                                    Submit
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
        </React.Fragment>
    );
}

export default FileUpload;
