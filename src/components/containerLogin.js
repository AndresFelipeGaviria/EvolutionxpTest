import React, {useEffect, useState} from 'react'
import LoginForm from './loginForm';
import {db} from '../firebase';

const ContainerLogin = () => {

  
  const [radicados, setRadicados] = useState([]);

    const addOrEditLink = async (linkObject) => {
        await db.collection('clients').doc().set(linkObject);
    }

    const getClients = () => {
         db.collection('clients').onSnapshot((querySnapshot)  => {
           const newRadicados = [];
          querySnapshot.forEach(doc => {
            newRadicados.push({...doc.data(), id:doc.id})
        })
        setRadicados(newRadicados)
        })
      
    }

    useEffect(() => {
        getClients()
    }, []);

    return (
      <>
        <LoginForm addOrEdit={addOrEditLink}/>
      </>
    )
}

export default ContainerLogin
