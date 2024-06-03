import React, { useState } from 'react';

import {
  Grid,
  Paper,
  AppBar,
  Avatar,
  Divider,
  Toolbar,
  Container,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

function ChatBotComponent() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { text: inputText, sender: 'user' };
      setMessages((prev)=>[...prev, newMessage]);
      setInputText('');

      // Simulating bot response
      const newBotMessage = { text: 'This is a dummy response from the bot.', sender: 'bot' };
      setTimeout(() => {
        setMessages((prev)=>[...prev, newBotMessage]);
      }, 500);
    }
  };

  return (
    <Container maxWidth="sm" style={{ borderRadius:"5%",padding:"2%" }}>
      <AppBar position="static" color="" sx={{borderRadius:'10px'}}>
        <Toolbar>
          <Avatar src="/assets/icons/glass/ic_glass_users.png" alt="ChatBot" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '10px' }}>
            ChatBot
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} style={{ padding: '20px',borderRadius:"10px",marginTop:'10px',height:'50vh'  }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{ marginBottom: '10px', textAlign: message.sender === 'bot' ? 'left' : 'right' }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '10px',
                background: message.sender === 'bot' ? '#ECEFF1' : '#2196F3',
                color: message.sender === 'bot' ? '#000' : '#fff',
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        {/* Dummy element for scrolling */}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            if (el) el.scrollIntoView();
          }}
        />
      </Paper>
      <Grid container alignItems="center" sx={{mt:"10px"}}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            placeholder="Type your message"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage();
              }
            }}
            sx={{backgroundColor:"#ffff",borderRadius:'10px'}}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton color="primary" onClick={handleSendMessage}>
            {'>'}
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatBotComponent;
