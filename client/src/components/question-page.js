import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.submitAnswer = this.submitAnswer.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchQuestions());
    }

submitAnswer(event) {
  event.preventDefault();
  this.props.dispatch(actions.answerSubmit(this.refs.input.value));
}


    render() {
      const firstQuestion = this.props.questions
      console.log(this.props.questions.questions)
        // const questions = this.props.questionArray.map((question, index) => <li key={index}>{question.question}</li>);

        const answerInput = <form className="answerInput" onSubmit={this.submitAnswer}>
          <input type="text" id="form-text" placeholder="Your Answer" ref="input" required/>
          <input type="submit" name="submit answer" value="Submit"/>
        </form>

        return (
            <div>
              <h2 className="current-word">
                Current Word
              </h2>

              {/* <p> Question: {questionCounter} of {totalQuestionNum} </p> */}

              <ul className="question-list">
                {firstQuestion}
              </ul>
              {/*conditionally render score here */}
              <h2 className="answer">
                      Answer
                    </h2>
                  {/*conditionally render correct answer IF input answer !== question answer*/}
                  {answerInput}
                  </div>
                  );
                }
                }

                const mapStateToProps = (state, props) => {
                  return {questions: state.questions,
                  }
                }
                export default connect(mapStateToProps)(QuestionPage);
