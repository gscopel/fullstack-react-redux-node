import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'
import { CreatePost } from '../view'

class Posts extends Component {

  componentDidMount() {
    const currentLocation = this.props.posts.currentLocation
    this.props.fetchPosts(currentLocation)
    // APIManager.get('api/post', null)
    // .then(response => {
    //   console.log('RESPONSE: '+JSON.stringify(response))
    // })
    // .catch((err) => {
    //     console.log('ERROR: '+err)
    // })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate: ')
    if (this.props.posts.list == null){
      const currentLocation = this.props.posts.currentLocation
      this.props.fetchPosts(currentLocation)
    }
  }

  submitPost(post){
    const user = this.props.account.user
      if (user == null){
        alert('Please sign up or login to submit.')
        return
      }

    post['profile'] = {
      id: user.id,
      user: user.username
    }

    const currentLocation = this.props.posts.currentLocation
    post['geo'] = [
      currentLocation.lat,
      currentLocation.lng
    ]
      console.log('submit post: '+JSON.stringify(post))
      this.props.CreatePost(post)
  }

  render(){
    const list = this.props.posts.list // can be null

    return (
      <div>
        <CreatePost onCreate={this.submitPost.bind(this)} />

        <div className="table-wrapper">
          <table className="alt">
            <thead>
              <tr><th>Image</th><th>Caption</th></tr>
            </thead>
            <tbody>
              { (list == null) ? null :
                list.map((post, i) => {
                  return (
                    <tr key={post.id}>
                      <td><img style={{width:64}} src={post.image} /></td>
                      <td>{post.caption}</td>
                    </tr>

                  )
                })
               }

            </tbody>
          </table>
        </div>

      </div>
    )
  }
  }

  const stateToProps = (state) => {
  return {
    posts: state.post,
    account: state.account
  }
  }

  const dispatchToProps = (dispatch) => {
  return {
    CreatePost: (params) => dispatch(actions.CreatePost(params)),
    fetchPosts: (params) => dispatch(actions.fetchPosts(params))
  }
  }

  export default connect(stateToProps, dispatchToProps)(Posts)
