<script setup>
import { defineProps} from "vue";
import Card from 'primevue/card';

defineProps({
  hub: {
    type: Object,
    required: true,
  },
 
});


</script>

<template>
  <div class="hub"> 
    <card>
        <template #header> 
          <div class="image-container">
            <img :src="hub.image" alt="hub" class="hub-image" />  
          </div>
        </template>
    <template #title> 
      <h3 class="card-title">{{ hub.name }}</h3>
    </template>
    
    <template #content  >    
    <p class="card-paragraph">Hobbie: {{ hub.hobbie }}</p>
    </template>
    
</card>
</div>
</template>

<style scoped>
.hub {
  text-align: center; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.image-container {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hub-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: center center; 
}

.card-title {
  font-size: 32px; 
  font-weight: bold;
  margin: 20px 0;
  
}
.card-paragraph {
  font-size: 20px; 
  margin: 10px 0; 
}


</style>
