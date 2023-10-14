<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/layouts/NavbarComponents.vue'
import UserList from '@/components/UserList.vue'
</script>

<template>
  <NavbarComponent/>
  <RouterView />
  <UserList />

</template>

<style scoped>

</style>
