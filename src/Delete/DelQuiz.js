import React, { Component } from 'react';
import './DelQuestion.css'

var delid =  -1;
function handleid (event) {
  delid = event.target.value;
  // window.alert(delid);
}
class DelQuiz extends Component {
  constructor() {
    super();
  
    this.state = {
      data: [],
     
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  
  handleSubmit (event) {
   
    fetch('http://localhost:8080/quizzes/' + delid , {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
      // window.alert(this.state.submitted);
    this.componentDidMount();
    this.render();  
  }
 
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quizzes/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete Question</h1>
        </header>
  <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Select To Delete</th>
              <th>ID</th>
              <th>Name</th>
              
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td><input type="radio" value={item.id} name="deletequiz" onChange={handleid} /></td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      
       <button type="submit" className="btn btn-default">Delete</button>
</form>      
       {this.state.submitted &&
          <div>
            <h2>
             Selected people have been succesfully deleted.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
      </div>
      
    );
  }
}

export default DelQuiz;
