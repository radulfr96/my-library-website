/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Route } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/user/Login';
import Users from './pages/user/Users';
import Register from './pages/user/Register';
import MyAccount from './pages/user/myAccount/MyAccount';
import UserPage from './pages/user/User';
import theme from './config/theme';
import { AppContextProvider } from './Context';
import Genres from './pages/genre/Genres';
import GenrePage from './pages/genre/Genre';

export default () => (
  <AppContextProvider>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={10}>
      <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={MyAccount} />
          <Route path="/userdetails/:id" component={UserPage} />
          <Route path="/genres" component={Genres} />
          <Route path="/genre" component={GenrePage} />
      </Layout>
      </SnackbarProvider>
    </MuiThemeProvider>
  </AppContextProvider>
);
