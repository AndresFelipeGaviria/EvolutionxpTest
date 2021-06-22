import React, {useState, useEffect} from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import Dashboard from './home';
import Radicado from './radicado';
import {db} from '../firebase';


export const Pqr = () => {
  const [radicados, setRadicados] = useState([]);

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
    getClients();
    }, [])

    console.log(radicados)
   
    return (
        <div>
            <Dashboard >
                {/* <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Card variant="outlined">
                            <CardContent>
                                {radicados?.map((r) => (
                                    <div key={r.id}>
                                    <Typography  color="textSecondary" gutterBottom style={{fontSize: 'inherit'}}>
                                        {r.createDate} {r.type} -  {r.email}
                                    </Typography>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Radicado />
                    </Grid>
                </Grid>  */}
            </Dashboard>
        </div>
       
    )
}

export default Pqr;
