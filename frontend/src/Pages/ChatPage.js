import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {ChatState} from '../Context/ChatProvider';
import SideDrawer from '../Components/miscellaneous/SideDrawer';
import MyChats from '../Components/MyChats';
import ChatBox from '../Components/ChatBox';

const ChatPage = () => {
    const {user} = ChatState();
    return <div style={{width: "100%"}}>
        {user && <SideDrawer/>}
        <Box>
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </Box>
    </div>
}

export default ChatPage;