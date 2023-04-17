import { VStack ,HStack , Heading, Center,Button
,useDisclosure,Wrap, ModalOverlay, Modal,ModalContent, ModalHeader, ModalBody, ModalCloseButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter} from '@chakra-ui/react';
import '../App.css'
import Card from '../components/cards/card';
import { Get_polls} from '../fetchdata';
import { useEffect,useState } from 'react';
import { BrowserRouter,Routes,Route,useLocation,useNavigate } from 'react-router-dom';
import AddForm from '../components/forms/addform';
import Drawerform from '../components/forms/drawerform';
const Polls = () => {
    const {isOpen,onOpen,onClose}= useDisclosure();
    const [changed,setchanged]=useState(false);
    const [polls,set_polls]=useState([]);
    const [drawerOpen, setOpen] = useState(false);
    let id,iscreater;
    const navigate=useNavigate();
    const location=useLocation();
    if(location.state!==null)
    {
        id=location.state.id;
        iscreater=location.state.iscreater;
    }
    const mclose=()=>{
        setchanged(!changed);
        onClose();
    }
    const poll=polls.map((item)=>{
        return (
        <Card title={item.pollname} id={item.pollid} isteam={false} iscreater={iscreater}/>
        );
    })
    console.log("got polls",polls,typeof polls)
    useEffect(()=>{
        if(location.state==null)
        {
            navigate('/')
        }
        else
        Get_polls({set_polls,id: parseInt(location.state.id)})
    },[changed])
    return (
        <VStack>
            <HStack spacing={50} pl={100} pb={50}>
                <Center>
                   <Heading>Your Polls</Heading>
                </Center>
                <Button
                bg={'green.300'} boxShadow={'0 0 5px black'} visibility={iscreater?'visible':'hidden'} onClick={onOpen}
                >create Poll</Button>
                <Button
                bg={'green.300'} boxShadow={'0 0 5px black'} visibility={iscreater?'visible':'hidden'} onClick={()=>{setOpen(true)}}
                >Add members</Button>
            </HStack>
            <Wrap>
                {(poll.length===0)?<Heading>No polls to display</Heading>: poll}
            </Wrap>
            <Modal
               isOpen={isOpen}
               onClose={mclose}
            >
              <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Add Poll</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <AddForm onClose={mclose} id={id} desc='poll'/>
                    </ModalBody>
                </ModalContent>
              </ModalOverlay>
            </Modal>
            <Drawer
              isOpen={drawerOpen}
              placement='right'
              onClose={()=>setOpen(false)}
              size={'sm'}
            >
            <DrawerOverlay>
                <DrawerContent bg={'yellow.100'} color={'black.100'}>
                <DrawerCloseButton/>
                <DrawerHeader>Add Members</DrawerHeader>
                <DrawerBody>
                    <Drawerform id={id}/>
                </DrawerBody>
                <DrawerFooter>
                    <HStack>
                        <Button bg={'blue.200'}onClick={()=>setOpen(false)} mr={40}>save</Button>
                        <Button bg={'red.200'} onClick={()=>setOpen(false)}>cancel</Button>
                    </HStack>
                </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
            </Drawer>
        </VStack>
    );
}
 
export default Polls;