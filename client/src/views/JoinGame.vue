<template>
  <div class="auth-box">
    <h1 style=" font-size: 20px">Join Game</h1>
    <p style=" font-size: 20px">Enter your name and the session code of the game you want to join.</p>
    <form class="auth-form" id="login-form" @submit.prevent="joinGameSession">
      <p>
        <input class="auth-input" v-model="game.sessionCode" placeholder="Game Session Code"
               minlength="3" required/>
        <input class="auth-input margin-top-10" v-model="game.name" placeholder="Name"
               minlength="3" required/>
        <input class="margin-top-10" style="color: white" type="submit" value="JOIN GAME">
      </p>
    </form>
  </div>
</template>
<script>
  import io from 'socket.io-client';

  export default {
    name: 'CreateGame',
    data() {
      return {
        game: {
          name: '',
          sessionCode: ''
        },
        socket: io('localhost:3000')
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
        console.log("failure");
        console.log(data);
        alert(data.error);
      });

      this.socket.on('joined_game', data => {
        console.log("success");
        console.log(data.body);
        alert(data.body);
      });

    }
  };
</script>

<style scoped>

</style>
