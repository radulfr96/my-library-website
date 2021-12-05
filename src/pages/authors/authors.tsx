import React, { useState, useContext, useEffect } from 'react';
import {
    Grid, Fab, makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Axios from 'axios';
import { useHistory } from 'react-router';
import { WithSnackbarProps } from 'notistack';
import { AuthorListItem } from '../../interfaces/authorListItem';
import PageHeading from '../../components/shared/PageHeading';
import AuthorsTable from '../../components/AuthorsTable';
import { AppContext } from '../../Context';

const useStyles = makeStyles({
    addAuthorButton: {
        marginTop: '10px',
        float: 'right',
    },
    navLink: {
        color: '#FFFFFF',
        textDecoration: 'none',
    },
});

interface AuthorsState {
    authors: Array<AuthorListItem>;
}

export default function AuthorsPage(props: WithSnackbarProps): JSX.Element {
    const [authorsState, setAuthorsState] = useState<AuthorsState>({
        authors: [],
    });

    const context = useContext(AppContext);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getAuthors();
    });

    const getAuthors = () => {
        Axios.get('/api/author')
            .then((response) => {
                setAuthorsState({ ...authorsState, authors: response.data.authors });
            });
    };

    const deleteAuthor = (id: number): void => {
        Axios.delete(`api/author/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    renderSuccessSnackbar('Delete successful');
                    getAuthors();
                }
            })
            .catch(() => {
                renderErrorSnackbar('Unable to delete author please contact admin');
            });
    };

    const renderErrorSnackbar = (message: string): void => {
        props.enqueueSnackbar(message, {
            variant: 'error',
        });
    };

    const renderSuccessSnackbar = (message: string): void => {
        props.enqueueSnackbar(message, {
            variant: 'success',
        });
    };

    return (
        <Grid item xs={5} container justify="center">
            <Grid item xs={12}>
                <PageHeading headingText="Authors" />
            </Grid>
            {
                context.isAdmin() && (
                    <Grid item xs={12}>
                        <AuthorsTable
                            authors={authorsState.authors}
                            deleteAuthor={deleteAuthor}
                        />
                    </Grid>
                )
            }

            <Grid item xs={12}>
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.addAuthorButton}
                    onClick={() => {
                        history.push('addauthor');
                    }}
                >
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}