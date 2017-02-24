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
        let nextQuestion = this.props.questions[0]   

      console.log(nextQuestion)

        const answerInput = <form className="answerInput" onSubmit={this.submitAnswer}>
          <input type="text" id="form-text" placeholder="Your Answer" ref="input" required/>
          <input type="submit" name="submit answer" value="Submit"/>
        </form>
console.log('prop', this.props)
        if (!this.props.isFetched) {
          return <h1> Loading</h1>
        }
        return (
            <div>
              <h2 className="current-word">
                Current Word
              </h2>

              {/* <p> Question: {questionCounter} of {totalQuestionNum} </p> */}
              {/*can asign a variable for style*/}
              <ul className="question-list" style={{listStyleType: 'none'}}>
                <li>
                  {this.props.questions[0].question}
                </li>
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
                          isFetched: state.isFetched,
                  }
                }
                export default connect(mapStateToProps)(QuestionPage);
