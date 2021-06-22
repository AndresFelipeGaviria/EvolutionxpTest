import React, {useEffect} from 'react'
import LoginForm from './loginForm';
import {db} from '../firebase';

const ContainerLogin = () => {

    const addOrEditLink = async (linkObject) => {
        await db.collection('clients').doc().set(linkObject);
    }

    const getClients = async () => {
        const querySnapshot = await db.collection('clients').get();
        querySnapshot.forEach(doc => {
            console.log(doc.data())
        })
    }

    useEffect(() => {
        console.log('getting data...')
        getClients()
    }, [])
    return (
        <>
        <LoginForm addOrEdit={addOrEditLink}/>
      <div className="col-md-4 p-2">
        {/* <LinksForm {...{ addOrEditLink, currentId, links }} /> */}
      </div>
      <div className="col-md-8 p-2">
        {/* {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">Go to Website</a>
            </div>
          </div>
        ))} */}
      </div>
    </>
    )
}

export default ContainerLogin
