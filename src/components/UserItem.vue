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
    <template #title> {{ hub.name }}</template>
    
    <template #content>    
    <p>Email: {{ hub.autor && hub.autor.email }}</p>
    <p>Hobbie: {{ hub.hobbie }}</p>
    <p>Adres {{ hub.adres}}</p>
    <p>City {{ hub.city}}</p>
    </template>
</card>
</div>
</template>

<style scoped>
.hub-image{
  max-width: 190px;
}



</style>
