import { HStack, VStack ,Button, Center, Heading,useDisclosure, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalContent,useToast} from "@chakra-ui/react";
import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route, useLocation,useNavigate } from "react-router-dom";
import { Get_options } from "../fetchdata";
import VoteCard from "../components/cards/votecard";
import { Cast_Vote } from "../fetchdata";
import AddForm from "../components/forms/addform";
const Vote = () => {
    const {isOpen,onOpen,onClose}= useDisclosure();
    const [options,set_options]=useState([])
    const [changed,setchanged]= useState(false);
    const [selectedid,set_selected]=useState(0);
    const toast = useToast();
    const location=useLocation();
    const mclose=()=>{
        setchanged(!changed);
        onClose();
    }
    let id,iscreater;
    if(location.state!==null){
        id=location.state.id;
        iscreater=location.state.iscreater;
    }
    useEffect(()=>{
        console.log('rendering.....')
        Get_options({set_options,id})
    },[changed])
    const temp=options.map((item)=>{
        return(
        <VoteCard title={item.optionname} id={item.optionid} selectedoption={selectedid} set_selected={set_selected} votes={item.votes}/>
        );
    })
    return ( 
        <VStack
        width={'100%'}
        height={'100%'}
        spacing={10}
        >
        <HStack spacing={10}>
           <Center>
              <Heading>Your Options</Heading>
           </Center>
           <Button
           bg={'green.300'} boxShadow={'0 0 5px black'} visibility={iscreater?'visible':'hidden'} onClick={onOpen}
           >Add Option</Button>
        </HStack>
        <VStack>
            {(temp.length==0)?"No options to display": temp}
        </VStack>
        <HStack
          align={'center'}
          justify={'space-between'}
        >
            <Button
             bg={'green.300'}
             p={5}
             isDisabled={selectedid==0}
             onClick={async ()=>{
                if(changed===false)
                {
                    console.log('hiiii........')
                    await Cast_Vote({id: selectedid,setchanged})
                    toast({
                        status: 'success',
                        title: 'Voted successfully',
                        duration: 3000
                    })
                }
             }}
            >
                Vote
            </Button>
            <Button
             bg={'red.300'}
             p={5}
             isDisabled={selectedid===0}
             onClick={()=>set_selected(0)}
            >
                Reset Selection
            </Button>
        </HStack>
        <Modal
          isOpen={isOpen}
          onClose={mclose}
        >
        <ModalOverlay>
        <ModalContent>
            <ModalHeader>
             Add option
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <AddForm onClose={mclose} desc='option' id={id}/>
            </ModalBody>
        </ModalContent>
        </ModalOverlay>
        </Modal>
        </VStack>
     );
}
 
export default Vote;