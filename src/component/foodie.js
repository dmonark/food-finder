import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ResCard from './resCard';
import EditDialog from './dialog';

class Foodie extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            whichCity: 4,
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
                    <div>
                        <EditDialog
                            open={this.state.open}
                            whichCity={this.state.whichCity}
                            handleClose={this.handleClose}
                            handleChange={this.handleChange}
                        />
                    </div>
                </div>
                <div>
                    <Grid container spacing={0}>
                        {
                            this.state.resData.map((value, key) => (
                                <ResCard 
                                    key={"res"+key}
                                    data={value}
                                    gridCode={4}
                                />
                            ))
                        }
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Foodie;