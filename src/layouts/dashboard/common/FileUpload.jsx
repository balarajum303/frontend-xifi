import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, CardBody, Container } from "reactstrap";
import PropTypes from 'prop-types';
import api from "src/components/Common/api";
import { CATEGORY_API } from "src/components/Common/apiConfig";
import { Box, Typography } from "@mui/material";

const FileUpload = () => {
    const [userProfileData, setUserProfileData] = useState({
        name: "",
        concurrencyStamp: "",
        profileUrl: "",
        voiceUrl: ""
    });

    // Define the base URL where your files are hosted
    // const BASE_URL = "https://your-hosted-files-base-url/";

    // Get User Profile Data
    const getUserProfileData = () => {
        const url = `${CATEGORY_API.GET_USER_PROFILE}`;
        api.get(url)
            .then(response => {
                console.log("user-profile get in userProfile page",response.data)
                setUserProfileData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getUserProfileData();
    }, []);

    const clearForm = () => {
        window.location.reload();
    };

    return (
        <div className="page-content">

            <Container fluid>

                <Row>
                    <Col>
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '18px' }}>
                                <Card style={{ border: 'none' }}>
                                    <CardBody style={{ padding: '10px', border: '1px solid silver', borderRadius: '33px', boxShadow: "1px 1px 1px 1px silver" }}>
                                        <Typography variant="h6" align="center">
                                            Click on a voice to hear it
                                        </Typography>
                                    </CardBody>
                                </Card>
                            </div>
                            <CardBody>
                                <div className="table-rep-plugin" style={{ marginTop: "18px" }}>

                                    <div className="table-responsive mb-0" data-pattern="priority-columns">


                                        <div>
                                            {userProfileData.profileUrl && (
                                                <img
                                                    src={userProfileData.profileUrl}
                                                    alt="Profile"
                                                    style={{ maxWidth: '100%' }}

                                                />
                                            )}
                                            {userProfileData.voiceUrl && (
                                                <audio controls>
                                                    <source src={userProfileData.voiceUrl} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center gap-3">
                                    <Button color="danger" onClick={clearForm} className="me-2" style={{ marginTop: "18px" }}>
                                        Cancel
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

FileUpload.propTypes = {
    userProfileData: PropTypes.shape({
        name: PropTypes.string,
        concurrencyStamp: PropTypes.string,
        profileUrl: PropTypes.string,
        voiceUrl: PropTypes.string,
    }).isRequired,
};

export default FileUpload;
