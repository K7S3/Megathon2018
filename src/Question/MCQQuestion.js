import React, {Component} from 'react';
import axios from 'axios';
var Qid = 0;
var Score = parseInt(sessionStorage.getItem("score"), 10)
console.log(Score)
// import SubmitAnswer from './SubmitAnswer';
// import auth0Client from '../Auth';
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
class MCQQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answer: "",
    };
    this.handle_submit = this.handle_submit.bind(this);
    this.handle_answer_change = this.handle_answer_change.bind(this);
    // this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    Qid=parseInt(`${params.questionId}`, 10 ) + 1;
    // window.alert(Qid);
    
    const question = (await axios.get(`http://localhost:8080/questions/${params.questionId}`)).data;
    this.setState({question,});
    
  }
  handle_answer_change(event) {
    this.state.answer += event.target.value;
    console.log(this.state.answer)
  }
  handle_submit(event) {
    // console.log(this.state.answer);
    // console.log(this.state.question[0].answer)
    if(this.state.answer == this.state.question.answer)
    {
      document.getElementById('correct_or_wrong').innerHTML = 'Correct';
      Score += 10;
      sessionStorage.setItem("score", Score);
    }
    else {
      document.getElementById('correct_or_wrong').innerHTML = 'Wrong';
    }
    sleep(500).then(() => {
      if(`${Qid}` % 5 !=0)
      { 
        window.location.replace("http://localhost:3000/questions/" + `${Qid}`)
      }
      else{
          window.alert("You have scored:" + Score);
          window.location.replace("http://localhost:3000/");
      }
  });
  }
  render() {
    const {question} = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <mark>{question.question}</mark>

            {/* <p className="lead">{question.description}</p> */}
            <hr className="my-4" />
            {/* <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} /> */}
            {/* <p>Answers:</p> */}

            <input type="radio"  value="1" onChange={this.handle_answer_change}/>{question.option1}
            <br />
            <input type="radio"  value="2" onChange={this.handle_answer_change}/>{question.option2}
            <br />
            <input type="radio"  value="3" onChange={this.handle_answer_change}/>{question.option3}
            <br />
            <input type="radio"  value="4" onChange={this.handle_answer_change}/>{question.option4}
            <br />
            <hr className="my-4" />
            <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.handle_submit()}}>
                  Submit
            </button>
            
                
            <h3 id="correct_or_wrong"></h3>
            
          </div>
        </div>
      </div>
    )
  }
}

export default MCQQuestion;
