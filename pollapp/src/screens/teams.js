import {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route,useLocation,useNavigate } from 'react-router-dom';
import Card from '../components/cards/card';
import React from 'react';
import {Get_teams} from '../fetchdata';
import AddForm from '../components/forms/addform';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Wrap,
    Button,HStack,VStack,Center,Heading
} from '@chakra-ui/react';
const Teams = () => {
    const location= useLocation();
    const navigate=useNavigate();
    var id;
    if(location.state!==null)
    id=location.state.id;
    const [teams, set_teams]=useState([]);
    const [changed, setchanged]= useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const mclose=()=>{
       setchanged(!changed);
       onClose();
    }
    const team = teams.map((item) => {
        return (
            <Card title={item.teamname} id={item.teamid} isteam={true} iscreater={id==item.creater}/>
        )
    })
    console.log("got teams",teams)
    useEffect(()=>{
        if(location.state==null)
        {
            navigate('/');
        }
        else
        {
        console.log('KKKK')
        Get_teams({set_teams,id});
        }
    },[changed])
    return (
        <VStack
          color={'black.100'}
          spacing={10}
          flex={1}
          pt={5}
        >
        <HStack marginLeft={200}spacing={100} align={'center'} justify={'center'}>
            <Center>
                <Heading>Your teams</Heading>
            </Center>
            <Button bg={'green.300'} boxShadow={'0 0 5px black'} onClick={onOpen}>create Team</Button>
        </HStack>
        <Wrap>
            {(team.length==0)?(<Heading>No teams Available to display</Heading>): team}
        </Wrap>
        <Modal
          isOpen={isOpen}
          onClose={mclose}
        >
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Add Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <AddForm onClose={mclose} id={id} desc='team'/>
            </ModalBody>
        </ModalContent>
        </Modal>
        </VStack>
    );
}
 
export default Teams;