import {useEffect} from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';
const SignOut=()=>{
    const {doRequest} =useRequest(
        {
        url:"/api/users/signout",
        method:"post",
        body:{},
        onSuccess:()=>{ Router.push('/auth/signin')}
    });


    useEffect(()=>{

        doRequest();
    },[]);



    return <h2>Signing You Out ....</h2>;
}

export default SignOut;