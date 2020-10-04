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
import { Container } from '@material-ui/core';

type propsData = {
    key: number,
    itemName: string,
    price: number,
    quantity: number,
    sellerId: number
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

 const Item: FunctionComponent<propsData>=(props) => {
        return (
            
            <Container key={props.key}>
                <StyledCard >
                    <CardActionArea>
                        <StyledCardMedia
                            // image={image}
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
                        <Button size="small" color="primary">
                            Share
                    </Button>
                        <Button size="small" color="primary">
                            Learn More
                    </Button>
                    </CardActions>
                </StyledCard>
            </Container>
        );
}

export default Item;