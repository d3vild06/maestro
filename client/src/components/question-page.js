import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     questions: []
        // };
    }

    componentDidMount() {
        this.props.dispatch(
          actions.fetchQuestions()
        );
        // const accessToken = Cookies.get('accessToken');
        // fetch(`${SERVER_ROOT}/api/questions`, {
        //         headers: {
        //             'Authorization': `Bearer ${accessToken}`
        //         }
        //     }).then(res => {
        //     if (!res.ok) {
        //         throw new Error(res.statusText);
        //     }
        //     return res.json();
        // }).then(questions =>
        //     this.setState({
        //         questions
        //     })
        // );

    }

    render() {
        const questions = this.props.questionArray.map((question, index) =>
            <li key={index}>{question}</li>
        );

        return (
          <ul className="question-list">
            {questions}
          </ul>
        );
    }
}
const mapStateToProps = (state, props) => {
  return {
    questionArray: state.questions,
  }
}

export default connect(mapStateToProps)(QuestionPage);
