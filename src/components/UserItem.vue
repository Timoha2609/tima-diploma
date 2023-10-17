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
            <img :src="hub.image" alt="hub" class="hub-image" />
        </template>
    <template #title> 
      <h3 class="card-title">{{ hub.name }}</h3>
    </template>
    
    <template #content  >    
    <p class="card-paragraph">Email: {{ hub.autor && hub.autor.email }}</p>
    <p class="card-paragraph">Hobbie: {{ hub.hobbie }}</p>
    <p class="card-paragraph">Adres {{ hub.adres}}</p>
    <p class="card-paragraph">City {{ hub.city}}</p>
    </template>
</card>
</div>
</template>

<style scoped>
.hub {
  text-align: center; 
}

.hub-image {
  max-width: 190px; 
  width: 100%; 
  margin: 0 auto;
  display: block;
}

.card-title {
  font-size: 24px; 
  font-weight: bold; 
  margin: 20px 0; 
  
}
.card-paragraph {
  font-size: 16px;
  margin: 5px 0;
}



</style>
