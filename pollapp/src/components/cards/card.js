import { useNavigate } from "react-router-dom";
import {HStack, Heading, WrapItem} from '@chakra-ui/react';
const Card = ({title,id,isteam,iscreater}) => {
    const navigate=useNavigate();
    return (
        <WrapItem>
            <HStack
             bg={'blue.300'}
             color={'rgb(26, 24, 25);'}
             pl={5}
             pt={50}
             pb={50}
             pr={5}
             mr={5}
             borderRadius={10}
             spacing={2}
             _hover={{
                opacity: '75%',
                cursor: 'pointer'
             }}
             boxShadow={'lg'}
             onClick={()=>{
                if(isteam===true)
                {
                    navigate('/app/polls',{state: {id,iscreater}})
                }
                else
                {
                    navigate('/app/vote',{state: {id,title,iscreater}})
                }
             }}
            >
                <Heading>{title}</Heading>

            </HStack>
        </WrapItem>
    );
}
 
export default Card;