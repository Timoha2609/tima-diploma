<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/layouts/NavbarComponents.vue'
import FooterForme from '@/components/FooterForme.vue'
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
  <FooterForme/>


</template>

<style scoped>

</style>
