import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Foodie extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            whichCity: 1,
            resData: []
        };

        this.dataFetcher = this.dataFetcher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resDataFetcher = this.resDataFetcher.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange(event){
        console.log(event.target.value);
        this.setState({ 
            'whichCity' : Number(event.target.value), 
            'resData': []
        }, this.resDataFetcher);
    };

    dataFetcher(count){
        var resData = this.state.resData;

        fetch("https://developers.zomato.com/api/v2.1/search?entity_id="+this.state.whichCity+"&entity_type=city&start="+count, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "user-key": "99602fd2da0b1d1a976d947037a4bcd6"
            },
        })
        .then(res => res.json())
        .then(
            (result) => {
                var resDataRaw = result.restaurants;         
                for(var everyResData in resDataRaw){
                    var tempObj = {}
                    tempObj["id"] = resDataRaw[everyResData].restaurant.R.res_id
                    tempObj["name"] = resDataRaw[everyResData].restaurant.name
                    tempObj["rating"] = resDataRaw[everyResData].restaurant.user_rating.aggregate_rating
                    tempObj["subLocation"] = resDataRaw[everyResData].restaurant.location.locality_verbose
                    tempObj["cuisines"] = (resDataRaw[everyResData].restaurant.cuisines).split(", ")
                    tempObj["thumb"] = resDataRaw[everyResData].restaurant.thumb
                    resData.push(tempObj)
                 }
                this.setState({
                    resData: resData
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    resDataFetcher(){
        this.dataFetcher(0);
        this.dataFetcher(20);
        this.dataFetcher(40);
    }

    componentDidMount(){
        this.resDataFetcher();   
    }

    render() {
        return (
            <div>
                <div>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                                Food Finder
                            </Typography>
                            <Button color="inherit" onClick={this.handleClickOpen}>City</Button>
                        </Toolbar>
                    </AppBar>

                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <DialogTitle>Edit Changes</DialogTitle>
                        <DialogContent>
                            <FormControl>
                                <InputLabel htmlFor="age-simple">City</InputLabel>
                                    <Select
                                        value={this.state.whichCity}
                                        onChange={(event) => this.handleChange(event)}
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
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>    
                </div>
                <div>
                    <Grid container spacing={0}>
                        {
                            this.state.resData.map((value, key) => (
                                <Grid item xs={4} key={"res"+key}>
                        
                                <Card key={"res"+key}>
                                    <Grid container spacing={0} style={{height: 151}}>
                                        <Grid item xs={8}>
                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent>
                                                    <Typography variant="subheading">{value.name} </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {value.subLocation}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {value.cuisines.join(", ")}
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        #{value.rating}
                                                    </Typography>
                                                </CardContent>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CardMedia
                                                style={{width: 151, height: 151}}
                                                image={value.thumb}
                                                title="Live from space album cover"
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Foodie;