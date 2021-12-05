/* eslint-disable max-len */
import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../Context';
import NavMenu from './navigation/NavMenu';

const useStyles = makeStyles(({
  root: {
    padding: '20px',
  },
}));

export default function Layout(props: { children: React.ReactNode | undefined }): JSX.Element {
  const classes = useStyles();

  return (
    <AppContext.Consumer>
      {() => (
        <>
          <NavMenu />
          <Grid container className={classes.root}>
            {props.children}
          </Grid>
        </>
      )}
    </AppContext.Consumer>
  );
}