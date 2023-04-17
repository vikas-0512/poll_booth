import { HStack, IconButton,Text} from "@chakra-ui/react";
import {DeleteIcon} from '@chakra-ui/icons'
import { Get_email } from "../../fetchdata";
import { useState ,useEffect} from "react";
const MemberCard = ({key,userid,del}) => {
  console.log("In mrmbr ",userid);
    const [email,setemail]=useState([])
    const [changed,setchanged]=useState(false)
    useEffect(()=>{
      Get_email({setemail,userid});
    },[changed])
    return (
        <HStack
          width={'100%'}
          bg={'orange.100'}
          color={'black.100'}
          p={5}
          align='center'
          justify='space-between'
        >
        <Text >{email.length!=0?email[0].email:'loading...'}</Text>
        <IconButton  size={'xs'} icon={<DeleteIcon/>} onClick={()=>{del(userid)}}/>
        </HStack>
    );
}
 
export default MemberCard;