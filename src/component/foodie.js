import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


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
            resData: [],
            whichCity: 4,
            whichSort: "cost",
            whichOrder: "desc",
            whichName: "",
            pageNumber: 0,
            totalRes: 0,
            whichOpen: "",
            whichInfo: []
        };

        this.dataFetcher = this.dataFetcher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openReview = this.openReview.bind(this);
        this.openEvent = this.openEvent.bind(this);
        this.openArea = this.openArea.bind(this);
    }

    handleChange(whichOne, event){
        this.setState({ 
            [whichOne] : event.target.value, 
            'resData': [],
            'pageNumber': 0
        }, this.dataFetcher);
    };

    dataFetcher(){
        
        var count = Number(this.state.pageNumber)*18;

        var url = "https://developers.zomato.com/api/v2.1/search?entity_id="+this.state.whichCity+"&entity_type=city&start="+count+"&count=18&sort="+this.state.whichSort+"&order="+this.state.whichOrder
        
        if(this.state.whichName.trim() !== "")
            url += "&q="+this.state.whichName;

        var successCallback = function(result){
            var resData = [];
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
                resData: resData,
                totalRes: result.results_found,
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
                whichOpen: "review",
                whichInfo: reviewData
            })
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
                whichOpen: "event",
                whichInfo: eventData
            })
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
            whichOpen: "foodie",
            whichInfo: location
        })
    }

    componentDidMount(){
        this.dataFetcher();   
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
                            <div className="app-search">
                                <Input
                                    placeholder="Name"
                                    value={this.state.whichName}
                                    onChange={(event) => this.handleChange('whichName', event)}        
                                />
                            </div>
                            <div>
                                <Button color="inherit" disabled={Number(this.state.pageNumber) === 0} onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber-1}), this.dataFetcher)}>Previos</Button>
                                <Button color="inherit" disabled={(Number(this.state.pageNumber)+1)*18 >= Number(this.state.totalRes)} onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber+1}), this.dataFetcher)}>Next</Button>
                            </div>
                            <Button color="inherit" onClick={() => {this.setState({whichOpen: "edit"})}}>Filters</Button>
                        </Toolbar>
                    </AppBar>
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
                        <Dialog            
                            disableBackdropClick
                            disableEscapeKeyDown
                            open={this.state.whichOpen !== ""}
                            onClose={() => {this.setState({whichOpen: ""})}}
                        >
                            <DialogTitle id="dialog-title">{this.state.whichOpen}</DialogTitle>  
                            <DialogContent>
                                <div style={{width: 500}}>
                                {
                                    this.state.whichOpen === "edit" ? (
                                        <EditDialog
                                            whichCity={this.state.whichCity}
                                            whichSort={this.state.whichSort}
                                            whichOrder={this.state.whichOrder}
                                            whichName={this.state.whichName}
                                            handleChange={this.handleChange}
                                        />
                                    ) : this.state.whichOpen === "review" ? (
                                        <ReviewDialog
                                            reviewData={this.state.whichInfo}
                                        />
                                    ) : this.state.whichOpen === "event" ? (
                                        <EventDialog
                                            eventData={this.state.whichInfo}
                                        />
                                    ) : this.state.whichOpen === "foodie" ? (
                                        <AreaDialog
                                            location={this.state.whichInfo}
                                        />
                                    ) : null
                                }
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {this.setState({whichOpen: ""})}} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}

export default Foodie;