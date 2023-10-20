<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/layouts/NavbarComponents.vue'
import { useUser } from './composables/useUser'
import { onMounted } from 'vue'

const {getUserFromLocalStorage } = useUser()

onMounted(() => {
  getUserFromLocalStorage()
})

</script>

<template>
  <NavbarComponent/>
  <RouterView />


</template>

<style scoped>

</style>
