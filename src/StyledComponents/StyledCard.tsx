import React from 'react';
import { withStyles, Card, CardMedia } from '@material-ui/core';


export const StyledCard = withStyles({
    root: {
        maxWidth: 345,
    }
})(Card);

export const StyledCardMedia = withStyles({
    root: {
        height: 200
    }
})(CardMedia)

// export default { StyledCard, StyledCardMedia };