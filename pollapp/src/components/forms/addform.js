import { FormControl,FormLabel,Input,useToast,Button,HStack } from "@chakra-ui/react";
import {Add_option,Add_poll,Add_team} from '../../fetchdata';
import {useState} from 'react';
const AddForm = ({onClose,id,desc}) => {
    const toast=useToast();
    const [isLoading,setLoading]=useState(false);
    const [optionname,setoptionname]=useState('');
    return (
       <div>
        <FormControl>
            <FormLabel>{desc} name: </FormLabel>
            <Input mb={2} placeholder={`${desc} name`} onChange={(event)=>{
                setoptionname(event.target.value)
            } } value={optionname}></Input>
        </FormControl>
        <FormControl>
            <FormLabel>Description: </FormLabel>
            <Input placeholder={'give description'} mb={5}></Input>
        </FormControl>
        <HStack spacing={100}>
            <Button colorScheme="green" onClick={async ()=>{
                if(desc=='option')
                  await Add_option({id,optionname: optionname});
                else if(desc=='poll')
                {
                  await Add_poll({id,pollname: optionname});
                }
                else
                  await Add_team({id,teamname: optionname})
                toast({
                    status: 'success',
                    title: `${desc} Added Successfully`
                })
                onClose();
            }}>
                save
            </Button>
            <Button colorScheme="red" onClick={onClose}>cancel</Button>
        </HStack>
       </div>
    );
}
 
export default AddForm;