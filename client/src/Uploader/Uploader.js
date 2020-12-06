import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import Dropzone from "react-dropzone";
import "./Uploader.css";
import Axios from "axios";

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      location: this.props.location,
      id: this.props.location && this.props.location.id,
      city: this.props.location && this.props.location.city,
      country: this.props.location && this.props.location.country,
      summary: this.props.location && this.props.location.summary,
      latitude: this.props.lat,
      longitude: this.props.long,
      images: this.props.location && this.props.location.images || [],
      images_new: [],
      previewImages: [],
      submitted: false,
      redirect: false,
      uploading:false
    };
  }

  // componentDidMount(){
  //   this.setState({
  //     latitude:this.props.latitude
  //   })
  // }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleUpdate = async event => {
    console.log('here')
    event.preventDefault();
    this.setState({ uploading: true })

    return (
      await Axios.put(
        "https://my-travelogue.herokuapp.com/locations/" + this.state.location.id,
        {
          city: this.state.city,
          country: this.state.country,
          summary: this.state.summary,
          latitude: this.props.lat,
          longitude: this.props.long,
          images: this.state.images_new
        },

        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => this.props.getLocations()
      )
      .then((res) => {
        this.setState({
          uploading:false,
          redirect: true
        })
        return res
      })

    );
  }


  handleSubmit = async event => {
    event.preventDefault()
    this.setState({uploading:true})
    const { city, country, summary, latitude, longitude, images } = this.state
    console.log('before condition')
    console.log(city, country, summary, latitude, longitude, images)
    if (city && country && summary && latitude && longitude && images) {

      console.log('after condition')
      //sending data to server
      return (
        await Axios.post(
          "https://my-travelogue.herokuapp.com/locations",
          {
            city: this.state.city,
            country: this.state.country,
            summary: this.state.summary,
            latitude: this.props.lat,
            longitude: this.props.long,
            images: this.state.images
          },

          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
          .then((res) => this.props.getLocations()
          )
          .then((res) => {
            this.setState({
              uploading:false,
              redirect: true
            })
            return res
          })

          .then((res) => console.log('res', res))




      )
    }
  }



  // https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  //accepted - array of imgs
  onDrop = accepted => {

    // let previewImages = [];
    // previewImages.push(this.state.images)

    // for (let i in accepted) {
    //   previewImages.push({ accepted });
    // }

    // this.setState({ previewImages: previewImages });
    accepted.forEach(file => {
      console.log(file)
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.setState(state => ({
          images: [
            ...state.images,
            {
              name: file.name,
              imageBase64: reader.result,
              locationId: this.state.id
            }
          ]
        }))

        // console.log(reader.result)
        this.setState(state => ({
          images_new: [
            ...state.images_new,
            {
              name: file.name,
              imageBase64: reader.result,
              locationId: this.state.id
            }
          ]
        }))
      });
      reader.readAsDataURL(file);
    });
    // console.log(previewImages)
  };

  deletePhoto = async (e) => {
    let id = e.target.getAttribute('id')
    let name = e.target.getAttribute('value')

    try {
      const deleteImage = await Axios.delete('https://my-travelogue.herokuapp.com/images/' + id)

      let images = this.state.images.filter((elem) => {

        if (elem.name !== name) {

          return e
        }
      })
      this.setState({ images: images })

      let images_new = this.state.images_new.filter((elem) => {

        if (elem.name !== name) {


          return e
        }
      })
      this.setState({ images_new: images_new })


      // console.log(images, images_new);

    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    const { images } = this.state;
    const hasImages = images.length > 0;

    console.log('uploader props', this.props)
    console.log('uploader State', this.state)
   
    const redirectToList = this.state.redirect && <Redirect to={'./locations'} />
    return (
      <div className="uploader">
        {redirectToList}
        <form className="addLocationForm" onSubmit={this.props.update === true ? this.handleUpdate : this.handleSubmit}>
          <div className="fields">
            <div className="field">
              {/* <label className="name">City: </label> */}
              <input
                type="text"
                placeholder={this.props.passer === 'modalUpdate' ? this.state.city : 'city'}
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              {/* <label className="country">Country: </label> */}
              <input
                type="text"
                placeholder={this.props.passer === 'modalUpdate' ? this.state.country : "Country"}
                name="country"
                value={this.state.country}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              {/* <label className="summary">Summary: </label> */}
              <textarea
                placeholder={this.props.passer === 'modalUpdate' ? this.state.summary : "Description"}
                name="summary"
                value={this.state.summary}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="dropzoneWrapper">
            <div className="dropzone-and-button">
              <Dropzone
                maxSize={2000000}
                accept="image/jpeg, image/png"
                onDrop={this.onDrop}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop files here...</p>
                      ) : (
                          <p>Drop images here, or click to upload.</p>
                        )}
                    </div>
                  );
                }}
              </Dropzone>

              <div className="button">
                <button type="submit">{this.state.uploading ? '...uploading' : 'Submit'}</button>
              </div>
            </div>
            {hasImages && (
              <div className="imagePreview">
                {images.map((image, index) => (
                  <div className="img-wrapper">

                    <img key={index} src={image.imageBase64} />
                    <i className="fas fa-times-circle" onClick={this.deletePhoto} name="name" id={image.id} value={image.name}></i>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Uploader;
