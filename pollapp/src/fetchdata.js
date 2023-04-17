import {API_URL} from './url';
export const Get_teams = async ({set_teams,id}) => {
    var teams=[];
    fetch(`${API_URL}/teams/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(async res=>{
        try {
        const jsonRes = await res.json();
            if (res.status === 200){
                teams=(jsonRes)
                await set_teams(teams);
                return teams;
            }
        }catch (err) {
            console.log(err);
            return {};
        }
    })
    .catch(err=>{
        console.log('Error',err);
        return {};
    })
}
export const Add_option=async({id,optionname})=>{
   fetch(`${API_URL}/polls/addoption/${id}`,{
      method: 'POST',
      body: JSON.stringify({
        optionname,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(async res=>{
    console.log('AddedOption Successfully')
    return res.json()
   })
   .catch(err=>{console.log('error in option adding',err)});
}
export const Add_poll= async({id,pollname})=>{
    fetch(`${API_URL}/polls/addpoll/${id}`,{
        method: 'POST',
        body: JSON.stringify({
            pollname,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(async res =>{
        return res.json();
    })
    .catch(err=>{
        console.log('Error in adding poll')
    })
}
export const Add_team= async({id,teamname})=>{
    fetch(`${API_URL}/teams/add`, {
        method: 'POST',
        body: JSON.stringify({
            teamname,
            userid: id,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
    .then(async (res)=>{
            console.log('Added team successfully');
            return res.json();
    })
    .catch(error=>{
        console.log('error in adding team');
    })
}
export const Get_polls=async({set_polls,id})=>{
    var polls=[];
    fetch(`${API_URL}/polls/all/${id}`,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(async res=>{
        try
        {
            console.log(res);
            const jsonRes = await res.json();
            console.log(jsonRes);
            if (res.status === 200){
                polls=(jsonRes)
                await set_polls(polls);
                return polls;
            }
        }
        catch(err){
            console.log('error occured in json Get_polls fetch',err)
            return {};
        }
    })
    .catch (err=>{
        console.log('error in fetch Get_polls call')
        return {};
    })
}

export const Add_member=async({email,setchanged,id})=>{
    fetch(`${API_URL}/members/addemail`,{
        method: 'POST',
        body: JSON.stringify({
            email,
            teamid: parseInt(id)
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(async (res)=>{
        const jsonRes=res.json().then((data)=>{
            setchanged(data);
        })
    })
    .catch(err=>{
        console.log('error in adding email',err)
    })
}
export const Get_members = async ({id,setmembers})=>{
    var members={};
    fetch(`${API_URL}/members/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(async res=>{
        try{
            const jsonRes = await res.json();
            if(res.status === 200)
            {
                members=(jsonRes)
                await setmembers(members);
                return members;
            }
        }
        catch(err){
            console.log(err);
            return {}
        }
    })
    .catch(err=>{
        console.log('Error',err);
        return {};
    })
}
export const Get_email=async({setemail,userid}) =>
{
    var email={};
    fetch(`${API_URL}/users/getemail/${userid}`,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(async res=>{
        try{
            console.log('in fetch api')
            const jsonRes= await res.json();
            console.log(jsonRes);
            if(res.status === 200)
            {
                email=(jsonRes)
                await setemail(email);
                return email;
            }
        }
        catch(err){
            console.log(err)
            return {};
        }
    })
    .catch(err=>{
        console.log('error in getting email');
        return {};
    })
}
export const Get_options=async ({set_options,id})=>{
    console.log("oeey")
    var options={}
    fetch(`${API_URL}/polls/getpolldetails/${id}`,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(async res=>{
        try{
        const jsonRes=await res.json();
        console.log('in fetch call',jsonRes)
        if(res.status === 200)
        {
            options=(jsonRes)
            set_options(options);
            return options;
        }
        }
        catch(err){
            console.log('hello')
            console.log(err)
            return {};
        }
    })
    .catch(err=>{
        console.log('ERROR in fectch',err)
        return err;
    })
}

export const Cast_Vote=async({id,setchanged})=>{
    console.log(id);
    fetch(`${API_URL}/polls/vote/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
            id,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(async (res) =>{
        const jsonRes= await res.json();
    })
    .then(async (data)=>{
        console.log('voted again')
        await setchanged(data);
        return data;
    })
    .catch(err=>{
        console.log('error',err);
    })
}
export const Delete_member=async ({userid,id})=>{
    console.log('hey.................')
    fetch(`${API_URL}/polls/delmem`,{
        method: 'DELETE',
        body: JSON.stringify({
            userid,
            teamid: id,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(async (res)=>{
        const jsonRes=await res.json();
        console.log('member deleted successfully');
        return jsonRes;
    })
    .catch((err)=>{
        console.log('error in deleting member',err);
    })
    
}
export const Sign_up=async ({name,email,password,setdetails})=>{
    console.log('Arey.....',name,email,password,typeof setdetails);
     fetch(`${API_URL}/users/signup`,{
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password
        }),
        headers: {
            'content-type': 'application/json'
        }
     })
     .then(async (res)=>{
        const jsonRes=await res.json()
        console.log('hello',jsonRes);
        setdetails(jsonRes);
    })
    .catch(err=>{
        console.log('error in adding email',err)
    })
}
export const UserLogin=async ({username,password,setdetails})=>{
    var details={};
    fetch(`${API_URL}/users/login`,{
        method: 'POST',
        body: JSON.stringify({
            email: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (res)=>{
        const jsonRes=await res.json();
        console.log(jsonRes);
        details=(jsonRes);
        setdetails(jsonRes);
        return details;
    })
    .catch(err=>{
        console.log('login cred..',err);
        return [];
    })
}