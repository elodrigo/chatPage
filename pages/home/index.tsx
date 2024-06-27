import React, {useState} from 'react';
import EloChat from '../../components/elo-chat/elo-chat';
import styles from './index.module.scss';
import { Box, SpeedDial } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const Home = () => {
    const [chatOpen, setChatOpen] = useState<boolean>(false);

    const handleChatOpen = () => {
        setChatOpen(!chatOpen);
    };

    return (
        <div className={styles.chatRoot}>
            <div className={styles.topper}></div>
            <SpeedDial
                ariaLabel="EloChat"
                onClick={handleChatOpen}
                sx={{position: 'fixed', bottom: 16, right: 16}}
                icon={<ChatIcon fontSize="large"/>}></SpeedDial>
            <Box
                id={'chatElement'}
                className={`${styles.chatRoot} ${chatOpen ? styles.chatAppear : styles.chatDisappear}`}
                sx={{visibility: chatOpen ? 'visible' : 'hidden'}}>
                <EloChat/>
            </Box>
        </div>
    )

}

export default Home
