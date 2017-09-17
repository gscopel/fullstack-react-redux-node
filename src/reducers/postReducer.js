import constants from '../constants'

var initialState = {
  currentLocation: {
    lat: 39.6513899,
    lng: -79.9512715
  },
  list: null
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch (action.type){
    case constants.POSTS_RECEIVED:
    //Test if reducer is receiving action
    //console.log('POSTS_RECEIVED: '+JSON.stringify(action.posts))
    updated['list'] = action.posts
      return updated

      case constants.POST_CREATED:
        let updatedList = null
        if (updated['list'] == null)
          updatedList = []
        else
          updatedList = Object.assign([], updated['list'])
          updatedList.unshift(action.post)
          updated['list'] = updatedList
        return updated

      case constants.CURRENT_LOCATION_CHANGED:
          //console.log('CURRENT_LOCATION_CHANGED: '+JSON.stringify(action.location))
          updated['currentLocation'] = action.location
          updated['list'] = null
          return updated

    default:
      return updated
  }
}
