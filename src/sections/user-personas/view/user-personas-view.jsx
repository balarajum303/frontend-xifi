/* eslint-disable radix */
/* eslint-disable jsx-a11y/media-has-caption */
import { ReactMic } from 'react-mic';
import { useRef, useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';

export default function UserPersonas() {
  const [audioURL, setAudioURL] = useState('');
  const [image, setImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    seconds: 0,
  });
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
  };

  const handleDivClick = () => {
    // Trigger click on the file input when the div is clicked
    fileInputRef.current.click();
  };

  const [isRecording, setIsRecording] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setOpenSnackbar(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };
  const [timer, setTimer] = useState(0);

  // eslint-disable-next-line consistent-return
  useEffect(()=>{
    if (isRecording) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000); // Update timer every second

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  useEffect(() => {
    if (timer >= formData.seconds) {
      setIsRecording(false); // Stop recording when timer reaches the specified duration
    }
  }, [timer, formData.seconds]);

  const handleAudioData = (audioData) => {
    setAudioURL(audioData.blobURL);
    setTimer(0); // Reset the timer after recording stops
  };

  const handleIncrement = () => {
    setFormData((prev) => ({
      ...prev,
      seconds: parseInt(prev.seconds) + 1,
    }));
  };

  const handleDecrement = () => {
    if (formData.seconds > 0) {
      setFormData((prev) => ({
        ...prev,
        seconds: parseInt(prev.seconds) - 1,
      }));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex" flexDirection="column" gap={2} width="50%">
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Please Enter Your Email"
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
          value={formData.email}
          height="20px"
          width="50%"
        />
        <Button
          sx={{ width: '20%' }}
          variant="outlined"
          onClick={() => {
            if (formData.email !== '') {
              setOpen(!open);
            }
          }}
        >
          Submit
        </Button>
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
            <Typography fontWeight={600}>{`Email ${formData.email} is verified`}</Typography>
          </Box>
          <Box mt={2} display="flex" flexDirection="column" gap={2} width="50%">
            <Typography variant="h3">Record Your Voice</Typography>
            <Box display="flex" alignItems="center">
              <TextField
                label="Duration (Seconds)"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setFormData({ seconds: e.target.value });
                }}
                value={formData.seconds}
                InputProps={{ inputProps: { min: 0 } }}
                style={{ marginRight: '10px' }}
              />
              <Button variant="contained" onClick={handleIncrement} style={{ marginRight: '5px' }}>
                +
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDecrement}
                style={{ marginRight: '10px' }}
              >
                -
              </Button>
            </Box>

            <div>
              <ReactMic
                record={isRecording}
                onStop={handleAudioData}
                className="sound-wave"
                strokeColor="#000000"
                backgroundColor="#FF4081"
              />
              <Button
                onClick={() => setIsRecording(!isRecording)}
                color={isRecording ? 'error' : 'success'}
              >
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
                </div>
              )}
            </div>
          </Box>
          {!image ? (
            <Box mt={2} display="flex" flexDirection="column" gap={2}>
              <Typography variant="h3">Image Upload</Typography>
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
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleDivClick}
              >
                {' '}
                <input
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <Typography
                  fontSize="14px"
                  color="rgba(0, 0, 0, 1)"
                  fontWeight={500}
                  textAlign="center"
                  mb={2}
                >
                  Click / Drag to upload
                </Typography>
                <Typography
                  fontSize="12px"
                  color="rgba(55, 55, 55, 1)"
                  fontWeight={400}
                  textAlign="center"
                  width="55%"
                >
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
                autoHideDuration={3000} // Close after 3 seconds
                onClose={handleCloseSnackbar}
                message="Image uploaded successfully!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              />
            </>
          )}
        </Box>
      )}
    </Container>
  );
}
