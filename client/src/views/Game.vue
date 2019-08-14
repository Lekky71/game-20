<template>
  <div class="row" style="padding-top: 10px;">
    <div class="col-6">Hints</div>
    <div class="col-6">Plays</div>
    <div class="col-sm-6" id="one">
      <HintSection :game="game" v-on:question-asked="sendHintQuestion" v-on:question-answered="sendHintAnswer"/>
    </div>
    <div class="col-sm-6" id="two">Right side div</div>
  </div>
</template>
<script>
  import io from 'socket.io-client';
  import axios from 'axios';
  import HintSection from '../components/HintSection.vue'

  export default {
    name: 'Game',
    components: {HintSection},
    data() {
      return {
        game: {},
        socket: io('localhost:3000')
      };
    },
    props: ['sessionCode'],
    methods: {
      createGameSession(e) {
        e.preventDefault();

        this.socket.emit('start', this.game);
      },
      getGameByCode(code) {
        const url = `http://127.0.0.1:3000/game_api/game/${code}`;
        return axios.get(url).then(response => {
          console.log(response);
          this.game = response.data.message;
        });
      },
      sendHintQuestion(question) {
        this.socket.emit('ask_question', { question: question, name: localStorage.name, sessionCode: this.sessionCode });
      },
      sendHintAnswer(info) {
        const [ questionId, answer ] = info;
        const body = { questionId, name: localStorage.name, sessionCode: this.sessionCode, answer };
        console.log(body);
        this.socket.emit('answer_question', body);
      }
    },
    mounted() {
      console.log(this.sessionCode);
      this.getGameByCode(this.sessionCode);

      this.socket.on('failure', data => {
        console.log("failure");
        console.log(data);
        alert(data.body);
      });

      this.socket.on('hint_question_received', data => {
        console.log("hint_question_received");
        console.log(data.body);
        this.game = data.body;
      });

      this.socket.on('hint_answer_received', data => {
        console.log("hint_answer_received");
        console.log(data.body);
        this.game = data.body;
      });

    }
  };
</script>

<style scoped>

</style>
