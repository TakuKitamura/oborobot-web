import axios from "axios";

const ASK_QUESTION = "ask_question";

export const state = () => ({
  questionData: []
});

export const mutations = {
  [ASK_QUESTION](state, questionData) {
    console.log(444);
    state.questionData = questionData;
  }
};

export const actions = {
  async askQuestion(action, {
    seedValue
  }) {
    console.log(222);
    const askQuestionEndpoint =
      process.env.scheme +
      process.env.host +
      process.env.apiPort +
      "/api/question";

    let askQuestionResponse = await axios.post(
      askQuestionEndpoint, {
        value: seedValue,
        lang: "ja"
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log(333);

    action.commit(ASK_QUESTION, askQuestionResponse);
  }
};
