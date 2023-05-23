import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  state = {
    index: 0,
    aleatoryAnswers: [],
    isLoading: true,
    selectedAnswer: null,
    isCorrect: null,
  };

  componentDidMount() {
    const { questions } = this.props;
    this.setState(() => ({
      aleatoryAnswers: this.getAleatoryAnswers(questions[0]),
      isLoading: false,
    }));
  }

  getAleatoryAnswers = (answers) => {
    const random = 0.5;
    console.log(answers);
    return [
      {
        answer: answers.correct_answer,
        isCorrect: true,
      },
      ...answers.incorrect_answers.map((incorrectAnswer) => ({
        answer: incorrectAnswer,
        isCorrect: false,
      })),
    ].sort(() => Math.random() - random);
  };

  handleAnswerClick = (isCorrect) => {
    this.setState({ selectedAnswer: isCorrect, isCorrect });
  };

  handleNextQuestion = () => {
    const { index } = this.state;
    const { questions } = this.props;
    if (index < questions.length - 1) {
      this.setState((prevState) => {
        const nextIndex = prevState.index + 1;
        return {
          index: nextIndex,
          aleatoryAnswers: this.getAleatoryAnswers(questions[nextIndex]),
          selectedAnswer: null,
          isCorrect: null,
        };
      });
    } else {
      // Feedback / ranking
    }
  };

  render() {
    const { questions } = this.props;
    const {
      index,
      aleatoryAnswers,
      isLoading,
      selectedAnswer,
      isCorrect,
    } = this.state;
    const { question, category } = questions[index];
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Header />
        <section>
          <p data-testid="question-text">{question}</p>
          {category && <p data-testid="question-category">{category}</p>}
          <div data-testid="answer-options">
            {aleatoryAnswers.map((answer) => {
              const isCorrectAnswer = answer.isCorrect;
              const isSelectedAnswer = selectedAnswer !== null;
              const isAnswerChecked = isCorrect !== null;
              let buttonStyle = { border: 'none' };

              if (
                isSelectedAnswer
              && isCorrectAnswer
              && isAnswerChecked
              ) {
                buttonStyle = { border: '3px solid rgb(6, 240, 15)' };
              } else if (
                isSelectedAnswer
              && !isCorrectAnswer
              && isAnswerChecked
              ) {
                buttonStyle = { border: '3px solid rgb(255, 0, 0)' };
              }

              return (
                <button
                  key={ answer.answer }
                  data-testid={ isCorrectAnswer ? 'correct-answer' : 'wrong-answer' }
                  onClick={ () => this.handleAnswerClick(answer.isCorrect) }
                  style={ buttonStyle }
                  disabled={ selectedAnswer !== null }
                >
                  {answer.answer}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && (
            <button onClick={ this.handleNextQuestion }>Next</button>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: [...state.questions.questions],
});
Game.propTypes = {
  questions: propTypes.arrayOf(
    propTypes.shape({
      question: propTypes.string.isRequired,
      category: propTypes.string,
      correct_answer: propTypes.string.isRequired,
      incorrect_answers: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Game);
