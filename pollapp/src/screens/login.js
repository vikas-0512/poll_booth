import { HStack, VStack ,Text, Heading} from "@chakra-ui/react";
import LoginForm from "../components/forms/loginform";
const Login = () => {
    return (
        <VStack
        width={'100%'}
        height={965}
        bgColor={'blue.100'}
        >
        <VStack
        bgColor={'pink.200'}
        width={'100%'}
        heigth={'100%'}
        padding={'6'}
        mb={100}
        boxShadow={'dark-lg'}
        >
        <HStack>
            <Heading>POLL BOOTH</Heading>
        </HStack>
        </VStack>
        <VStack 
        bgColor={'pink.100'}
        pl={20}
        pr={20}
        pt={10}
        pb={10}
        borderRadius={10}
        boxShadow={'dark-lg'}
        >
           <LoginForm/>
        </VStack>
        </VStack>
    );
}
 
export default Login;