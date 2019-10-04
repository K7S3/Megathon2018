import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
sessionStorage.setItem("score", 0);
class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  // async componentDidMount() {
  //   const questions = (await axios.get('http://localhost:8080/quizzes/${params.questionId}')).data;
  //   this.setState({
  //     questions,
  //   });
  //   console.log(questions);
  // }
  async componentDidMount() {
    await this.refreshQuestions();
  }

  async refreshQuestions() {
    const { match: { params } } = this.props;
    
    const questions = (await axios.get(`http://localhost:8080/questions/`)).data;
    this.setState({questions,});
    
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Only for admin</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                
              </div>
            </div>
          </Link>
          <Link to="/new-mcqquestion">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Only for admin</div>
              <div className="card-body">
                <h4 className="card-title">+ New MCQ Question</h4>
                
              </div>
            </div>
          </Link>
          <Link to="/del-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Only for admin</div>
              <div className="card-body">
                <h4 className="card-title">- Delete Question</h4>
                
              </div>
            </div>
          </Link>
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
    )
  }
}

export default Questions;
