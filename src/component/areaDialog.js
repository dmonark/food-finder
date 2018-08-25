import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const AreaDialog = function(props) {
    var image = "https://www.zomato.com/widgets/foodie_widget_img.php?widget_type=4&lat="+props.location.latitude+"&lon="+props.location.longitude;
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={props.open}
            onClose={() => props.handleClose('openArea')}
        >
            <DialogTitle id="map-dialog-title">Foodie</DialogTitle>
            <DialogContent>
                <div>
                    <div className="widget_wrap" style={{width:'auto',height:'auto',display:'inline-block'}}>
                    <a href="https://www.zomato.com/" title="Foodie Index">
                    <img src={image} style={{width:"200", height:"150"}} alt="Foodie index"/>
                    </a> 
                    </div>
                </div>   
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose('openArea')} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
  
export default AreaDialog;