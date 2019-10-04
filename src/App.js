import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import NavBar from './NavBar/NavBar';
// import Question from './Question/Question';
// import Questions from './Questions/Questions';
import Callback from './Callback';
// import NewQuestion from './NewQuestion/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute'
// import SecuredRouteAdmin from './SecuredRoute/SecuredRouteAdmin';
import StoreUser from './store-user';
// import NewMCQQuestion from './NewQuestion/NewMCQQuestion';
// import MCQQuestion from './Question/MCQQuestion';
// import CreateQuiz from './CreateQuiz';
// import Quizzes from './QuizHandler';
// import DelQuestion from './DelQuestion';
// import DelQuiz from './DelQuiz';
import dashboard from './dashboard.js'
import insertfile from './insert-file'
import getreport from './getreport'
class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }
  
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={insertfile}/>
        <Route exact path='/users/' component={StoreUser}/>
        <Route exact path='/getreport/' component={getreport}/>
        {/* // <Route exact path='/quiz/:quizId' component={Questions}/> */}
        {/* <Route exact path='/questions/:questionId' component={Question}/> */}
        {/* // <Route exact path='/questions/:questionId' component={MCQQuestion}/> */}
         <Route exact path='/callback/' component={Callback}/>
        {/* // <SecuredRoute path='/new-question' component={NewQuestion} /> */}
        {/* // <SecuredRoute path='/new-mcqquestion' component={NewMCQQuestion} /> */}
        {/* // <SecuredRoute path='/new-quiz' component={CreateQuiz} /> */}
        {/* // <SecuredRoute path='/del-question' component={DelQuestion}/> */}
        {/* // <SecuredRoute path='/del-quiz' component={DelQuiz}/> */} */}

      </div>
    );
  }
}

export default withRouter(App);
