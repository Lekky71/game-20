<template>
  <div class="auth-box">
    <p style=" font-size: 20px">Create Game</p>
    <form class="auth-form" id="login-form" action="#" method="post">
      <p>
        <input class="auth-input" v-model="game.sessionCode" placeholder="Game Session Code" minlength="3" required/>
        <input class="auth-input margin-top-10" v-model="game.name" placeholder="Name" minlength="3" required/>
        <input class="margin-top-10" style="color: white" type="submit" value="JOIN GAME">
      </p>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'CreateGame',
    data() {
      return {
        game: {
          name: '',
          sessionCode: '',
          hint: ''
        },

      }
    }
  };
</script>

<style scoped>

</style>
