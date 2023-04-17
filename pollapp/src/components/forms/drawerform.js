import { Button, Divider, FormControl, FormLabel, HStack, Input, VStack, useSafeLayoutEffect } from "@chakra-ui/react";
import { useState ,useEffect} from "react";
import { Add_member,Get_members, Delete_member} from "../../fetchdata";
import MemberCard from '../cards/membercard'
const Drawerform = ({id}) => {
    const [email,setemail]=useState('');
    const [members,setmembers]=useState([]);
    const [changed,setchanged]=useState('false');
    const del = async (userid)=>{
        console.log('ok.............',userid,id);
        await Delete_member({userid,id});
        setchanged(!changed);
    }
    useEffect(()=>{
        Get_members({setmembers,id});
    },[changed])
    const mem=members.map((item)=>{
        return(
        <MemberCard key={item.userid} userid={item.userid} del={del}/>
        );
    })
    console.log('members of team',members);
    return (
        <div>
            <FormControl>
                <FormLabel>User Email</FormLabel>
                <Input onChange={(event)=>setemail(event.target.value)} bg={'white'} value={email}/>
            </FormControl>
            <HStack
            p={1}
            pt={3}>
            <Button bg={'green.400'}color={'red.100'} onClick={async()=>{
                await Add_member({email,setchanged,id})
            }
            }>
                Add
            </Button>
            </HStack>
            <Divider width={'100%'} pt={5} borderColor={'red.300'}/>
            <VStack pt={5}>
                {mem}
            </VStack>
        </div>
    );
}
 
export default Drawerform;