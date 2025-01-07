<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import AssetBundles from './components/AssetBundles.vue'
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
    greeting.value = `Hello, ${loginId}`
  } 
})
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <button @click="signOut">Sign Out</button>
      <p>{{ greeting }}</p>
      <div style="display: flex; flex-direction: column; overflow-y: auto; flex: 1 1 auto; min-height: 0px; max-height: 1000x; height: 100vh">
        <AssetBundles />
      </div>
    </template>
  </authenticator>
</template>

