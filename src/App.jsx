import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from "jquery"
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Bulk from './components/bulk.component';
import Month from './components/month.component';
import Member from './components/member.component';
import Transition from './components/transition.component';
import MemberTransaction from './components/memberTransaction';
import Login from './components/login.component';
import Dashboard from './components/dashboard.component';
import Header from './components/header.component';




class App extends Component {
 
	render() {		
  return (
    <Router>
      <div className="container-fluid">
       <Header></Header>
        <Switch>
            <Route exact path='/' component={ Index } />
            <Route  path='/create' component={ Create } />
            <Route path='/edit/:id' component={ Edit } />
            <Route path='/index' component={ Index } />
            <Route path='/bulk' component={ Bulk } />
            <Route path='/month' component={ Month } />
            <Route path='/member' component={ Member } />
            <Route path='/transition' component={ Transition } />
            <Route path='/mtransition/:id' component={ MemberTransaction } />
            <Route path='/login' component={ Login } />
            <Route path='/dashboard' component={ Dashboard } />
        </Switch>
      </div>
    </Router>
  );
	}
}

export default App