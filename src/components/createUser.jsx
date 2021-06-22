import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControl, Link, Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormUser = (props) => {
  const classes = useStyles();
  const history = useHistory();
    const initialStateValues = {
        email: "",
        numCel: "",
        pin: "",
    };

    const saveJsonLocalStorage = (info) => {
      const serializedState = JSON.stringify(info);
      localStorage.setItem('infoUser', serializedState);
    }
      
    const [values, setValues] = useState(initialStateValues);
    const onSubmit = (data) => {
        const newData = {...data, createDate: moment(new Date()).format('L'), type: 'PQRS' }
        console.log(newData)
        props.addOrEdit(newData);
        saveJsonLocalStorage(newData);
        setValues({...initialStateValues})
        history.push('/dashboard/home')

        // props.history.push('/dashboard/home')

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const schema = yup.object().shape({
      email: yup
        .string()
        .nullable()
        .required("El correo electrónico es obligatorio")
        .email('Ingresa un email valido'),
      numCel: yup.string().required("El numero celular es obligatorio"),
      pin: yup.string().notRequired()
    });
  
    const { register, handleSubmit, control, errors, setValue } = useForm({
      resolver: yupResolver(schema),
  
      mode: "onTouched",
      reValidateMode: "onChange",
    });

  

  useEffect(() => {
     
  }, [])

    function Copyright() {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Crear Usuario
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} >
          <Grid container spacing={3} alignItems='center' justify="center">
          <Grid item xs={12} md={12} lg={12}>
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    inputRef={register}
                    label="Correo electronico"
                    name="email"
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
          <Grid item xs={12} md={12} lg={12} >
            <FormControl fullWidth>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                inputRef={register}
                label="Num Celular"
                name="numCel"
                InputLabelProps={{ shrink: true }}
                error={
                  errors.hasOwnProperty("numCel") &&
                  errors["numCel"].message
                }
                helperText={
                  errors.hasOwnProperty("numCel") &&
                  errors["numCel"].message
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              variant="outlined"
              margin="normal"
              disabled='true'
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              fullWidth
              name="pin"
              label="Pin"
              type="pin"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Crear
          </Button>
          <Grid container justify="center" alignItems="center" >
            <Grid item xs style={{display: "flex", justifyContent: "center", cursor: 'pointer'}}>
              <Link  variant="body2" onClick={() => history.push('/') }>
                Ya tienes cuenta?
              </Link>
            </Grid>
          </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
     

    )
}

export default FormUser;
