import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import { APIManager } from '../../utils'

class CreatePost extends Component {

  constructor(){
    super()
    this.state = {
      post: {
        image: '',
        caption: ''
      }
    }
  }

  updatePost(event){
    event.preventDefault()
    let updated = Object.assign({}, this.state.post)
    updated[event.target.id] = event.target.value
    this.setState({
      post: updated
    })
  }

  submitPost(event){
    event.preventDefault()
    //console.log('submit post: '+JSON.stringify(this.state.post))

    if (this.state.post.image.length == 0) {
      alert('Please add an image.')
      return
    }

    if (this.state.post.caption.length == 0) {
      alert('Please add a caption.')
      return
    }

    let updated = Object.assign({}, this.state.post)
    this.props.onCreate(updated)
  }

  imageSelected(files){
		console.log('imageSelected: ')
		const image = files[0]

		const cloudName = 'dxlpxqq8v'
		const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

		const timestamp = Date.now()/1000
		const uploadPreset = 'lsqpf0z3'

		const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'Nw-6G0Vuk8Mi5zH4ipmXWhFgQ-I'

		const signature = sha1(paramsStr)
		const params = {
			'api_key': '979397879789832',
			'timestamp': timestamp,
			'upload_preset': uploadPreset,
			'signature': signature
		}

    APIManager.uploadFile(url, image, params)
    .then((uploaded) => {
      console.log('upload complete: '+JSON.stringify(uploaded))
      let updated = Object.assign({}, this.state.post)
      updated['image'] = uploaded['secure_url']
      this.setState({
        post: updated
      })

      //Cloudinary returns this:
      // {"public_id":"jzwvhbc0agkhqdjj3nox","version":1505396903,"signature":"dd32ff3d361b45ca0071c4c654cb65776e5c07c7",
      //"width":1100,"height":1000,"format":"jpg","resource_type":"image","created_at":"2017-09-14T13:48:23Z",
      //"tags":[],"bytes":204786,"type":"upload","etag":"bd44cb443b540050fa3d2c41c9e2dceb",
      //"url":"http://res.cloudinary.com/dxlpxqq8v/image/upload/v1505396903/jzwvhbc0agkhqdjj3nox.jpg",
      //"secure_url":"https://res.cloudinary.com/dxlpxqq8v/image/upload/v1505396903/jzwvhbc0agkhqdjj3nox.jpg","original_filename":"contactcrop"}

    })
    .catch((err) => {
      alert(err)
    })
  }

  render() {
    return(
      <div style={{background:'#fff'}}>
				<h2>Submit Post</h2>
				<input id="caption" onChange={this.updatePost.bind(this)} type="text" placeholder="Caption" />
				<div className="row">
					<div className="3u 12u$(small)">
						<Dropzone onDrop={this.imageSelected.bind(this)} style={{border:'none', marginTop:12}}>
							<button className="button special small">Add Image</button>
						</Dropzone>
					</div>
					<div className="3u 12u$(small)">
						<button className="button special small" style={{marginTop:12, marginLeft:12, width:90+'%'}} onClick={this.submitPost.bind(this)}>Submit</button>
					</div>
					<div className="6u 12u$(small)">
						<img style={{width:120, float:'right', marginTop:12}} src={this.state.post.image} />
					</div>
				</div>

				<br /><br /><hr />
			</div>
    )
  }
}

export default CreatePost
