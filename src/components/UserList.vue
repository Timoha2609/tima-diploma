<script setup>
import UserItem from "@/components/UserItem.vue"
import {onMounted} from "vue";
import { userHob } from '@/composableshob/userHob';
const {HubListRemake,getHubList} = userHob()

onMounted(async()=>{
  await getHubList();
})


</script>

<template> 


        <section class="cars" v-for="hub in HubListRemake" :key='hub'> 
            <UserItem :hub="hub"/>
            </section>    




</template>

<style scoped> 


</style>