<template>
    <div class="all"> 
      <div class="hub-card">
        <Card>
          <template #header >
            <img :src="hub.image" alt="hub" class="hub-image"/>
          </template>
          <template #title>
            <h3 class="card-title">{{ hub.name }}</h3>
          </template>
          <template #content>
            <p class="card-paragraph">Email: {{ hub.autor && hub.autor.email }}</p>
            <p class="card-paragraph">Hobbie: {{ hub.hobbie }}</p>
            <p class="card-paragraph">Adres {{ hub.adres }}</p>
            <p class="card-paragraph">City {{ hub.city }}</p>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
  <script setup>
  import Card from 'primevue/card';
  import { defineProps} from "vue";

  defineProps({
  hub: {
    type: Object,
    required: true,
  },
 
});

  
</script>

<style>

.all{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px; 
}
.hub-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px; 
  }
  
  .hub-image {
    width: 150px; 
    height: 150px; 
  }
  
  .card-title {
    font-size: 16px;
    font-weight: bold;
  }
  
  .card-paragraph {
    font-size: 14px;
    margin: 5px 0;
  }
</style>