import {db} from "../firebase/config";

import{
    getAuth,
    createUserWithEmailAndPassword,
    SignInWithEmailAndPassword,
    updateProfile,
    signOut
} from  'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //limpar funcoes (cleanup)
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    };

    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user,{
                displayName: data.displayName
            });

            setLoading(false);
            return user;
            
        } catch (error) {
            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter ao menos 6 caracteres!";
            }
            else if(error.message.includes("email-already")){
                systemErrorMessage = "Email já cadastrado!";
            }else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    //limpar as dependencias (mais performace)
    useEffect(() => {
        return () => setCancelled(true);
    },[]);

    return {
        auth,
        createUser,
        error,
        loading
    };
};