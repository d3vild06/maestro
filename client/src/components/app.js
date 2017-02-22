import React from 'react';
import * as Cookies from 'js-cookie';

import QuestionPage from './question-page';
import LoginPage from './login-page';
import {SERVER_ROOT} from '../config';
import {connect} from 'react-redux';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(actions.fetchCurrentUser()
          );
        }
            // fetch(`${SERVER_ROOT}/api/me`, {
            //     headers: {
            //         'Authorization': `Bearer ${accessToken}`
            //     }
            // }).then(res => {
            //     if (!res.ok) {
            //         if (res.status !== 401) {
            //             // Unauthorized, clear the cookie and go to
            //             // the login page
            //             Cookies.remove('accessToken');
            //             return;
            //         }
            //         throw new Error(res.statusText);
            //     }
            //     return res.json();
            // }).then(currentUser =>
            //     this.setState({
            //         currentUser
                // })
            // );
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
