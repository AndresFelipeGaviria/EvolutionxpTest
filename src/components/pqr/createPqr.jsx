import React from "react";
import * as yup from "yup";
import moment, { useState } from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  TextField,
  Card,
  Button,
  CardContent,
  FormControl,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import * as IdKey from "short-uuid";

import { db } from "../../firebase";

export const CreatePqr = () => {
  // const [files, setFiles] = useState([]);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Este campo es requerido")
      .min(4, "Ingrese mínimo 4 caracteres")
      .max(50, "ingrese máximo 50 caracteres"),
    description: yup.string().required("Este campo es requerido"),
    // traking: yup.string().required("Este campo es requerido"),
    // pdf: yup.string().notRequired()
  });

  const { register, handleSubmit, control, errors, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const addPqr = async (linkObject) => {
    const findUser = await db.collection("clients").get();
    await db.collection("clients").doc().set(linkObject);
  };

  const onSubmit = async (data) => {
    const serializedState = JSON.parse(localStorage.getItem("infoUser"));
    const clientFb = await db
      .collection("clients")
      .where("email", "==", serializedState.email)
      .get();

    const newData = {
 
      description: data.description,
      creationDate: moment(new Date()).format("L"),
      process: [ ],
    };
    debugger
    await clientFb.set(
      { process: [{ ...newData, id:IdKey.generate()}] },
      { merge: true });
    // addPqr(newData);
  };

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
    <div>
      <Typography style={{ textAlign: "center", fontSize: 20, margin: 10 }}>
        Crear Pqr
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={12} md={6} lg={4} style={{ display: "flex" }}>
            <FormControl fullWidth shrink={true} notched={true} size="small">
              <TextField
                fullWidth
                inputRef={register}
                variant="outlined"
                placeholder="Nombre"
                label="Nombre"
                size="small"
                InputLabelProps={{ shrink: true }}
                defaultValue=""
                name="name"
                error={errors.hasOwnProperty("name") && errors["name"].message}
              />
              <FormHelperText style={{ color: "#f44336", paddingLeft: 14 }}>
                {errors.hasOwnProperty("name") && errors["name"].message}
              </FormHelperText>
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
          <Grid item xs={12} md={4} lg={4}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                inputRef={register}
                variant="outlined"
                label="Descripcion PQR"
                multiline
                defaultValue=""
                rows={4}
                rowsMax={4}
                name="description"
                error={
                  errors.hasOwnProperty("description") &&
                  errors["description"].message
                }
              />
              <FormHelperText style={{ color: "#f44336", paddingLeft: 14 }}>
                {errors.hasOwnProperty("description") &&
                  errors["description"].message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={4} style={{ margin: "30px 45%" }}>
          <Button type="submit" color="primary" variant="contained">
            CREAR
          </Button>
          &nbsp;&nbsp;
        </Grid>
      </form>
    </div>
  );
};

export default CreatePqr;
