<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  member: Object,
  me: Object,
  data: String,
  id: String,
});

const { username, color } = props.member.clientData;
const messageFromMe = props.member.id === props.me.id;
const className = messageFromMe
  ? "messagesMessage currentMember"
  : "messagesMessage";






</script>

<template>
  <br>
    <li :key="id" :class="className">
      <span class="avatar" :style="{ backgroundColor: color }" />
      <div class="messageContent">
        <div class="username">{{ username }}</div>
        <div class="text">{{ data }}</div>
      </div>
    </li>
  <br>
  </template>

<style>

.messagesMessage {
  display: flex; /* Remove this line */
  margin-top: 10px;
}

.messagesMessage.currentMember {
  flex-direction: row-reverse;
  text-align: right;
}



</style>