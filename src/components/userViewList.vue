<template>
  <div>
    <div class="hub-list">
      <section v-for="hub in hubinfavorites" :key='hub'> 
        <div class="hub-item">
        <userViewItem :hub="hub" @click="goToHubUrl(hub.id)"/>
        <div class="button-container">
        <Button @click="udal(hub.id)" icon="pi pi-trash" severity="help" rounded outlined aria-label="Favorite" class="delete-but" />
      </div>
      </div>
      </section>
    </div>
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
.hub-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.hub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 200px;
  margin: 0 auto;
  padding: 16px;
}


.button-container {
  display: flex;
  justify-content: flex-end;
  width: 90%;
}



</style>