import axios from "axios";

const ASSOCIATION_START = "association_start";
const ASSOCIATION_SELECT = "association_select";

export const state = () => ({
  associationData: {}
});

export const mutations = {
  [ASSOCIATION_START](state, associationData) {
    state.associationData = associationData;
  },
  [ASSOCIATION_SELECT](state, associationData) {
    state.associationData = associationData;
  }
};

export const actions = {
  async associationStart(action, {
    userID,
    lang,
    searchValue
  }) {
    const associationStartEndpoint =
      process.env.scheme +
      process.env.host +
      ":" +
      process.env.learnPort +
      "/start";
    try {
      let associationStartResponse = await axios.post(
        associationStartEndpoint, {
          userID: userID,
          searchValue: searchValue,
          lang: lang
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      action.commit(ASSOCIATION_START, associationStartResponse);
    } catch (error){
      alert(error)
      alert("機能修正中");
      location.href = "/";
    }
  },
  async associationSelect(action, {
    userID,
    lang,
    choiceID
  }) {
    const associationSelectEndpoint =
      process.env.scheme +
      process.env.host +
      ":" +
      process.env.learnPort +
      "/select";
    try {
      let associationSelectResponse = await axios.post(
        associationSelectEndpoint, {
          userID: userID,
          lang: lang,
          choiceID: choiceID,
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      action.commit(ASSOCIATION_SELECT, associationSelectResponse);
    } catch (error){
      alert(error)
      alert("学習がまだされていない場合の実装中");
      location.href = "/";
    }
  }
};
