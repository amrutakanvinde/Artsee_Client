
import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { TextField } from '@material-ui/core';

type propsData = {
    stripe: any//Stripe | null | Promise<Stripe | null>,
    elements: any
}


export default class CheckoutForm extends React.Component<propsData> {
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
            } else {
                console.log('[PaymentMethod]', paymentMethod);
            }
        }
    };

    render() {
        const { stripe } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className="divHome">

                <h2>Shipping Address</h2>
                <TextField label="Address"/>

                
                <CardElement
                    options={{
                        iconStyle: 'solid',
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        );
    }
}
