import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import GoogleMapReact from 'google-map-react';

const MapMarkerComponent = ({ text }) => (
    <div>
      {text}
    </div>
  );
  
class SimpleMap extends React.Component {
    static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };
  
    render() {
      return (
         <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapMarkerComponent 
            lat={this.props.location.latitude} 
            lng={this.props.location.longitude} 
            text={'Here'} 
          />
        </GoogleMapReact>
      );
    }
  }
  

const MapDialog = function(props) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={props.open}
            onClose={() => props.handleClose('openMap')}
        >
            <DialogTitle id="map-dialog-title">Map</DialogTitle>
            <DialogContent>
                <div style={{width: 500}}>
                    <SimpleMap
                        location={props.location}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose('openMap')} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
  };
  
  export default MapDialog;