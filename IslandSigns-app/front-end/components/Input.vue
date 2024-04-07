<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  onSendMessage: Function,
});

const text = ref('');

function onChange(e) {
  const textValue = e.target.value;
  text.value = textValue;
}

function onSubmit() {
  props.onSendMessage(text.value);
  text.value = '';
}


</script>

<template>
  <div class="input">
    <form @submit.prevent="onSubmit">
      <input v-model="text" @input="onChange" />
      <button type="button" @click="onSubmit">Send</button>
    </form>
  </div>
</template>