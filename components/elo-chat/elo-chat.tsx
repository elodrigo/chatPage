import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import styles from './elo-chat.module.scss';
import MsgItem from './msg-item';
import { ChatMsgProps } from './types';
import axios from 'axios';

const EloChat = () => {
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState<ChatMsgProps[]>([]);
  const [chatData, setChatData] = useState<any>([]);

  useEffect(() => {
    if (chatData?.data) {
      const list: ChatMsgProps[] = [];
      const now = new Date();

      if (chatData.data.length > 0) {
        for (const msg of chatData.data) {
          const incoming = {
            user: 'ChatBot',
            text: msg.generated_text,
            datetime: now.toLocaleTimeString(),
            outgoing: false,
          };
          list.push(incoming);
        }
      }
      setMsg('');
      setMsgList(list.concat(msgList));
    }
  }, [chatData]);

  const handleInputChange = (e: any) => {
    setMsg(e.target.value);
  };

  const handleSend = () => {
    handleChat(msg).then();
  };

  const handleInputKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleChat = async (msg: string) => {
    if (msg !== '') {
      const now = new Date();
      const outgoing = {
        user: 'Me',
        text: msg,
        datetime: now.toLocaleTimeString(),
        outgoing: true,
      };
      setMsgList([...msgList, outgoing]);
      await axios.post('/api/chat-message', msg).then((res) => {
        setChatData(res.data);
      })
    }
  };

  return (
    <Paper className={styles.chatPaper}>
      <Box className={styles.chatBody}>
        <div className={styles.chatHeader}>
          <Typography>Chat</Typography>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select labelId="language-select-standard-label" id="language-select-standard" value="en">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ko" disabled>
                한국어
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {msgList.map((item, index) => (
          <MsgItem key={index} data={item} />
        ))}
      </Box>
      <Paper className={styles.inputContainer}>
        <InputBase fullWidth onChange={handleInputChange} value={msg} onKeyDown={handleInputKeyDown} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Paper>
  );
};

export default EloChat;
