<template>
  <v-container>
    <!-- <v-row>
      <v-col> -->
    <v-card class="mx-auto">
      <v-card-title class="blue white--text">
        <span class="headline">Oborobot</span>

        <v-spacer></v-spacer>

        <v-menu v-if="questionState === 0" bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <!-- <v-icon>mdi-dots-vertical</v-icon> -->
              <v-btn text color="white"> lang: {{ lang }} &nbsp;&nbsp;</v-btn>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="selectLang(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <div v-if="questionState === 0">
          <v-text-field
            v-model="searchWords"
            v-on:keyup="checkInput"
            :label="lang === 'ja' ? '検索ワード' : 'SearchWords'"
          />
          <v-btn color="primary" @click="askQuestion()">{{
            lang === "ja" ? "検索" : "Search"
          }}</v-btn>
        </div>

        <div v-else-if="questionState === 1">
          <h4>Question{{ questionNumber + 1 }}</h4>
          <h2>
            {{
              questionData.data !== undefined
                ? questionData.data[0].questions[questionNumber]
                : ""
            }}
          </h2>
          <v-row>
            <v-col>
              <v-btn-toggle v-model="selectButtonValue" tile group>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion()"
                  value="yes"
                  id="select-button"
                >
                  {{ lang === "ja" ? "はい" : "Yes" }}
                </v-btn>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion()"
                  value="no"
                  id="select-button"
                >
                  {{ lang === "ja" ? "いいえ" : "No" }}
                </v-btn>
              </v-btn-toggle>
              <v-btn-toggle v-model="selectButtonValue" tile group>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion()"
                  value="maybe yes"
                  id="select-button"
                >
                  {{ lang === "ja" ? "たぶんそう" : "Maybe Yes" }}
                </v-btn>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion()"
                  value="maybe no"
                  id="select-button"
                >
                  {{ lang === "ja" ? "たぶんちがう" : "Maybe No" }}
                </v-btn>
              </v-btn-toggle>
              <v-btn-toggle v-model="selectButtonValue" tile group>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion()"
                  value="don't know"
                  id="select-button"
                >
                  {{ lang === "ja" ? "わからない" : "Don't Know" }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <h4>
            {{
              lang === "ja"
                ? "あなたが探している記事はこれかもしれません｡"
                : "The article you are looking for could be this."
            }}
          </h4>
          <h3 v-if="questionData.data[0].title.length > 0">
            <!-- {{ lang === "ja" ? "タイトル" : "Title" }}: -->
            {{ questionData.data[0].title }}
          </h3>
          <h5 v-if="questionData.data[0].description.length > 0">
            <!-- {{ lang === "ja" ? "概要" : "Description" }}: -->
            {{ questionData.data[0].description }}...
          </h5>
          <h3>
            <a :href="questionData.data[0].url" target="_blank">{{
              questionData.data[0].url
            }}</a>
          </h3>
          <br />
          <v-btn @click="questionRestart()">
            {{ lang === "ja" ? "もう一度検索 " : "Search Again" }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    <!-- </v-col>
    </v-row> -->
    <!-- <h1>Oborobot</h1> -->
  </v-container>
</template>

<style>
#select-button {
  border: solid 1px #111111;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      lang: "ja",
      items: [{ title: "日本語" }, { title: "English" }],
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
    selectLang(item) {
      if (item.title === this.items[0].title) {
        this.lang = "ja";
      } else if (item.title === this.items[1].title) {
        this.lang = "en";
      }
    },
    checkInput(input) {
      if (input.keyCode === 13) {
        // alert("Enter was pressed");
        this.askQuestion();
      }
    },
    setQuery() {
      this.searchWords = this.$route.query.q || "";
    },
    nextQuestion() {
      this.questionNumber += 1;
      if (this.questionData.data[0].questions.length === this.questionNumber) {
        this.questionState = 2;
      }
    },
    askQuestion() {
      if (this.searchWords.length > 0) {
        // console.log(111);
        this.$store.dispatch("questionStore/askQuestion", {
          lang: this.lang,
          seedValue: this.searchWords
        });
        this.questionState = 1;
        // console.log(555);
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
