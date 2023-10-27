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

let nachpoz = 0;
let konechpoz = 0;

const pokazgdekos = (e) => {
  nachpoz = e.touches[0].clientX;
};

const pokazgdeotpusk = (e) => {
  konechpoz = e.changedTouches[0].clientX;
  if (konechpoz < nachpoz) {
    diz();
  } else if (konechpoz > nachpoz) {
    like();
  }
};


</script>

<template>
  <section class="hob" @touchstart="pokazgdekos" @touchend="pokazgdeotpusk">
    <div class="card-container">
      <UserItem :hub="currentHub" v-if="currentHub" />
    </div>
    <div class="action-buttons">
      <Button icon="pi pi-times" @click="diz" severity="danger" rounded outlined aria-label="Cancel" class="diz-button" />
      <Button @click="like" icon="pi pi-heart" severity="help" rounded outlined aria-label="Favorite" class="like-button" />
    </div>
    <div class="choose-button">
      <Button @click="goToUserListl" label="Мой выбор" severity="success" raised />
    </div>
  </section>
</template>

<style scoped> 
.diz-button {
  margin-right: 10px;
}

.like-button {
  margin-right: 10px; 
}

.hob {
  display: flex;
  flex-direction: column; 
  align-items: center;
}

.card-container {
  display: flex;
  justify-content: center;
}

.action-buttons {
  display: flex;
  flex-direction: row; 
  align-items: center;
  margin-bottom: 30px; 
}

.choose-button {
  display: flex;
  justify-content: center;
}
</style>