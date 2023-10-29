<template>
  <div class="all"> 
    <div class="hub-card">
      <Card>
        <template #header >
          <div class="image-container">
            <img :src="hub.image" alt="hub" class="hub-image" />
          </div>
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

<style scoped>
.all {
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
  max-height: 300px;
  flex: 1;
}

.image-container {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hub-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  padding: 0;
  border: none;
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