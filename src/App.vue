<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import Todos from './components/Todos.vue'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import "@aws-amplify/ui-vue/styles.css";
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>()
const greeting = ref<string>("Welcome, unknown user")
const { _route, user, _signOut } = toRefs(useAuthenticator());

watch(user, (_state) => {
  const defaultMsg = "Hello, unknown user"
  greeting.value = defaultMsg
  if (user) {
    const loginId = user.value.signInDetails.loginId
    client.queries.AssetService({name: loginId}).then((resp) => {
      greeting.value = resp.data!
    })
  } 
})
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
        <h1>{{ greeting }}</h1>
        <h2>Here are your to-do's</h2>
      <Todos />
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>

