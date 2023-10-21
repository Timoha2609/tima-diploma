<template>
    <div>
    <section v-for="hub in hubinfavorites" :key='hub'> 
         <userViewItem :hub="hub" @click="goToHubUrl(hub.id)"/>
         <Button label="Удалить" @click="udal(hub.id)" severity="danger" raised />
    </section>    
    </div>

</template>

  
  <script setup>

  import { useUser } from '@/composables/useUser';
  import { userHob } from '@/composables/userHob';
  import {computed} from 'vue';
  import { onMounted } from "vue";
  import userViewItem from "@/components/userViewItem.vue";
  import {useRouter} from 'vue-router'
  import Button from 'primevue/button';


  const router=useRouter();
  const { HubListRemake, getHubList } = userHob();
  const { userRemake,removeFromFavorites} = useUser();


  console.log(userRemake)

  console.log(HubListRemake)

function udal(favoriteId){
    removeFromFavorites(favoriteId)
}
  
const hubinfavorites = computed(() => {
  if (HubListRemake.value && HubListRemake.value.length > 0) {
    return HubListRemake.value.filter(hub => userRemake.value.favorites.includes(hub.id));
  } else {
    return null;
  }
});

console.log(hubinfavorites);

  
  onMounted(async () => {
  await getHubList();
});

function goToHubUrl(id){
  router.push(`/user/${id}`)
}
  
  </script>

<style scoped>


</style>