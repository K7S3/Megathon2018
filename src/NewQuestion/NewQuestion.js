import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
// import axios from 'axios';

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formData: {
            
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer: "",
        },
        submitted: false,
    }
    this.handle_question_change = this.handle_question_change.bind(this);
    this.handle_option1_change = this.handle_option1_change.bind(this);
    this.handle_option2_change = this.handle_option2_change.bind(this);
    this.handle_option3_change = this.handle_option3_change.bind(this);
    this.handle_option4_change = this.handle_option4_change.bind(this);
    this.handle_answer_change = this.handle_answer_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
}
handle_submit(event) {
    // if(this.state.submitted == true)
    // return;
    // event.preventDefault();
    // this.handle_answer_change(a);
    fetch('http://localhost:8080/questions/', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300)
                this.setState({
                    submitted: true
                });
        });
}
handle_question_change(event) {
    this.state.formData.question = event.target.value;
    // console.log(event.target.value)
}
handle_option1_change(event) {
    this.state.formData.option1 = event.target.value;
}
handle_option2_change(event) {
    this.state.formData.option2 = event.target.value;
}
handle_option3_change(event) {
    this.state.formData.option3 = event.target.value;
}
handle_option4_change(event) {
    this.state.formData.option4 = event.target.value;
}
handle_answer_change(event) {
    // event.preventDefault();
    this.state.formData.answer = event.target.value;
    console.log(this.state.formData.answer)
}

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Question</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                   <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={this.handle_question_change}
                    className="form-control"
                    placeholder="Give your question a title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Option 1:</label>
                  <input id="option1"  name= "A" type="radio"  value="1" onChange={this.handle_answer_change} />
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={this.handle_option1_change}
                    className="form-control"
                    placeholder="Necessary field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Option 2:</label>
                  <input id="option2"  name= "A" type="radio"  value="2" onChange={this.handle_answer_change}/>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={this.handle_option2_change}
                    className="form-control"
                    placeholder="Necessary field."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Option 3:</label>
                  <input id="option3"  name= "A" type="radio" value="3" onChange={this.handle_answer_change}/>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={this.handle_option3_change}
                    className="form-control"
                    placeholder="Necessary field."
                    
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Option 4:</label>
                  <input id="option4" name= "A" type="radio" value="4" onChange={this.handle_answer_change}/>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={this.handle_option4_change}
                    className="form-control"
                    placeholder="Necessary field."
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.handle_submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewQuestion);
