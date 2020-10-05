import React, { Component } from 'react';

type CartData = {

}

 class Cart extends Component<{}, CartData> {
    constructor(props: {}){
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Cart</h1>
            </div>
        )
    }
}

export default Cart;