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
    lang,
    seedValue
  }) {
    console.log(222);
    const askQuestionEndpoint =
      process.env.scheme +
      process.env.host +
      ":" +
      process.env.apiPort +
      "/api/question";

    try {
      let askQuestionResponse = await axios.post(
        askQuestionEndpoint, {
          value: seedValue,
          lang: lang
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      action.commit(ASK_QUESTION, askQuestionResponse);
    } catch {
      alert('学習がまだされていない場合の実装中')
      location.href = '/'
    }
  }
};
