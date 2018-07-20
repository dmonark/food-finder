import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

class Foodie extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            resData: [],
            whichRes: null
        };

        this.dataFetcher = this.dataFetcher.bind(this);
    }

    dataFetcher(count){
        var resData = this.state.resData;
        
        fetch("https://developers.zomato.com/api/v2.1/search?entity_id=7&entity_type=city&start="+count, {
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

    componentDidMount(){
        this.dataFetcher(0);
        this.dataFetcher(20);
        this.dataFetcher(40);   
    }

    changeRes(key){
        this.setState({
            whichRes: key
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={20}>
                    
                        {
                            this.state.resData.map((value, key) => (
                                <Grid item xs={4}>
                        
                                <Card key={"res"+key}>
                                    <Grid container spacing={0}>
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
                                                    <Typography variant="h3">
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
        );
    }
}

export default Foodie;