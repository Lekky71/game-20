<template>
  <div class="auth-box">
    <p style=" font-size: 20px">Create Game</p>
    <form class="auth-form" id="login-form" action="#" method="post">
      <p>
        <input class="auth-input" v-model="game.name" placeholder="Name" minlength="3" required/>
        <input class="auth-input margin-top-10" v-model="game.answer" placeholder="The Game Word" minlength="3" required/>
        <input class="auth-input margin-top-10" v-model="game.hint" placeholder="Optional Hint" minlength="3"/>
        <input class="margin-top-10" style="color: white" type="submit" value="START GAME">
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
          answer: '',
          hint: ''
        },

      }
    }
  };
</script>

<style scoped>

</style>
