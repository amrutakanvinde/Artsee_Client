import React, { Component, FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from '../assets/image.jpg';
import { Container, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

type propsData = {
    key: number,
    itemName: string,
    price: number,
    quantity: number,
    sellerId: number,
    itemImage: string,
    itemDescription: string
}

const StyledCard = withStyles({
    root: {
        maxWidth: 345,
    }
})(Card);

const StyledCardMedia = withStyles({
    root: {
        height: 200
    }
})(CardMedia)

const Item: FunctionComponent<propsData> = (props) => {

    const mapQuantity = () => {
        let arr = [];
        for (let i = 1; i <= props.quantity; i++) {
            arr.push(<MenuItem value={i}>{i}</MenuItem>)
        }
        return arr;
    }

    return (
        <Container key={props.key}>
            <StyledCard >
                <CardActionArea>
                    <StyledCardMedia
                        image={props.itemImage}
                        title={props.itemName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.itemName}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" component="p">
                            Price: {props.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    
                    <Button size="small" color="primary" style={{marginTop:16, width: '50%'}}>
                        Add to Cart
                    </Button>
                    <FormControl style={{ width: '50%' }}>
                        <InputLabel style={{textAlign: 'right'}}>Quantity</InputLabel>
                        <Select
                        // open={open}
                        // onClose={handleClose}
                        // onOpen={handleOpen}
                        // value={age}
                        // onChange={handleChange}
                        >
                            {mapQuantity()}
                        </Select>
                    </FormControl>
                </CardActions>
            </StyledCard>
        </Container>
    );
}

export default Item;