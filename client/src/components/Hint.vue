<template>
  <div class="container">
    <form class="container hint-body">
      <label class="col-8">{{question.question}}</label>
      <input class="btn btn-primary col-2 hint-answer-button" type="button" value="YES"
             v-on:click="$emit('question-answered', [question.id, 'yes'])" :disabled="question.answer">
      <input class="btn btn-primary col-2 hint-answer-button" type="button" value="NO"
             v-on:click="$emit('question-answered', [question.id, 'nope'])" :disabled="question.answer">
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Hint',
    props: {
      question: Object,
    },
    data() {
      return {

      };
    }
  };
</script>
