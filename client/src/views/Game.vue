<template>
  <div class="row h-100" style="padding-top: 10px;">
    <div v-bind:class="{'col-6': true, 'selected-header': showHintsPage}" @click="navigate('hints')"><h4>HINTS</h4>
    </div>
    <div v-bind:class="{'col-6': true, 'selected-header': showGuessesPage}" @click="navigate('play')"><h4>PLAY</h4>
    </div>
    <div
      v-bind:class="{ 'col-sm-6': true, 'unselected': !showHintsPage, 'selected': showHintsPage }">
      <HintSection class="content-box" :game="game" v-on:question-asked="sendHintQuestion"
                   v-on:question-answered="sendHintAnswer"
                   :is-player-one="isPlayerOne"/>
    </div>
    <div
      v-bind:class="{ 'col-sm-6': true, 'unselected': !showGuessesPage, 'selected': showGuessesPage }">
      <Play class="content-box" :game="game" v-on:answer-sent="sendGameAnswer" :is-player-one="isPlayerOne"/>
    </div>
  </div>
</template>
<script>
  import io from 'socket.io-client';
  import axios from 'axios';
  import HintSection from '../components/HintSection.vue'
  import Play from '../components/Play.vue'

  export default {
    name: 'Game',
    components: {
      HintSection,
      Play,
    },
    data() {
      return {
        game: {},
        socket: io('localhost:3000'),
        isPlayerOne: false,
        showHintsPage: true,
        showGuessesPage: false
      };
    },
    props: ['sessionCode'],
    methods: {
      isSmallScreen() {
        const width = window.innerWidth;
        return width <= 767;
      },
      navigate(action) {
        const width = window.innerWidth;
        console.log(width);
        switch (action) {
          case 'hints': {
            this.showHintsPage = true;
            this.showGuessesPage = false;
            break;
          }
          case 'play': {
            this.showHintsPage = false;
            this.showGuessesPage = true;
          }
        }
      },
      createGameSession(e) {
        e.preventDefault();

        this.socket.emit('start', this.game);
      },
      getGameByCode(code) {
        const url = `http://127.0.0.1:3000/game_api/game/${code}`;
        return axios.get(url).then(response => {
          this.game = response.data.message;
          this.isPlayerOne = localStorage.name === this.game.playerOne
        });
      },
      sendHintQuestion(question) {
        this.socket.emit('ask_question', {question: question, name: localStorage.name, sessionCode: this.sessionCode});
      },
      sendHintAnswer(info) {
        const [questionId, answer] = info;
        const body = {questionId, name: localStorage.name, sessionCode: this.sessionCode, answer};
        console.log(body);
        this.socket.emit('answer_question', body);
      },
      sendGameAnswer(answer) {
        const body = {name: localStorage.name, sessionCode: this.sessionCode, answer};
        console.log(body);
        this.socket.emit('answer', body);
      },
      handleSocketResponse(session){
        this.game = session;
        if(session.ended === true){
          alert("Session has ended");
        }
      }
    },
    mounted() {
      console.log(this.sessionCode);
      this.getGameByCode(this.sessionCode);

      this.socket.on('failure', data => {
        console.log("failure");
        console.log(data);
        alert(data.error);
      });

      this.socket.on('hint_question_received', data => {
        console.log("hint_question_received");
        this.handleSocketResponse(data.body);
      });

      this.socket.on('hint_answer_received', data => {
        console.log("hint_answer_received");
        this.handleSocketResponse(data.body);

      });

      this.socket.on('answer_received', data => {
        console.log("answer_received");
        this.handleSocketResponse(data.body);
        if (!this.playerOne) {
          if (this.game) {

          }
        }
      });

    }
  };
</script>

<style scoped>

</style>
