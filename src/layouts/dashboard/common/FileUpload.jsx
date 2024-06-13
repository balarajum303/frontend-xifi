import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, CardBody, Container } from "reactstrap";
import PropTypes from 'prop-types';
import api from "src/components/Common/api";
import { CATEGORY_API } from "src/components/Common/apiConfig";

const FileUpload = () => {
    const [userProfileData, setUserProfileData] = useState({
        name: "",
        concurrencyStamp: "",
        profileUrl: "",
        voiceUrl: ""
    });

    // Define the base URL where your files are hosted
    const BASE_URL = "https://your-hosted-files-base-url/";

    // Get User Profile Data
    const getUserProfileData = () => {
        const url = `${CATEGORY_API.GET_USER_PROFILE}`;
        api.get(url)
            .then(response => {
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
                            <CardBody>
                                <div className="table-rep-plugin">
                                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                                        <div>
                                            {userProfileData.profileUrl && (
                                                <img 
                                                    src={`${BASE_URL}${userProfileData.profileUrl}`} 
                                                    alt="Profile" 
                                                    style={{ maxWidth: '100%' }} 
                                                    
                                                />
                                            )}
                                            {userProfileData.voiceUrl && (
                                                <audio controls>
                                                    <source src={`${BASE_URL}${userProfileData.voiceUrl}`} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center gap-3">
                                    <Button color="danger" onClick={clearForm} className="me-2">
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
