import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const EditDialog = function(props) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>Edit Changes</DialogTitle>
            <DialogContent>
                <FormControl>
                    <InputLabel htmlFor="age-simple">City</InputLabel>
                    <Select
                        value={props.whichCity}
                        onChange={(event) => props.handleChange(event)}
                        input={<Input id="age-simple" />}
                    >
                        <MenuItem value={3}>Mumbai</MenuItem>
                        <MenuItem value={1}>Delhi</MenuItem>
                        <MenuItem value={7}>Chennai</MenuItem>
                        <MenuItem value={4}>Bengaluru</MenuItem>
                        <MenuItem value={2}>Kolkata</MenuItem>
                        <MenuItem value={5}>Pune</MenuItem>
                        <MenuItem value={10}>Jaipur</MenuItem>
                        <MenuItem value={11}>Ahmedabad</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
  };
  
  export default EditDialog;