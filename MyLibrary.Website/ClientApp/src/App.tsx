/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/user/Login';
import Users from './pages/user/Users';
import Register from './pages/user/Register';
import MyAccount from './pages/user/myAccount/MyAccount';
import MyDetails from './pages/user/myAccount/MyDetails';
import theme from './config/theme';
import { AppContextProvider } from './Context';

export default () => (
  <AppContextProvider>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}>
      <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={MyAccount} />
      </Layout>
      </SnackbarProvider>
    </MuiThemeProvider>
  </AppContextProvider>
);
