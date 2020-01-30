<template>
  <v-container>
    <!-- <v-row>
      <v-col> -->
    <!-- {{ showRecommendation }} -->
    <!-- {{ this.associationData }} -->
    <v-row justify="center" align="center"> </v-row>
    <v-card class="mx-auto">
      <v-card-title class="blue white--text">
        <span class="headline">Oborobot</span>

        <v-spacer></v-spacer>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <!-- <v-btn dark icon v-on="on"> -->
            <!-- <v-icon>mdi-dots-vertical</v-icon> -->

            <v-btn v-on="on" text color="white"> lang: {{ lang }} </v-btn>
            <!-- </v-btn> -->
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
        <div v-if="isSearching === false">
          <v-text-field
            v-model="searchWords"
            v-on:keyup.13="search()"
            :label="lang === 'ja' ? '連想ワード' : 'Association Words'"
          />
          <v-btn color="primary" @click="search()">{{
            lang === "ja" ? "連想" : "Association"
          }}</v-btn>
        </div>

        <div v-else style="margin-top: 1em">
          <div>
            <v-btn href="/">はじめの画面に戻る</v-btn>
          </div>
          <div style="margin-top: 1em">
            <h1>
              {{
                this.searchWords !== ""
                  ? lang === "ja"
                    ? `｢${this.searchWords}｣ から何を連想しますか?`
                    : `What do you associate with "${this.searchWords}" ?`
                  : ""
              }}
            </h1>
          </div>
          <v-card class="d-flex pa-2" style="margin-top: 1em" outlined tile>
            <!-- <v-chip large @click="chipClick(1)">あいうえお</v-chip> -->

            <v-chip-group column active-class="primary--text">
              <div :key="index" v-for="(item, index) in showChoice">
                <v-chip
                  @click="associationSelect(item.id, item.name)"
                  :key="item.name" x-large
                >
                  <h1>{{ item.name }}</h1>
                </v-chip>
              </div>
            </v-chip-group>
          </v-card>
          <div :key="index" v-for="(item, index) in showRecommendation">
            <v-card link class="mx-auto" target="_blank" :href="item.url" style="margin-top: 1em" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ item.url }}</div>
                  <v-list-item-title class="headline mb-1">
                    <a>{{ item.title }}</a>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </div>

        <!-- <div v-else-if="questionState === 1">
          <div v-if="questionData.length >= 1">
            <h4>
              {{
                `Question: ${
                  questionData[questionData.length - 1].data[0].questionNumber
                }`
              }}
            </h4>
            <h2>
              {{
                questionData[questionData.length - 1].data[0][
                  "question" + this.lang.toUpperCase()
                ]
              }}
            </h2> -->
        <!-- <h2>
              {{
                questionData.data !== undefined
                  ? questionData.data[questionData.data.length - 1][
                      "question_" + lang
                    ]
                  : ""
              }}
            </h2> -->
        <!-- </div>
          <v-row>
            <v-col>
              <v-btn-toggle v-model="selectButtonValue" tile group>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion(1)"
                  value="yes"
                  id="select-button"
                >
                  {{ lang === "ja" ? "はい" : "Yes" }}
                </v-btn>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion(2)"
                  value="no"
                  id="select-button"
                >
                  {{ lang === "ja" ? "いいえ" : "No" }}
                </v-btn>
              </v-btn-toggle>
              <v-btn-toggle v-model="selectButtonValue" tile group>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion(3)"
                  value="maybe yes"
                  id="select-button"
                >
                  {{ lang === "ja" ? "たぶんそう" : "Maybe Yes" }}
                </v-btn>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion(4)"
                  value="maybe no"
                  id="select-button"
                >
                  {{ lang === "ja" ? "たぶんちがう" : "Maybe No" }}
                </v-btn>
              </v-btn-toggle>
              <v-btn-toggle v-model="selectButtonValue" tile group>
                <v-btn
                  min-width="100px"
                  @click="nextQuestion(5)"
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
          <h3
            v-if="
              questionData.data[questionData.data.length - 1].title.length > 0
            "
          >
            <!-- {{ lang === "ja" ? "タイトル" : "Title" }}: -->
        <!-- [{{ questionData.data[questionData.data.length - 1].title }}]
          </h3>
          <h5
            v-if="
              questionData.data[questionData.data.length - 1].description
                .length > 0
            "
          > -->
        <!-- {{ lang === "ja" ? "概要" : "Description" }}: -->
        <!-- {{ questionData.data[questionData.data.length - 1].description }}...
          </h5>
          <h3>
            <a
              :href="questionData.data[questionData.data.length - 1].url"
              target="_blank"
              >{{ questionData.data[questionData.data.length - 1].url }}</a
            >
          </h3>
          <v-btn @click="questionRestart()">
            {{ lang === "ja" ? "もう一度検索 " : "Search Again" }}
          </v-btn>
        </div> -->
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
      nowQuestionNumber: 0,
      selectButtonValue: null,
      searchWords: null,
      isSearching: false
    };
  },
  computed: {
    showChoice() {
      const data = this.associationData["data"];
      if (data === undefined) {
        return;
      }
      let choice = data["choice"];
      if (choice === undefined) {
        return;
      }
      // console.log(choice.sort(function() { Math.random() - .5 }))

      const shuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      choice = shuffle(choice)

      if (choice.length >= 20) {
        choice = choice.slice(0, 20)
      }
      return choice;
    },
    showRecommendation() {
      const data = this.associationData["data"];
      if (data === undefined) {
        return;
      }
      let recommendation = data["recommendation"];

      if (recommendation === undefined) {
        return;
      }

      if (recommendation.length >= 5) {
        recommendation = recommendation.slice(0, 5)
      }
      return recommendation;
    },
    ...mapState({
      associationData: state => state.associateStore.associationData
    })
  },
  created() {
    this.setQuery();
    const id = this.uuidVersion3();
    this.$cookies.set("ID", id, {
      path: "/",
      domain: "localhost"
    });
  },
  methods: {
    search() {
      this.isSearching = true;
      this.associationStart();
    },
    chipClick(id) {
      console.log(id);
    },
    uuidVersion3(a) {
      return a
        ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
            /[018]/g,
            this.uuidVersion3
          );
    },
    selectLang(item) {
      if (item.title === this.items[0].title) {
        this.lang = "ja";
      } else if (item.title === this.items[1].title) {
        this.lang = "en";
      }
    },
    setQuery() {
      this.searchWords = this.$route.query.q || "";
    },
    nextQuestion(questionAnswerID) {
      this.answerQuestion(questionAnswerID);
      this.nowQuestionNumber += 1;
      // if (this.questionData.data[questionData.data.length - 1].questions.length === this.nowQuestionNumber) {
      //   this.questionState = 2;
      // }
    },
    associationSelect(choiceID, name) {
      // alert(this.cookie);
      this.$store.dispatch("associateStore/associationSelect", {
        userID: this.$cookies.get("ID"),
        lang: this.lang,
        choiceID: choiceID
      });
      this.searchWords = name;
    },
    //     userID: userID,
    // questionID: questionID,
    // nowQuestionNumber: nowQuestionNumber,
    // questionAnswerID: questionAnserID,
    // lang: lang
    associationStart() {
      if (this.searchWords.length > 0) {
        // console.log(111);
        this.$store.dispatch("associateStore/associationStart", {
          userID: this.$cookies.get("ID"),
          lang: this.lang,
          searchValue: this.searchWords
        });
        // this.questionState = 1;
        // console.log(555);
      }
    },
    questionRestart() {
      this.questionState = 0;
      this.nowQuestionNumber = 0;
      this.selectButtonValue = null;
      this.searchWords = null;
    },
    ...mapActions({
      // updateExcelType: "associateStore/updateExcelType"
    })
  }
};
</script>
