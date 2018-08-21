import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from  "@material-ui/core/Button"; 
const ResCard = function(props) {
    return (
        <Grid item xs={props.gridCode}>
            <Card key={"res"}>
                <Grid container spacing={0} style={{height: 151}}>
                    <Grid item xs={8}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent>
                                <Typography variant="subheading">{props.data.name} </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.data.subLocation}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {props.data.cuisines.join(", ")}
                                </Typography>
                                <Typography variant="caption">
                                    #{props.data.rating}
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia
                            style={{width: 151, height: 151}}
                            image={props.data.thumb}
                            title="Live from space album cover"
                        />
                    </Grid>
                </Grid>
                <CardActions onClick={() => props.openRes(props.index)}>
                    <Button size="small" color="primary">
                        Reviews
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
  };
  
  export default ResCard;