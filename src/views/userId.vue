<script setup>
  import { userHob } from '@/composables/userHob';
  import { onMounted } from 'vue'
  import {useRoute } from 'vue-router'
  import Card from 'primevue/card'


  const {Hub, getHub } = userHob()
  
  onMounted(async () => {
    await getHub(useRoute().params.id)
  })

</script>

<template>
    <div class="all"> 
        <div class="hub-card" v-if="Hub">
          <Card>
            <template #header >
              <img :src="Hub.image" alt="hub" class="hub-image"/>
            </template>
            <template #title>
              <h3 class="card-title">{{ Hub.name }}</h3>
            </template>
            <template #content>
              <p class="card-paragraph">Email: {{ Hub.autor && Hub.autor.email }}</p>
              <p class="card-paragraph">Hobbie: {{ Hub.hobbie }}</p>
              <p class="card-paragraph">Adres {{ Hub.adres }}</p>
              <p class="card-paragraph">City {{ Hub.city }}</p>
            </template>
          </Card>
        </div>
      </div>
</template>
