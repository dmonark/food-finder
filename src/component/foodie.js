import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ResCard from './resCard';
import EditDialog from './dialog';
import ResDialog from './resDialog';

class Foodie extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            openCity: false,
            openRes: false,
            whichCity: 4,
            whichRes: null,
            resData: [],
            reviewData: []
        };

        this.dataFetcher = this.dataFetcher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resDataFetcher = this.resDataFetcher.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.openRes = this.openRes.bind(this);
    }

    handleClickOpen(whatToggle){
        this.setState({ [whatToggle]: true });
    };
    
    handleClose(whatToggle){
        this.setState({ [whatToggle]: false });
    };

    handleChange(event){
        if(this.state.whichCity !== Number(event.target.value)) {
            this.setState({ 
                'whichCity' : Number(event.target.value), 
                'resData': []
            }, this.resDataFetcher);
        }
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

    openRes(index) {
        var resid = this.state.resData[index].id
        var reviewData = []
        
        fetch("https://developers.zomato.com/api/v2.1/reviews?res_id="+resid, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "user-key": "99602fd2da0b1d1a976d947037a4bcd6"
            },
        })
        .then(res => res.json())
        .then(
            (result) => {
                var reviewDataRaw = result.user_reviews;         
                for(var everyReview in reviewDataRaw){
                    var tempObj = {}
                    tempObj["id"] = reviewDataRaw[everyReview].review.id
                    tempObj["name"] = reviewDataRaw[everyReview].review.user.name
                    tempObj["thumb"] = reviewDataRaw[everyReview].review.user.profile_image
                    tempObj["rating"] = reviewDataRaw[everyReview].review.rating
                    tempObj["text"] = reviewDataRaw[everyReview].review.review_text
                    tempObj["time"] = reviewDataRaw[everyReview].review.review_time_friendly
                    reviewData.push(tempObj)
                }
                this.setState({
                    reviewData: reviewData
                })
            },
            (error) => {
                console.log(error);
            }
        )

        this.handleClickOpen('openRes')
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
                            <Button color="inherit" onClick={() => this.handleClickOpen('openCity')}>City</Button>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <EditDialog
                            open={this.state.openCity}
                            whichCity={this.state.whichCity}
                            handleClose={this.handleClose}
                            handleChange={this.handleChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                    <Grid container spacing={0}>
                        {
                            this.state.resData.map((value, key) => (
                                <ResCard 
                                    index={key}
                                    key={"res"+key}
                                    data={value}
                                    gridCode={4}
                                    openRes={this.openRes}
                                />
                            ))
                        }
                    </Grid>
                    </div>
                    <div>
                        <ResDialog
                            open={this.state.openRes}
                            handleClose={this.handleClose}
                            reviewData={this.state.reviewData}
                        />
                    </div>
                </div>
            </div>
        );

    }
}

export default Foodie;