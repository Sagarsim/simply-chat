import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { IconButton, Button } from '@chakra-ui/button';
import { ViewIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
const ProfileModal = ({user,  children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return <>
        {children ? (
            <span onClick={onOpen}>{children}</span>
        ) : (
            <IconButton display={{base: "flex"}} icon={<ViewIcon/>} onClick={onOpen} />
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            sdafsdfsdf
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
}

export default ProfileModal;