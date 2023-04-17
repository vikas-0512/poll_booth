import { useEffect,useState } from 'react';
import { BrowserRouter,Routes,Route,useLocation,useNavigate } from 'react-router-dom';
import { VStack ,Text, HStack, Button} from '@chakra-ui/react';
import {ArrowBackIcon,ArrowForwardIcon,RepeatClockIcon} from '@chakra-ui/icons';
import Teams from './screens/teams';
import Polls from './screens/polls';
import Vote from './screens/vote';
import './App.css';

function App() {
  const location= useLocation();
  const navigate=useNavigate()
  const [name,setname]=useState('Vikas');
  console.log(location.state,'...............');
  useEffect(()=>{
    console.log('hello....')
    if(location.state==null)
       navigate('/')
    else{
      if(location.state.name)
    setname(location.state.name)
  }
  },[])
  return (
    <div style={{marginLeft: '0',width: '100vw', height: '100vh'}}>
      <VStack
      w={'100%'}
      h={'100%'}
      p={50}
      bg={'blue.200'}
      >
      <div className='header'>
        <Text fontFamily={'serif'} fontWeight={'semibold'} fontSize={'30px'}>Hello, {name}</Text>
      </div>
      <div className='appContainer'>
        <HStack p={1} ml={0} bg={'black.100'} bgColor={'pink.300'} mb={5}>
          <ArrowBackIcon boxSize={6} bg={'red'} onClick={()=>{window.history.back()}}></ArrowBackIcon>
          <RepeatClockIcon boxSize={6} bg={'yellow'} onClick={()=>{window.location.reload()}}></RepeatClockIcon>
          <ArrowForwardIcon boxSize={6} bg={'green'} onClick={()=>{window.history.forward()}}></ArrowForwardIcon>
        </HStack>
        <Routes>
          <Route path='/' element={<Teams/>} />
          <Route path='/teams' element={<Teams/>}/>
          <Route path='/polls' element={<Polls/>} />
          <Route path='/vote' element={<Vote/>} />
        </Routes>
      </div>
      </VStack>
    </div>
  );
}

export default App;
