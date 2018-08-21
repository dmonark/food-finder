import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from '@material-ui/core/Avatar';
import StarRatingComponent from 'react-star-rating-component';

const ReviewCard = function(props) {
    return (
        <Card style={{width: 500, marginBottom: 10}}>
            <CardHeader
                avatar={
                    <Avatar
                        src={props.value.thumb}
                    />
                }
                title={props.value.name}
                subheader={props.value.time}
            /> 
            <CardContent>
                <div>
                    <StarRatingComponent 
                        name="rate1" 
                        starCount={5}
                        value={props.value.rating}
                        editing={false}
                    />
                </div>              
                <Typography component="p">
                    {props.value.text}
                </Typography>
            </CardContent>
        </Card>       
    )
}

const ReviewDialog = function(props) {
    return (
        <Dialog
            
            disableBackdropClick
            disableEscapeKeyDown
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle id="rating-dialog-title">Review</DialogTitle>  
            <DialogContent>
                <div>
                    {
                        props.reviewData.map((value, key) => (
                            <ReviewCard
                                key={"review"+key}
                                value={value}
                            />
                        ))
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose('openRes')} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
  };
  
  export default ReviewDialog;