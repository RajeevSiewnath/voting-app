const QUESTION = Symbol("QUESTION");
const ADD = Symbol("ADD");
const MODIFY = Symbol("MODIFY");
const DELETE = Symbol("DELETE");
const ANSWER = Symbol("ANSWER");
const RESET = Symbol("RESET");

interface QuestionAnswerAction {
  type: typeof QUESTION;
  payload: { question: string };
}

interface AddAnswerAction {
  type: typeof ADD;
  payload: { answer: string };
}

interface ModifyAnswerAction {
  type: typeof MODIFY;
  payload: { index: number; answer: string };
}

interface DeleteAnswerAction {
  type: typeof DELETE;
  payload: { index: number };
}

interface AnswerAction {
  type: typeof ANSWER;
  payload: { answer: string };
}

interface ResetAction {
  type: typeof RESET;
  payload?: typeof undefined;
}

export interface State {
  question: string;
  answers: Array<string>;
  votes: { [key: number]: number };
}

export type Action =
  | QuestionAnswerAction
  | AddAnswerAction
  | ModifyAnswerAction
  | DeleteAnswerAction
  | AnswerAction
  | ResetAction;

const PollReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case QUESTION:
      state.question = payload.question;
      return { ...state };
    case ADD:
      state.answers = [...state.answers, payload.answer];
      state.votes[state.answers.length - 1] = 0;
      return { ...state };
    case MODIFY:
      const { answer, index } = payload;
      state.answers[index] = answer;
      return { ...state };
    case DELETE:
      state.answers.splice(payload.index, 1);
      return { ...state };
    case ANSWER:
      const i = state.answers.findIndex((a) => a === payload.answer);
      state.votes[i]++;
      return { ...state };
    case RESET:
      state = {
        question: "",
        answers: [],
        votes: {},
      };
      return state;
    default:
      return state;
  }
};

export default PollReducer;
export { QUESTION, ADD, MODIFY, DELETE, ANSWER, RESET };
