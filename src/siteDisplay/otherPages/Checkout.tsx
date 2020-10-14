
import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { TextField, Button } from '@material-ui/core';
import {
    Route,
    Link,
    Switch, BrowserRouter as Router
} from 'react-router-dom';

type propsData = {
    stripe: any//Stripe | null | Promise<Stripe | null>,
    elements: any
}

type FormData = {
    displayForm: boolean,
    error: boolean
}

export default class CheckoutForm extends React.Component<propsData, FormData> {
    constructor(props: propsData) {
        super(props)
        this.state = ({
            displayForm: true,
            error: false
        })
    }


    handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log("On Submit")
        const { stripe, elements } = this.props;
        if (stripe) {
            // console.log("In If")
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
            if (error) {
                console.log('[error]', error);
                this.setState({ error: true})
            } else {
                console.log('[PaymentMethod]', paymentMethod);
                this.setState({
                    displayForm: false
                })
            }
        }
    };

    render() {
        const { stripe } = this.props;
        return (
            <div className="divHome">
                {this.state.displayForm ?
                    <form onSubmit={this.handleSubmit} className="divHome" style={{ width: "50%" }}>

                        <h2>Shipping Address</h2>
                        <TextField label="Address" fullWidth />
                        <TextField label="City" fullWidth />
                        <TextField label="State" />
                        <TextField label="ZipCode" />

                        <br />
                        <br />

                        <h2>Payment Details</h2>
                        <TextField label="Name on Card" fullWidth />
                        <br />
                        <br />
                        <CardElement
                            options={{
                                iconStyle: 'solid',
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#fffff',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <br />
                        <br />
                        <Button type="submit" disabled={!stripe} variant="outlined">
                            Pay
                        </Button>
                    </form>
                    :
                    <div>
                        {!this.state.error ? 
                        <h2> Congratulations! Your order is on its way! Don't forget to wait for it on your doorstep. While you wait...</h2>
                        : 
                        <h2> Oops! Something went wrong. Why don't you try again later! Meanwhile...</h2>
                        }
                        <br />
                        
                        {/* <button> */}
                        <Link to="/" className="nav-link"> Go back to Home </Link>
                        {/* </button> */}
                    </div>
                }
            </div>
        );
    }
}
