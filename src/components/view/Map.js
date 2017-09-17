import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {
  constructor(){
    super()
    this.state = {
      map: null
    }
  }

  mapDragged(){
    var latLng = this.state.map.getCenter().toJSON()
    console.log('map dragged: '+JSON.stringify(latLng))
    this.props.mapMoved(latLng)
  }

  render() {

    const markers = this.props.markers || []
  //  const center = { lat: 39.6498851, lng: -79.9506722 }

    return(
    <GoogleMap
      ref={ (map) => {
        if (this.state.map != null)
          return
            this.setState({map: map})
      }
    }
     defaultZoom={this.props.zoom}
     defaultCenter={this.props.center}
     onDragEnd={this.mapDragged.bind(this)}>
     {markers.map((marker, index) => (
       <Marker {...marker} />
     ))}
   </GoogleMap>
    )
  }
}

export default withGoogleMap(Map)
