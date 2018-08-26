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
import Grid from "@material-ui/core/Grid";

const EditDialog = function(props) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={props.open}
            onClose={() => props.handleClose('openCity')}
        >
            <DialogTitle>Edit Changes</DialogTitle>
            <DialogContent>
                <div style={{width: 500}}>
                    <div>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel htmlFor="city-simple">City</InputLabel>
                                <Select
                                    value={props.whichCity}
                                    onChange={(event) => props.handleChange('whichCity', event)}
                                    input={<Input id="city-simple" />}
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
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel htmlFor="sort-simple">Sort</InputLabel>
                                <Select
                                    value={props.whichSort}
                                    onChange={(event) => props.handleChange('whichSort', event)}
                                    input={<Input id="sort-simple" />}
                                >
                                    <MenuItem value={"cost"}>Cost</MenuItem>
                                    <MenuItem value={"rating"}>Rating</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel htmlFor="order-simple">Order</InputLabel>
                                <Select
                                    value={props.whichOrder}
                                    onChange={(event) => props.handleChange('whichOrder', event)}
                                    input={<Input id="order-simple" />}
                                >
                                    <MenuItem value={"asc"}>Ascending </MenuItem>
                                    <MenuItem value={"desc"}>Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose('openCity')} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => props.handleClose('openCity')} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
  };
  
  export default EditDialog;