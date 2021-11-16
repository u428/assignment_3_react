import React,{useState, useEffect} from 'react'
import {getAllUsers} from '../api/ApiHelper';

export default function Users() {

     const [users, setUsers]=useState([]);
    const [updates, setUpdates] = useState(0);

    // useEffect(()=>{
    //     getAllUsers().then(res=>{
    //         console.log(res.data);
    //         setUsers(res.data);
    //     })
    // }, [updates])


    return (
        <div>
            Hello from Users
        </div>
    )
}
