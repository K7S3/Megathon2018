import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Quizzes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: null,
      
    };
  }

  async componentDidMount() {
    const quizzes = (await axios.get('http://localhost:8080/quizzes/')).data;
    this.setState({
      quizzes,
    });
    console.log(quizzes)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-quiz">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Only for admin</div>
              <div className="card-body">
                <h4 className="card-title">+ New Quiz</h4>
                
              </div>
            </div>
          </Link>
          <Link to="/del-quiz">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Only for admin</div>
              <div className="card-body">
                <h4 className="card-title">- Delete Quiz</h4>
                
              </div>
            </div>
          </Link>
          {this.state.quizzes === null && <p>Loading quizzes...</p>}
          {
            this.state.quizzes && this.state.quizzes.map(quiz => (
              <div key={quiz.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/quiz/${quiz.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Quiz {quiz.name}</div>
                    <div className="card-body">
                      <p className="card-title">{quiz.genre}</p>
                      {/* <p className="card-text">{question.answer}</p> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Quizzes;
