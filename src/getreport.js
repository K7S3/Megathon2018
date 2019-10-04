import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class getreport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getreport: null,
      
    };
  }

  async componentDidMount() {
    const getreport = (await axios.get('http://localhost:8080/getreport/')).data;
    this.setState({
      getreport,
    });
    console.log(getreport)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
    //       <Link to="/new-quiz">
    //         <div className="card text-white bg-secondary mb-3">
    //           <div className="card-header">Only for admin</div>
    //           <div className="card-body">
    //             <h4 className="card-title">+ New Quiz</h4>
                
            //   </div>
            // </div>
        //   </Link>
        //   <Link to="/del-quiz">
        //     <div className="card text-white bg-secondary mb-3">
        //       <div className="card-header">Only for admin</div>
        //       <div className="card-body">
        //         <h4 className="card-title">- Delete Quiz</h4>
                
        //       </div>
        //     </div>
        //   </Link>
          {this.state.getreport === null && <p>Loading getreport...</p>}
          {
            this.state.getreport && this.state.getreport.map(quiz => (
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

export default getreport;
