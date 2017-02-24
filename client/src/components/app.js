import React from 'react';
import * as Cookies from 'js-cookie';
import * as actions from '../actions/actions'
import QuestionPage from './question-page';
import LoginPage from './login-page';
// import {SERVER_ROOT} from '../config';
import {connect} from 'react-redux';

export class App extends React.Component {

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(actions.fetchCurrentUser()
          );
        }
        }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }
        return <QuestionPage />;
    }
}
const mapStateToProps = (state, props) => {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps)(App)
