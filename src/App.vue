<script setup lang="ts">

// import { onMounted } from 'vue';
// import { useConnect } from '@/stores/storeConnect'

import ContainerMain from './components/ContainerMain.vue';
import NavigationMenu from './components/NavigationMenu.vue';

// const storeConnect = useConnect()
// onMounted(() => {
//   storeConnect.getAPY();
//   storeConnect.getTVL();
//   storeConnect.getAllowance();
// })


</script>

<template>
  <NavigationMenu />
  <ContainerMain />
  <!-- <button @click="storeConnect.getAPY()">НАЖАТЬ getAPY</button>
  <button @click="storeConnect.getTVL()">НАЖАТЬ getTVL</button> -->

</template>

<style scoped>

</style>
