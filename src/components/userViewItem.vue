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
          <p class="card-paragraph">Email: {{ hub.autor && hub.autor.email.replace('@gmail.com', '') }}</p>
          <p class="card-paragraph">Мое хобби: {{ hub.hobbie }}</p>
          <p class="card-paragraph">Адрес: {{ hub.adres }}</p>
          <p class="card-paragraph">Город: {{ hub.city }}</p>
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
  flex: 1;
  height: 100%;
  width:100%;
}

.image-container {
  width: 100%;
  max-height: 300px; 
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hub-image {
  width: 350px;
  height: 350px;
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