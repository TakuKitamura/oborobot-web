<template>
  <v-container>
    <h1>Oborobot</h1>
    <div v-if="questionState == 0">
      <v-text-field v-model="searchWords" label="検索ワード" />
      <v-btn color="primary" @click="askQuestion()">検索</v-btn>
    </div>

    <div v-else-if="questionState == 1">
      <h2>Question{{ questionNumber + 1 }}</h2>
      <h3>
        {{
          questionData.data !== undefined
            ? questionData.data[0].questions[questionNumber]
            : ""
        }}
      </h3>
      <v-row>
        <v-col>
          <v-btn-toggle v-model="selectButtonValue" tile group>
            <v-btn @click="nextQuestion()" value="yes" id="select-button">
              はい
            </v-btn>
            <v-btn @click="nextQuestion()" value="no" id="select-button">
              いいえ
            </v-btn>
            <v-btn
              @click="nextQuestion()"
              value="may be yes"
              id="select-button"
            >
              たぶんそう
            </v-btn>
            <v-btn @click="nextQuestion()" value="may be no" id="select-button">
              たぶんちがう
            </v-btn>
            <v-btn
              @click="nextQuestion()"
              value="don't know"
              id="select-button"
            >
              わからない
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <h2>あなたが探している記事はこれかもしれません｡</h2>
      <h3 v-if="questionData.data[0].length > 0">
        タイトル: {{ questionData.data[0].title }}
      </h3>
      <h3 v-if="questionData.data[0].description > 0">
        概要: {{ questionData.data[0].description }}
      </h3>
      <h3>
        URL:
        <a :href="questionData.data[0].url" target="_blank">{{
          questionData.data[0].url
        }}</a>
      </h3>
      <v-btn @click="questionRestart()">もう一度検索</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      questionState: 0,
      questionNumber: 0,
      selectButtonValue: null,
      searchWords: null
    };
  },
  computed: {
    ...mapState({
      questionData: state => state.questionStore.questionData
    })
  },
  created() {
    this.setQuery();
  },
  methods: {
    setQuery() {
      this.searchWords = this.$route.query.q || "";
    },
    nextQuestion() {
      this.questionNumber += 1;
      if (this.questionData.data[0].questions.length == this.questionNumber) {
        this.questionState = 2;
      }
    },
    askQuestion() {
      if (this.searchWords.length > 0) {
        console.log(111);
        this.$store.dispatch("questionStore/askQuestion", {
          seedValue: this.searchWords
        });
        this.questionState = 1;
        console.log(555);
      }
    },
    questionRestart() {
      this.questionState = 0;
      this.questionNumber = 0;
      this.selectButtonValue = null;
      this.searchWords = null;
    },
    ...mapActions({
      // updateExcelType: "questionStore/updateExcelType"
    })
  }
};
</script>
