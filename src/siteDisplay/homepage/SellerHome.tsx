import React, { Component } from 'react'
import ItemDataGrid from '../../components/DataGrid'
import APIURL from "../../helpers/environment";

type propsData = {
    sessionToken: string | null
}

type SellerData = {
    itemData: []
}

export class SellerHome extends Component<propsData, SellerData> {

    constructor(props: propsData){
        super(props)
        this.state = {
            itemData: []
        }
    }

    componentDidMount() {
        console.log("Did Mount", this.props.sessionToken);
        this.fetchItems();
    }

    fetchItems = () => {
        if (this.props.sessionToken) {
            console.log("Fetch")
            fetch(`${APIURL}/item/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw new Error("Error");
                    } else return res.json();
                })
                .then((data) => {
                    // console.log(data.item);
                    this.setState({
                        itemData: data.item
                    })
                })
                .catch((err) => alert(err));
        }
    }

    render() {
        return (
            <div>
                <h1>Seller home page</h1>
                <ItemDataGrid itemData={this.state.itemData} />
            </div>
        )
    }
}

export default SellerHome
