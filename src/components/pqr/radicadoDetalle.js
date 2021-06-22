import React, {useState, useEffect} from 'react'
import * as yup from "yup";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, TextField, Card, Button, CardContent, FormControl, FormHelperText, Typography} from "@material-ui/core";
import Dashboard from '../home';
import {db} from '../../firebase';



export const UpdatePqr = () => {

  const [radicados, setRadicados] = useState([]);

    const schema = yup.object().shape({
        traking: yup
        .string()
        .required('Este campo es requerido'),
        email: yup
        .string()
        .nullable()
        .required("El correo electrónico es obligatorio")
        .email('Ingresa un email valido'),
        name: yup
        .string()
        .required('Este campo es requerido'),
        // pdf: yup.string().notRequired()
    });
    
      const { register, handleSubmit, control,  errors, setValue } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        reValidateMode: "onChange",
      });

      const getUser = async (email) => {
          db.collection('clients').onSnapshot((querySnapshot)  => {
            const newRadicados = [];
            const RadicadoUser = [];
           querySnapshot.forEach(doc => {
             newRadicados.push({...doc.data(), id:doc.id})
         })
         let result1=  newRadicados.find((c) => c.email === email)
         RadicadoUser.push(result1)
         console.log(result1)
         setRadicados(RadicadoUser)
         
         })
       
     }

     console.log(radicados)
      const onSubmit = (data) => {
        const serializedState = JSON.parse(localStorage.getItem("infoUser"))
        console.log(serializedState)
        getUser(serializedState.email)
        const newData = { 
            email:serializedState.email, 
            numCel: serializedState.numCel, 
            description:  data.description,
            creationDate: moment(new Date()).format('L'), 
            process:[{
                traking: data.traking
            }]
        }
      }

      useEffect(() => {
        const serializedState = JSON.parse(localStorage.getItem("infoUser"))
        console.log(serializedState)
        getUser(serializedState.email)
      },[])

    //  const handleCapture = ({ target }) => {
    //     const fileReader = new FileReader();
    //     const name = target.accept.includes('image') ? 'images' : 'videos';

    //     fileReader.readAsDataURL(target.files[0]);
    //     fileReader.onload = (e) => {
    //         setFiles((prevState) => ({
    //             [name]: [...prevState[name], e.target.result]
    //         }));
    //     };
    // };

    // console.log(files);

    return (
        <Dashboard>
            <Typography style ={{ textAlign: 'center', fontSize: 20, margin: 10}}>Agregar Proceso</Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection:'row'}}>
            <Grid container spacing={3}  direction='row'>
            <Grid item xs={12} md={6} lg={4} style={{display: 'flex'}}>
              <FormControl fullWidth shrink={true}  notched={true} size="small">
              <TextField
                fullWidth
                inputRef={register}
                variant="outlined"
                placeholder = 'Nombre'
                label = "Nombre"
                size = "small"
                InputLabelProps = {{ shrink: true}}
                defaultValue=''
                name="name"
                error={errors.hasOwnProperty('name') && errors['name'].message}                              
              />
                <FormHelperText style={{ color: "#f44336", paddingLeft: 14 }}>
                  {errors.hasOwnProperty('name') && errors['name'].message}
                </FormHelperText>
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  inputRef={register}
                  placeholder='ejemplo@hotmail.com'
                  label="Correo electronico"
                  name="email"
                  size = "small"
                  InputLabelProps={{ shrink: true }}
                  error={
                    !!errors.hasOwnProperty("email") &&
                    errors["email"].message
                  }
                  helperText={
                    errors.hasOwnProperty("email") &&
                    errors["email"].message
                  }
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} md={6} lg={5} style={{display: 'flex'}}>
              <FormControl fullWidth shrink={true}  notched={true} size="small">
              <TextField 
                // className={classes.margin}
                type="file"
                error={touched.file && Boolean(errors.file)}
                helperText={touched.file ? errors.file : ''}
                onChange={onSelectFile}
                // InputProps={{className: classes.fileUpload}}
                inputProps={{id: "file"}}
                />
                <FormHelperText style={{ color: "#f44336", paddingLeft: 14 }}>
                  {errors.hasOwnProperty('pdf') && errors['pdf'].message}
                </FormHelperText>
              </FormControl>
              </Grid> */}
                <Grid item xs={12} md={4} lg={8}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        inputRef={register}
                        variant="outlined"
                        label="Seguimiento"
                        multiline
                        defaultValue=''
                        InputLabelProps = {{ shrink: true}}
                        placeholder="Proceso en el que se encuentra"
                        rows={4}
                        rowsMax={4}
                        name="traking"
                        error={errors.hasOwnProperty('traking') && errors['traking'].message}                               
                    />
                    <FormHelperText style={{ color: "#f44336", paddingLeft: 14 }}>
                        {errors.hasOwnProperty("traking") &&
                        errors["traking"].message}
                    </FormHelperText>
                </FormControl>
                </Grid>
              
               <Grid item xs={12} md={4} lg={4}>
               <Typography>Tabla de procesos</Typography>

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
              
               <Grid item xs={12} sm={12} lg={4}>
              <Button  type="submit" color='primary' >AGREGAR</Button>&nbsp;&nbsp;
            </Grid>
            </Grid>
          </form>
        </Dashboard>
    )
}

export default UpdatePqr;
