import { receiveUsers, addUserQuestion, saveUserAnswer } from "./users";
import { receiveQuestions, addQuestion, saveQuestionAnswer } from "./questions";
import { _getQuestions, _getUsers, _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(authedUser, question.id));
    });
  };
}

export function handleAnswer(qid, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const saveObj = {
      authedUser: authedUser,
      qid,
      answer: option,
    };
    _saveQuestionAnswer(saveObj).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, option));
      dispatch(saveUserAnswer(authedUser, qid, option));
    });
  };
}
