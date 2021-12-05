import React, { useState } from 'react';
import {
    Paper, Tabs, Tab, AppBar, Typography, Box, makeStyles,
} from '@material-ui/core';
import MyDetails from './MyDetails';
import ChangeUsername from './ChangeUsername';
import UpdatePassword from './UpdatePassword';

interface TabPanelProps {
    children: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps): JSX.Element {
    const {
        children, value, index,
    } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

interface MyAccountState {
    tab: number;
}

const useStyles = makeStyles({
    paper: {
        width: '1000px',
    },
    formButton: {
        marginBottom: '10px',
        marginRight: '10px',
        float: 'right',
    },
});

export default function MyAccount(): JSX.Element {
    const [myAccountState] = useState<MyAccountState>({
        tab: 1,
    });

    const classes = useStyles();

    // const handleTabChange = (event: React.ChangeEvent, newValue: number) => {
    //     setMyAccountState({ ...myAccountState, tab: newValue });
    // };

    return (
        <Paper className={classes.paper}>
                <AppBar position="static">
                    <Tabs
                        value={myAccountState.tab}
                    >
                        <Tab label="My Details" />
                        <Tab label="Change Username" />
                        <Tab label="Change Password" />
                    </Tabs>
                </AppBar>
                <TabPanel value={myAccountState.tab} index={0}>
                    <MyDetails />
                </TabPanel>
                <TabPanel value={myAccountState.tab} index={1}>
                    <ChangeUsername />
                </TabPanel>
                <TabPanel value={myAccountState.tab} index={2}>
                    <UpdatePassword />
                </TabPanel>
        </Paper>
    );
}