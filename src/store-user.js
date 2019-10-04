import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
class StoreUser extends Component {
    constructor(props) {
      super(props);
      this.state = {
          questions: null
          }
      }

      async componentDidMount() {
        await this.refreshQuestions();
      }
    
      async refreshQuestions() {
          window.location.replace("https://manage.auth0.com/api/users")
      }
    render() {
        return (
          <div className="container">
            <div className="row">
            {this.state.questions === null && <p>Loading questions...</p>}
             {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/questions/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Questions</div>
                    <div className="card-body">
                      <p className="card-title">{question.question}</p>
                      {/* <p className="card-text">{question.answer}</p> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
              
              </div>
            </div>
              )}
}
export default withRouter(StoreUser);