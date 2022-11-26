import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RequireAuth = ({Component}) => {
    const navigate = useNavigate();
    if (!localStorage.getItem("tknData")) {
        navigate('/login')
    }else{
        return <Component />
    }
}

export const UserAuth = ({Component}) => {
    const navigate = useNavigate();
    if (!localStorage.getItem("tknData")) {
        return <Component />
    }else if(localStorage.getItem("type") === '2'){
        navigate('/cliente/perfil')
    }
}