import React, { Component } from 'react'
import { Map } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'

class MapNavigation extends Component {

  setNewLocation(location) {
  //  console.log('Set New Location: '+JSON.stringify(location))
    this.props.updateCurrentLocation(location)
  }

  render() {

    //const center = { lat: 39.6498851, lng: -79.9506722 }

    return(
      <div>
        <Map
              zoom={14}
              center={this.props.posts.currentLocation}
              mapMoved={this.setNewLocation.bind(this)}
              containerElement={<div style={{minHeight:800, height:'100%'}} />}
              mapElement={<div style={{minHeight:800, height:'100%'}} />}
        />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    posts: state.post
  }
}

const dispatchToProps = (dispatch) => {
  return {
      updateCurrentLocation: (location) => dispatch(actions.updateCurrentLocation(location))
  }
}

export default connect(stateToProps, dispatchToProps)(MapNavigation)
