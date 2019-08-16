<template>
  <div class="row" style="padding-top: 10px; margin: auto;">
    <div v-bind:class="{'col-6': true, 'selected-header': showHintsPage, 'label-text': true}" style="color: white" @click="navigate('hints')"><h4>HINTS</h4>
    </div>
    <div v-bind:class="{'col-6': true, 'selected-header': showGuessesPage, 'label-text': true}" @click="navigate('play')"><h4>PLAY</h4>
    </div>
    <div v-if="otherPlayer !== ''" class="container label-text" style="margin-bottom: 10px;">Other player: {{otherPlayer}}</div>
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

    <button v-on:click="logoutUser" id="logoutButton" title="Logout"><i class="fa fa-sign-out" style="font-size:24px"></i></button>
  </div>
</template>
<script>
  import io from 'socket.io-client';
  import axios from 'axios';
  import HintSection from '../components/HintSection.vue'
  import Play from '../components/Play.vue'
  import router from '../router'

  export default {
    name: 'Game',
    components: {
      HintSection,
      Play,
    },
    data() {
      return {
        game: {},
        socket: io('/'),
        isPlayerOne: false,
        showHintsPage: true,
        showGuessesPage: false,
        otherPlayer: ''
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
        const url = `/game_api/game/${code}`;
        return axios.get(url).then(response => {
          this.game = response.data.message;
          this.isPlayerOne = localStorage.name === this.game.playerOne;
          this.otherPlayer = this.isPlayerOne ? this.game.playerTwo : this.game.playerOne;
          this.handleSocketResponse(this.game);
        });
      },
      sendHintQuestion(question) {
        this.socket.emit('ask_question', {question: question, name: localStorage.name, sessionCode: this.sessionCode});
      },
      sendHintAnswer(info) {
        const [questionId, answer] = info;
        const body = {questionId, name: localStorage.name, sessionCode: this.sessionCode, answer};
        this.socket.emit('answer_question', body);
      },
      sendGameAnswer(answer) {
        const body = {name: localStorage.name, sessionCode: this.sessionCode, answer};
        this.socket.emit('answer', body);
      },
      handleSocketResponse(session){
        this.game = session;
        if (this.playerOne === false) {
          if (this.game.correct) {
            alert(`You win!!\nThe guess word was ${this.game.answer}`);
          }
          else if(this.game.ended){
            alert(`Game session has ended`);
          }
        }
        else {
          if(this.game.ended){
            alert(`Game session has ended`);
          }
        }
      },
      logoutUser(){
        localStorage.removeItem('name');
        localStorage.removeItem('sessionCode');
        router.push({name: 'home'});
      }
    },
    mounted() {
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
      });

    }
  };
</script>

<style scoped>

</style>
