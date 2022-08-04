import React from 'react';
import {Container, Text, Box} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';

const HomePage = () => {
    return (
        <Container maxW="xl" centerContent>
            <Box
             d="flex"
             justifyContent="center"
             p={3}
             bg={"white"}
             w="100%"
             m="40px 0 15px 0"
             borderRadius="lg"
             borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work sans" color="black" textAlign="center">
                    Bee Chat
                </Text>
            </Box>
            <Box  
             p={4}
             bg={"white"}
             w="100%"
             borderRadius="lg"
             borderWidth="1px"
             color="black"
             >
                <Tabs variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Signup</Tab>
                    </TabList>
                    <TabPanels textAlign={"left"}>
                        <TabPanel>
                        <Login />
                        </TabPanel>
                        <TabPanel>
                        <Signup/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
             </Box>
        </Container>
    )
}

export default HomePage;