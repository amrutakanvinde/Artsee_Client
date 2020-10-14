import React from 'react';
// import './App.css';
import { Buyer } from './Buyer';
import { Seller } from './Seller';
import { Admin } from './Admin';
import { Paper, Tabs, Tab, Box, Typography, AppBar, Container } from '@material-ui/core';
import { UserData } from '../../Interfaces';

type SessionData = {
    // sessionToken: string | null,
    role: string,
    value: number
}

type propsData = {
    updateUser: (user: UserData) => void,
    setUserRole: (role: string) => void,
    backgroundImageChange: (roleChange: string) => void
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
        this.state = {
            role: "",
            value: 0
        }
        this.props.backgroundImageChange("buyerDiv")
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            value: newValue
        })
        if(newValue === 0){
            this.props.backgroundImageChange("buyerDiv")
        } else if(newValue === 1){
            this.props.backgroundImageChange("sellerDiv")
        } else if(newValue === 2){
            this.props.backgroundImageChange("adminDiv")
        }
    };


    render() {
        return (
            <Container maxWidth="sm" className="mainContainer">
                <AppBar position="static" color="default">
                    {/* <h2>LOGO</h2> */}
                    <Tabs
                        centered={true}
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
