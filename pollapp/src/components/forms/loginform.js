import { FormControl, Input, HStack,VStack,Button, Heading, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,FormLabel,Text, useToast} from "@chakra-ui/react";
import Signup from '../forms/signup'
import { useEffect, useState } from "react";
import Login from "../../screens/login";
import { useNavigate } from "react-router-dom";
import {UserLogin} from '../../fetchdata';

const LoginForm = () => {
    const [username,set_username]= useState('');
    const [password,set_password]= useState('');
    const {isOpen,onOpen,onClose}= useDisclosure();
    const [changed,setchanged]=useState(false)
    const [isloading,setloading]=useState(false);
    const [details,setdetails]=useState('');
    const navigate=useNavigate();
    const toast=useToast();
    const mclose=()=>{
        setchanged(!changed);
        onClose();
    }
    useEffect(()=>{
      if(details.length!==0)
      {
        toast({
            status: 'success',
            title: 'welcome user'
        })
        navigate('/app/teams',{
            state: {
                id: parseInt(details[0]['id']),
                name: details[0]['name']
            }
        })
      }
      else if(isloading===true)
      {
        toast({
            status: 'error',
          title: 'invalid credentials'
        })
      }
    },[details])
    return (
        <div>
            <Center>
            <Heading borderBottomColor={'black'} fontSize={35} mb={5}>Login</Heading>
            </Center>
            <FormControl>
                <FormLabel color={'black.400'} fontWeight={'bold'} >Username</FormLabel>
                <Input borderColor={'black'} mb={10} placeholder={'username'} onChange={(e)=>{set_username(e.target.value)}} value={username}></Input>
            </FormControl>
            <FormControl>
                <FormLabel color={'black.400'} fontWeight={'bold'} >Password</FormLabel>
                <Input type={'password'}  borderColor={'black'} mb={10} placeholder={'password'} onChange={(e)=>{set_password(e.target.value)}} value={password}></Input>
            </FormControl>
            <HStack spacing={100}>
                <Button bgColor={'green.300'} onClick={async ()=>{
                    console.log('hello')
                    setloading(true)
                    await UserLogin({username,password,setdetails})}}>login</Button>
                <Button bgColor={'green.300'} onClick={()=>{onOpen()}}>signup</Button>
            </HStack>
            <Modal
               isOpen={isOpen}
               onClose={mclose}
            >
                <ModalOverlay>
                    <ModalContent bgColor={'yellow.100'}>
                        <ModalHeader>sign up</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Signup onClose={mclose}></Signup>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </div>
    );
}
 
export default LoginForm;