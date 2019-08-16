<template>
  <div>
    <form class="container hint-body">
      <label :class="{'col-8': isPlayerOne, 'col-10': (question.answer !== null),
       'col-12': (!isPlayerOne) && (question.answer === null)}"
             style="text-align: left">{{question.question}}</label>

      <input class="btn btn-primary col-2 hint-answer-button" type="button" value="YES"
             v-on:click="$emit('question-answered', [question.id, 'yes'])"
             :disabled="question.answer"
              v-if="(question.answer === null) && isPlayerOne">

      <input class="btn btn-primary col-2 hint-answer-button" type="button" value="NO"
             v-on:click="$emit('question-answered', [question.id, 'nope'])"
             :disabled="question.answer"
             v-if="(question.answer === null) && isPlayerOne">

      <input class="btn btn-primary hint-answer-button col-2" type="button" value="YES"
             v-if="question.answer === true" disabled>
      <input class="btn btn-primary hint-answer-button col-2" type="button" value="NO"
             disabled v-if="question.answer === false">
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Hint',
    props: {
      question: Object,
      isPlayerOne: Boolean,
    },
    data() {
      return {

      };
    },
    methods: {
      handleSelection(answer){

      },
    },
  };
</script>
