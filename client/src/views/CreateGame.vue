<template>
  <div class="auth-box">
    <p style=" font-size: 20px">Create Game</p>
    <form class="auth-form" @submit.prevent="createGameSession">
      <p>
        <input class="auth-input" v-model="game.name" placeholder="Your name" minlength="3" required/>
        <input class="auth-input margin-top-10" v-model="game.answer" placeholder="The Game Word"
               minlength="3"
               required/>
        <input class="auth-input margin-top-10" v-model="game.hint" placeholder="Optional Hint"
               minlength="3"/>
        <input class="auth-submit-button margin-top-10" style="color: white" type="submit" value="START GAME">
      </p>
    </form>
  </div>
</template>
<script>
  import io from 'socket.io-client';
  import router from '../router'

  export default {
    name: 'CreateGame',
    data() {
      return {
        game: {
          name: '',
          answer: '',
          hint: ''
        },
        socket: io('/')
      };
    },
    methods: {
      createGameSession(e) {
        e.preventDefault();

        this.socket.emit('start', this.game);
      }
    },
    mounted() {
      this.socket.on('failure', data => {
        console.log("failure");
        console.log(data);
        alert(data.body);
      });

      this.socket.on('started_game', data => {
        console.log("success");
        const session = data.body;
        localStorage.sessionCode = session.sessionCode;

        localStorage.name = session.playerOne;
        router.push({name: 'game', params: {sessionCode: session.sessionCode}});
      });

    }
  };
</script>

<style scoped>

</style>
