// import React, { useState } from "react";
// import SecureRoute from "../seguridad/secure-route";
// import { Switch, useRouteMatch, Route } from "react-router-dom";
// import { useStateValue } from "../../context/store";
// import { makeStyles, CssBaseline, Grid } from "@material-ui/core";

// import Header from "../header/Header";
// import SubHeader from "../header/subHeader";
// import LeftMenu from "../LeftMenu/LeftMenu";
// import MainContent from "../MainContent/MainContent";
// import Footer from "../footer/Footer";

// const useStyles = makeStyles(() => ({
//   root: {
//     display: "flex",
//     height: "100%",
//   },
//   content: {
//     flex: "1 1 auto",
//     margin: "3%",
//   },
// }));

// const MainDashboard = (props) => {
//   const classes = useStyles();
//   const [{ breadCrumb }, dispatch] = useStateValue();
//   const [isOpen, setOpen] = useState(true);
//   const [stateHome, setStateHome] = useState("");
//   const [state, setState] = React.useState({
//     left: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
  
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const handleDrawerClose = () => setOpen(false);
//   const contenValueHome = (x) => setStateHome(x);

//   const { path } = useRouteMatch();

//   return (
//     <Grid className={classes.root}>
//       <CssBaseline />
//       <Header
//         toggleDrawer={toggleDrawer}
//         isOpen={isOpen}
//         contenValueHome={contenValueHome}
//       />
//       {breadCrumb?.breadCrumbText === "Inicio" || null ? null : <SubHeader />}
//       <LeftMenu
//         handleDrawerClose={handleDrawerClose}
//         toggleDrawer={toggleDrawer}
//         isOpen={state}
//         stateHome={stateHome}
//       />
//       <MainContent>
//         <Grid id="pageContainer" className={classes.content}>
//         <Switch>
        
//         <Route
//           exact
//           path={`${path}/dashboard/home`}
//           component={HomePage}
//         />
//         <Route
//           exact
//           path={`${path}/dashboard/radicados`}
//           component={Radicados}
//         />
//         <Route
//           exact
//           path={`${path}/dashboard/pqrs`}
//           component={Pqr}
//         />
//         <Route
//           exact
//           path={`${path}/dashboard/createPqr`}
//           component={CreatePqr}
//         />
//       </Switch>
//         </Grid>
//         <Footer />
//       </MainContent>
//     </Grid>
//   );
// };

// export default MainDashboard;
