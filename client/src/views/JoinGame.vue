<template>
  <div class="auth-box">
    <h1 style=" font-size: 20px">Join Game</h1>
    <p style=" font-size: 20px">Enter your name and the session code of the game you want to join.</p>
    <form class="auth-form" id="login-form" @submit.prevent="joinGameSession">
      <p>
        <input class="auth-input" v-model="game.sessionCode" placeholder="Game Session Code"
               minlength="3" required/>
        <input class="auth-input margin-top-10" v-model="game.name" placeholder="Your name"
               minlength="3" required/>
        <input class="auth-submit-button margin-top-10" style="color: white" type="submit" value="JOIN GAME">
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
          sessionCode: ''
        },
        socket: io('/')
      };
    },
    methods: {
      joinGameSession(e) {
        e.preventDefault();

        this.socket.emit('join', this.game);
      }
    },
    mounted() {
      this.socket.on('failure', data => {
        console.log(data);
        alert(data.error);
      });

      this.socket.on('joined_game', data => {
        const session = data.body.session;
        localStorage.sessionCode = session.sessionCode;
        localStorage.name = (data.body.isPlayerOne === true) ? session.playerOne : session.playerTwo;
        router.push({name: 'game', params: {sessionCode: session.sessionCode}});
      });

    }
  };
</script>

<style scoped>

</style>
