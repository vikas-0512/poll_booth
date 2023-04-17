import { Button, FormControl , FormLabel, HStack, Input, useToast} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sign_up } from "../../fetchdata";
const Signup = ({onClose}) => {
    const [name,set_name]=useState('');
    const [email,set_email]=useState('');
    const [password,set_password]=useState('');
    const [details,setdetails]=useState('');
    const toast=useToast();
    useEffect(()=>{
       if(details.length!==0)
       {
          toast(
            {
                status: 'success',
                title: 'signed up successfully'
            }
          )
       }
    },[details])
    return (  
        <div>
            <FormControl>
                <FormLabel color={'orange.400'} fontWeight={'bold'} >name</FormLabel>
                <Input bgColor={'white'} onChange={(e)=>{set_name(e.target.value)}} mb={3} mt={0} value={name}></Input>
            </FormControl>
            <FormControl>
                <FormLabel color={'orange.400'} fontWeight={'bold'} >email</FormLabel>
                <Input bgColor={'white'} onChange={(e)=>{set_email(e.target.value)}} mb={3} mt={0} value={email}></Input>
            </FormControl>
            <FormControl>
                <FormLabel color={'orange.400'} fontWeight={'bold'} >password</FormLabel>
                <Input bgColor={'white'} type={'password'} mb={5} onChange={(e)=>{set_password(e.target.value)}} value={password}></Input>
            </FormControl>
            <HStack>
                <Button bgColor={'orange.300'} 
                onClick={async()=>{
                  await Sign_up({name,email,password,setdetails})
                }
                }>Signup</Button>
            </HStack>
        </div>
    );
}
 
export default Signup;