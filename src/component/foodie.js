import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

var zomato = require('zomato');
var client = zomato.createClient({
    userKey: '99602fd2da0b1d1a976d947037a4bcd6', 
});

class Foodie extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            resData: [],
            whichRes: null
        };
    }

    componentDidMount(){
        var resData = []
        client.getGeocode({
            lat:"13.0827",
            lon:"80.2707",
        }, function(err, result){
            if(!err){
                resData = JSON.parse(result).nearby_restaurants;         
                this.setState({
                    resData: resData
                })
            } else {
                console.log(err);
            }
        }.bind(this));
    }

    changeRes(key){
        this.setState({
            whichRes: key
        })
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={4}>
                        <div style={{height:"100%"}}>
                        {
                            this.state.resData.map((value, key) => (
                                <Card key={"res"+key} onClick={() => this.changeRes(key)} style={{display: 'flex', height: 151, marginBottom: 5}}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={8}>
                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                <CardContent>
                                                    <Typography variant="subheading">{value.restaurant.name} #{value.restaurant.user_rating.aggregate_rating}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {value.restaurant.location.locality_verbose}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {value.restaurant.cuisines}
                                                    </Typography>
                                                </CardContent>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CardMedia
                                                style={{width: 151, height: 151}}
                                                image={value.restaurant.thumb}
                                                title="Live from space album cover"
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))
                        }
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Foodie;