import React from 'react';
import { Box } from '@mui/material';
import { ChatMsgProps } from './types';
import styles from './elo-chat.module.scss';

interface IProps {
  data: ChatMsgProps;
}

const MsgItem = ({ data }: IProps) => {
  const { outgoing, user, datetime } = data;
  return (
    <Box className={styles.msgItem} sx={{ marginLeft: outgoing ? 'auto' : undefined }}>
      <div className={styles.msgHeader}>
        <Box className={styles.msgUsername}>{user}</Box>
        <div className={styles.msgTime}>{datetime}</div>
      </div>
      <Box
        className={styles.msgContent}
        sx={{
          backgroundColor: (theme) => {
            if (theme.palette.mode === 'light') {
              return outgoing ? '#0a80ff' : '#ebebeb';
            } else {
              return outgoing ? '#0a80ff' : 'rgb(33, 39, 55)';
            }
          },
          color: outgoing ? '#fff' : undefined,
        }}>
        {data.text}
      </Box>
    </Box>
  );
};

export default MsgItem;
