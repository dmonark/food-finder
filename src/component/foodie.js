import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ResCard from './resCard';
import EditDialog from './editDialog';
import ReviewDialog from './reviewDialog';
import EventDialog from './eventDialog';
import AreaDialog from './areaDialog';

import getCall from './../utility/network';

class Foodie extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            openCity: false,
            openReview: false,
            openEvent: false,
            openArea: false,
            whichCity: 4,
            resData: [],
            reviewData: [],
            eventData: [],
            areaLocation: {
                "latitude": 0,
                "longitude": 0
            }
        };

        this.dataFetcher = this.dataFetcher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resDataFetcher = this.resDataFetcher.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.openReview = this.openReview.bind(this);
        this.openEvent = this.openEvent.bind(this);
        this.openArea = this.openArea.bind(this);
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
        
        var url = "https://developers.zomato.com/api/v2.1/search?entity_id="+this.state.whichCity+"&entity_type=city&start="+count
        
        var successCallback = function(result){
            var resData = this.state.resData;
            var resDataRaw = result.restaurants;         
            
            for(var everyResData in resDataRaw){
                var tempObj = {}
                tempObj["id"] = resDataRaw[everyResData].restaurant.R.res_id
                tempObj["name"] = resDataRaw[everyResData].restaurant.name
                tempObj["rating"] = resDataRaw[everyResData].restaurant.user_rating.aggregate_rating
                tempObj["subLocation"] = resDataRaw[everyResData].restaurant.location.locality_verbose
                tempObj["cuisines"] = (resDataRaw[everyResData].restaurant.cuisines).split(", ")
                tempObj["thumb"] = resDataRaw[everyResData].restaurant.thumb
                tempObj["location"] = {
                    "latitude": resDataRaw[everyResData].restaurant.location.latitude,
                    "longitude": resDataRaw[everyResData].restaurant.location.longitude,
                }
                resData.push(tempObj)
            }
            this.setState({
                resData: resData
            })
        }.bind(this)

        var errorCallback = function(error){
            console.log(error);   
        }
        
        getCall(url, successCallback, errorCallback);
    }

    openReview(index) {
        var resid = this.state.resData[index].id
        var url = "https://developers.zomato.com/api/v2.1/reviews?res_id="+resid

        var successCallback = function(result){
            var reviewData = []
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
            }, this.handleClickOpen('openReview'))
        }.bind(this)
        
        var errorCallback = function(error){
            console.log(error);   
        }

        getCall(url, successCallback, errorCallback);
    }

    openEvent(index) {
        var resid = this.state.resData[index].id
        var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id="+resid

        var successCallback = function(result){
            var eventData = []
            var eventDataRaw = result.zomato_events;         
            for(var everyEvent in eventDataRaw){
                var tempObj = {}
                tempObj["id"] = eventDataRaw[everyEvent].event.id
                tempObj["title"] = eventDataRaw[everyEvent].event.title
                tempObj["desc"] = eventDataRaw[everyEvent].event.description
                tempObj["image"] = eventDataRaw[everyEvent].event.photos[0].photo.url
                tempObj["thumb"] = eventDataRaw[everyEvent].event.photos[0].photo.thumb_url
                tempObj["date"] = eventDataRaw[everyEvent].event.display_date
                tempObj["time"] = eventDataRaw[everyEvent].event.display_time
                eventData.push(tempObj)
            }
            this.setState({
                eventData: eventData
            }, this.handleClickOpen('openEvent'))
        }.bind(this)

        var errorCallback = function(error){
            console.log(error);   
        }

        getCall(url, successCallback, errorCallback);
    }

    openArea(index) {
        var location = this.state.resData[index].location
        console.log(location)
        this.setState({
            areaLocation: location
        }, this.handleClickOpen('openArea'))
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
                                    openReview={this.openReview}
                                    openEvent={this.openEvent}
                                    openArea={this.openArea}
                                />
                            ))
                        }
                    </Grid>
                    </div>
                    <div>
                        <ReviewDialog
                            open={this.state.openReview}
                            handleClose={this.handleClose}
                            reviewData={this.state.reviewData}
                        />
                    </div>
                    <div>
                        <EventDialog
                            open={this.state.openEvent}
                            handleClose={this.handleClose}
                            eventData={this.state.eventData}
                        />
                    </div>
                    <div>
                        <AreaDialog
                            open={this.state.openArea}
                            handleClose={this.handleClose}
                            location={this.state.areaLocation}
                        />
                    </div>
                </div>
            </div>
        );

    }
}

export default Foodie;