import React from 'react';
// import './App.css';
import { Buyer } from './Buyer';
import { Seller } from './Seller';
import { Admin } from './Admin';
import { Paper, Tabs, Tab, Box, Typography, AppBar, Container } from '@material-ui/core';
import { UserData } from '../Interfaces';

type SessionData = {
    // sessionToken: string | null,
    role: string,
    value: number
}

type propsData = {
    updateUser: (user: UserData) => void,
    setUserRole: (role: string) => void,
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export class Auth extends React.Component<propsData, SessionData> {
    constructor(props: propsData) {
        super(props)

        // if (localStorage.getItem('token')) {
        //     // console.log("Will Mount inside IF");
        //     this.setState({
        //         sessionToken: localStorage.getItem('token')
        //     })
        // }
        this.state = {
            // sessionToken: localStorage.getItem('token')? localStorage.getItem('token'): "",
            role: "buyer",
            value: 0
        }
    }

    componentWillMount() {
        console.log("Will Mount");

    }

    componentWillReceiveProps() {
        console.log("Will Recieve props");
    }

    componentDidUpdate() {
        console.log("Did Update");
    }

    componentWillUpdate() {
        console.log("Will Update");
    }

    componentWillUnmount() {
        console.log("Will UnMount")
    }

    // updateUser = (user: UserData) => {
    //     localStorage.setItem('token', user.sessionToken);
    //     this.props.setUserRole(user.user.role);
    //     // console.log("user", user.user.role)
    //     this.setState({
    //         sessionToken: user.sessionToken
    //     })
    //     // console.log(sessionToken);
    // }

    // clearToken = () => {
    //     localStorage.clear();
    //     this.setState({
    //         sessionToken: ''
    //     })
    // }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            value: newValue
        })
    };


    render() {
        return (
            <Container maxWidth="sm" className="mainContainer">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Buyer" id="buyer" />
                        <Tab label="Seller" id="seller" />
                        <Tab label="Admin" id="admin" />
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        <Buyer updateUser={this.props.updateUser} />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <Seller updateUser={this.props.updateUser} />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        <Admin updateUser={this.props.updateUser} />
                    </TabPanel>
                </AppBar>
            </Container>
        );
    }
}

// export default Auth;
