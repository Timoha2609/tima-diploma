<script setup>
import UserItem from "@/components/UserItem.vue"
import {onMounted} from "vue";
import { userHob } from '@/composables/userHob';
import { ref, computed } from 'vue'


const {HubListRemake,getHubList} = userHob()

const Listdlyaodnog=HubListRemake;

const currentIndex=ref(0);

const currentHub=computed(()=>{
  return Listdlyaodnog[currentIndex.value]
})

const pred=()=>{
  if(currentIndex.value>0){
    currentIndex.value--
  }
}

const next=()=>{
  if(currentIndex.value<Listdlyaodnog.length){
    currentIndex.value++
  }
}

console.log(currentHub)

onMounted(async()=>{
  await getHubList();
})


</script>

<template> 


        <section class="cars" v-for="hub in HubListRemake" :key='hub'> 
          <button @click="pred">Предыдущий</button>
            <UserItem :hub="hub"/>
            <button @click="next">Next</button>
            </section>    




</template>

<style scoped> 


</style>