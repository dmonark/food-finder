import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const EventCard = function(props) {
    return (
        <Card style={{width: 500, marginBottom: 10}}>
            <CardHeader
                title={props.value.title}
            />
            {
                props.value.image && props.value.desc ? (
                    <CardContent>
                        <div>
                            <img src={props.value.image} style={{width: '100%'}} alt="Events" />
                        </div>
                        <Typography component="p">
                            {props.value.desc}
                        </Typography>
                    </CardContent>
                ) : null
            } 
        </Card>       
    )
}

const EventDialog = function(props) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={props.open}
            onClose={() => props.handleClose('openEvent')}
        >
            <DialogTitle id="map-dialog-title">Events</DialogTitle>
            <DialogContent>
                <div>
                    {
                        props.eventData.length !== 0 ? ( 
                            props.eventData.map((value, key) => (
                                <EventCard
                                    key={"event"+key}
                                    value={value}
                                />
                            ))
                        ) : (
                            <EventCard
                                key={"event-no"}
                                value={{
                                    "title": "No event",
                                }}
                            />
                        ) 
                    }
                </div>   
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose('openEvent')} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
  
export default EventDialog;