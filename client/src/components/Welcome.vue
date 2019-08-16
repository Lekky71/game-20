<template>
  <div class="welcome-box" id="welcome">
    <h1>Welcome<br/>to<br/>GAME-20</h1>
    <button class="welcome-button"><router-link to="/start">START GAME</router-link></button>
    <button class="welcome-button"><router-link to="/join">JOIN GAME</router-link></button>
  </div>
</template>
<script>
  import router from '../router'
  export default {
    name: 'Welcome',
    components: {},
    mounted(){
      if(localStorage.sessionCode){
        router.push({name: 'game', params: {sessionCode: localStorage.sessionCode}})
      }
    }
  };
</script>
<style scoped>
  a {
    color: white;
    text-decoration: none;
    display: block;
    width: 100%;
    padding-top: 24px;
    height: 100%;
  }
</style>
