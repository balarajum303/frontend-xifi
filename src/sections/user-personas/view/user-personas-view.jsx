import { ReactMic } from 'react-mic';
import { useRef, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { CATEGORY_API } from 'src/components/Common/apiConfig';
import api from 'src/components/Common/api';
import { useRouter } from 'src/routes/hooks';

export default function UserPersonas() {
  const [emailErr, setEmailErr] = useState("")
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [voice, setVoice] = useState(null);
  const [image, setImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({ email: '', seconds: 0 });
  const [open, setOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState({
    photoUrl: "",
    voiceUrl: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [getData, setGetData] = useState([]);
  const voiceFileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  /////get users///
  const getAllUsers = () => {
    const url = `${CATEGORY_API.GET_USERS}?pageSize=${50}`;
    api
      .get(url)
      .then((response) => {
        console.log('get-all users', response);
        setGetData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, [])
  /// Get User Profile /////
  const getUserProfileData = () => {
    const url = `${CATEGORY_API.GET_USER_PROFILE}`;
    api
      .get(url)
      .then(response => {
        console.log("get user Profile", response.data)
        setUserProfileData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  useEffect(() => {
    getUserProfileData()
  }, [])

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const handleAudioData = (audioData) => {
    setAudioURL(audioData.blobURL);
    setAudioBlob(audioData.blob);
    setTimer(0);
  };

  const handleDownloadAudio = () => {
    if (!audioBlob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(audioBlob);
    link.download = 'recording.wav';
    link.click();
  };

  const handleVoiceFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      createUploadFiles(fileType, file);
      const reader = new FileReader();
      reader.onload = () => {
        setVoice(reader.result);
        setOpenSnackbar(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      createUploadFiles(fileType, file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setOpenSnackbar(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const createUploadFiles = (fileType, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const url = CATEGORY_API.POST_FILE_UPLOAD;

    api.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
            //setErrorMessage(error.response.data);
          } else if (error.response.status === 500) {
            console.error("Error 500:", error);
            // setErrorMessage("Something Went Wrong!");
          }
        }
      });
  };
  const allFilesUploadedHandler = () => {
    const errors = {};
    setErrorMessage("");

    if (Object.keys(errors).length > 0) {
      // setFormErrors(errors);
      setSuccessMessage("");
      return;
    }

    // setFormErrors({ photo: "", voice: "" });

    const updateBody = {
      name: userProfileData?.name,
      voiceUrl: uploadedFiles.voiceUrl,
      profileUrl: uploadedFiles.imageUrl
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
          setOpen(!open)
          setSuccessMessage("Files uploaded successfully.");



        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch(error => {
        if (error.response) {
          // setOpen(!open)
          setErrorMessage("you uploaded existing files");
          setSuccessMessage("")

          if (error.response.status === 417) {
            console.error("Error 417:", error);


          } else if (error.response.status === 500) {
            console.error("Error 500:", error);
            setErrorMessage("Something Went Wrong!");
          }
        }
      });
  };
  const handleClick = () => {
    const emailExists = getData.some(item => item.email === formData.email);
    if (emailExists) {
      setOpen(!open);
      setEmailErr('');  // Clear the error message if the condition is true
    } else {
      setEmailErr('Email not found');
    }
  };
  return (
    <Container maxWidth="xl">
      <Box display="flex" flexDirection="column" gap={2} width="50%">
        <h6>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
        </h6>
        <h6> {emailErr && (
          <Typography color="error">{emailErr}</Typography>
        )}</h6>
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Please Enter Your Email"
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          value={formData.email}
        />
        <div>
          <Button
            sx={{ width: '20%' }}
            variant="outlined"
            onClick={handleClick}
          >
            Submit
          </Button>

        </div>

      </Box>
      {open && (
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="50%"
            mt="1%"
            borderRadius="10px"
            bgcolor="#d9e2fb"
            height="40px"
            textAlign="start"
            p="8px"
          >
            <Typography fontWeight={600}>{` ${formData.email} is verified`}</Typography>
          </Box>
          <Box mt={2} display="flex" flexDirection="column" gap={2} width="50%">
            <Typography variant="h3">Record Your Voice</Typography>
            <Box display="flex" alignItems="center">
              <TextField
                label="Duration (Seconds)"
                variant="outlined"
                type="number"
                onChange={(e) => setFormData({ seconds: e.target.value })}
                value={formData.seconds}
                InputProps={{ inputProps: { min: 0 } }}
                style={{ marginRight: '10px' }}
              />
              <Button variant="contained" onClick={() => setFormData(prev => ({ ...prev, seconds: parseInt(prev.seconds) + 1 }))} style={{ marginRight: '5px' }}>
                +
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => formData.seconds > 0 && setFormData(prev => ({ ...prev, seconds: parseInt(prev.seconds) - 1 }))}
                style={{ marginRight: '10px' }}
              >
                -
              </Button>
            </Box>
            <div>
              <ReactMic record={isRecording} onStop={handleAudioData} className="sound-wave" strokeColor="#000000" backgroundColor="rgba(55, 155, 155, 0.5)" />
              <Button style={{ backgroundColor: "silver" }} onClick={() => setIsRecording(!isRecording)} color={isRecording ? 'error' : 'success'} >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              <Typography variant="body2">{isRecording && <>Recording... {timer}</>}</Typography>
              {audioURL && (
                <div>
                  <Typography variant="body2">Playback:</Typography>
                  <audio controls style={{ width: '100%' }}>
                    <source src={audioURL} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                  <Button variant="contained" color="primary" onClick={handleDownloadAudio} style={{ marginTop: '10px' }}>
                    Download Recording
                  </Button>
                </div>
              )}
            </div>
          </Box>
          <nav style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "133px" }}>
            <div>
              <Typography variant="h3">Voice Upload</Typography>
              {!voice ? (
                <Box mt={2} display="flex" flexDirection="column" gap={2}>
                  <Box
                    sx={{
                      height: '200px',
                      mt: '3%',
                      width: '100%',
                      border: 'dashed 1px rgba(76, 98, 214, 1)',
                      borderRadius: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(237, 244, 255, 1)',
                      cursor: 'pointer',
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => event.preventDefault()}
                    onClick={() => voiceFileInputRef.current.click()}
                  >
                    <input
                      accept="audio/*"
                      type="file"
                      onChange={(e) => handleVoiceFileChange(e, 'voice')}
                      ref={voiceFileInputRef}
                      style={{ display: 'none' }}
                    />
                    <Typography fontSize="14px" color="rgba(0, 0, 0, 1)" fontWeight={500} textAlign="center" mb={2}>
                      Click / Drag to upload
                    </Typography>
                    <Typography fontSize="12px" color="rgba(55, 55, 55, 1)" fontWeight={400} textAlign="center" width="55%">
                      Click on this area to upload Voice
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box mt="2%" style={{ width: '20%', height: '20%' }}>
                    <audio controls style={{ width: '100%' }}>
                      <source src={audioURL} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </Box>
                  <Button onClick={() => setVoice(null)} color="error">
                    Clear
                  </Button>
                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    message="Voice uploaded successfully!"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  />
                </>
              )}
            </div>
            <div>
              <Typography variant="h3">Image Upload</Typography>
              {!image ? (
                <Box mt={2} display="flex" flexDirection="column" gap={2}>
                  <Box
                    sx={{
                      height: '200px',
                      mt: '3%',
                      width: '100%',
                      border: 'dashed 1px rgba(76, 98, 214, 1)',
                      borderRadius: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(237, 244, 255, 1)',
                      cursor: 'pointer',
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => event.preventDefault()}
                    onClick={() => imageFileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      onChange={(e) => handleImageFileChange(e, 'image')}
                      ref={imageFileInputRef}
                      style={{ display: 'none' }}
                    />
                    <Typography fontSize="14px" color="rgba(0, 0, 0, 1)" fontWeight={500} textAlign="center" mb={2}>
                      Click / Drag to upload
                    </Typography>
                    <Typography fontSize="12px" color="rgba(55, 55, 55, 1)" fontWeight={400} textAlign="center" width="55%">
                      Click on this area to upload image
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box mt="2%" style={{ width: '20%', height: '20%' }}>
                    <img src={image} alt="Uploaded" />
                  </Box>
                  <Button onClick={() => setImage(null)} color="error">
                    Clear
                  </Button>
                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    message="Image uploaded successfully!"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  />
                </>
              )}
            </div>

          </nav>
          <h6>
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
          </h6>
          <div style={{ width: "50%", display: "flex", flexDirection: "row", justifyContent: "center", margin: "33px 23px" }}>
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: '10px' }}
              onClick={() => setOpen(!open)}
            >
              Back
            </Button>
            <Button variant="contained" style={{ marginRight: '5px' }} onClick={allFilesUploadedHandler}>
              Submit
            </Button>
          </div>

        </Box>
      )
      }
    </Container >
  );
}
