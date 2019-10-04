import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import axios from 'axios';
class dashboard extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
       dashboard: null,
        
      };
    }
  
    // async componentDidMount() {
    //   const getreport = (await axios.get('/')).data;
    //   this.setState({
    //     getreport,
    //   });
    //   // console.log(getreport)
    // }
    render() {
        return (
          <div className="container">
            <div className="row">
            {/* {this.state.questions === null && <p>Loading questions...</p>}
             {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/questions/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Questions</div>
                    <div className="card-body">
                      <p className="card-title">{question.question}</p>
                      {/* <p className="card-text">{question.answer}</p> */}
                    {/* </div> */}
                  {/* </div> */}
                {/* // </Link> */} */}
        
                {/* // </div> */}
            {/* // )) */}
          {/* // } */}
              
              </div>
            </div>
              )}
}
export default withRouter(dashboard);