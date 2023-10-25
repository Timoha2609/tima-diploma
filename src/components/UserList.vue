<script setup>
import UserItem from "@/components/UserItem.vue";
import { onMounted } from "vue";
import { userHob } from '@/composables/userHob';
import {useRouter} from 'vue-router'
import { ref, computed } from 'vue';
import Button from 'primevue/button';

import { useUser } from '@/composables/useUser';
const router=useRouter();


const { HubListRemake, getHubList } = userHob();
const currentIndex = ref(0);

const { addToFavorites} = useUser() 


const currentHub = computed(() => {
  if (HubListRemake.value && HubListRemake.value.length > 0) {
    return HubListRemake.value[currentIndex.value];
  } else {
    return null;
  }
});



const like = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    currentIndex.value++;
    const favoriteid=HubListRemake.value[currentIndex.value-1].id
    console.log(favoriteid)
    if (favoriteid) {
      addToFavorites(favoriteid); 
    }

  }
  else{
    currentIndex.value=0
  }
};

const diz = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    currentIndex.value++;
  }
  else{
    currentIndex.value=0
  }
};


onMounted(async () => {
  await getHubList();

});

function goToUserListl(){
  router.push(`/user`)
}

let touchStartX = 0;
let touchEndX = 0;

const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

const onTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].clientX;
  if (touchEndX < touchStartX) {

    diz();
  } else if (touchEndX > touchStartX) {
  
    like();
  }
};


</script>

<template> 

  <section class="hob"  @touchstart="onTouchStart" @touchend="onTouchEnd">
    <Button icon="pi pi-times" @click="diz" severity="danger" rounded outlined aria-label="Cancel" />
    <div class="card-container">
      <UserItem :hub="currentHub" v-if="currentHub" />
    </div>
    <Button @click="like"  icon="pi pi-heart" severity="help" rounded outlined aria-label="Favorite" />
  </section>


  <Button @click="goToUserListl" label="Мой выбор" severity="success" raised />


</template>

<style scoped> 
.hob{
  display: flex;
  justify-content: space-between; 
  align-items: center; 
}

.card-container {
  display: flex;
  justify-content: center; 
}
</style>