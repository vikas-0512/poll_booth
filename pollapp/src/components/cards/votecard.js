import { WrapItem , HStack, Heading, Button} from "@chakra-ui/react";

const VoteCard = ({title, id, selectedoption, set_selected,votes}) => {
    return (  
        <WrapItem>
            <HStack
            bg={(selectedoption==id)?'green.200':'blue.200'}
            color={'white'}
            p={5}
            width={400}
            spacing={50}
            onClick={() => {set_selected(id)}}
            _hover={{
                cursor: 'pointer'
            }}
            align='center'
            justify='space-between'
            borderRadius={5}
            >
            <Heading pr={30}>{title}</Heading>
            <Button alignSelf={'right'} color={'black'} bg={'yellow.100'} borderRadius={'10'}>
                {votes}
            </Button>
            </HStack>
        </WrapItem>
    );
}
 
export default VoteCard;