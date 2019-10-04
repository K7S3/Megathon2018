import React, { Component, Fragment } from "react";
// import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { render } from "react-dom";
import './insert-file.css'
import ReactDropzone from "react-dropzone";

class insertfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
    // this.handle_submit =this.handle_submit.bind(this);
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
     });
  }
  upload = () => {
    console.log(this.state.files[0].preview)
    fetch('http://cuckoo.cert.ee/tasks/create/url', {
      method: 'POST',
      body: this.state.files
      
  })
  .then(response => {
      if (response.status >= 200 && response.status < 300)
          this.setState({
              submitted: true
          });
  });
  }
  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    return (
      <div className="app">
        <ReactDropzone
          accept="image/*"
          onDrop={this.onPreviewDrop}
        >
         Drop your files here
        </ReactDropzone>
        {this.state.files.length > 0 &&
          <Fragment>
            <h3>Previews</h3>
            {this.state.files.map((file) => (
              <img
                alt="Preview"
                key={file.preview}
                src={file.preview}
                style={previewStyle}
              />
            ))}
          </Fragment>
        }
         <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={this.upload}>
                  Submit
                </button>
      </div>
    );
  }
}
export default withRouter(insertfile);