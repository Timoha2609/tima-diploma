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

const animationClass = ref('');


const like = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    currentIndex.value++;
    const favoriteid=HubListRemake.value[currentIndex.value-1].id
    console.log(favoriteid)
    if (favoriteid) {
      addToFavorites(favoriteid); 
      setAnimationClass('flip-left');
    }

  }
  else{
    currentIndex.value=0
    setAnimationClass('flip-left');
  }

};

const diz = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    currentIndex.value++;
    setAnimationClass('flip-right');
  }
  else{
    currentIndex.value=0
    setAnimationClass('flip-right');  
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

function setAnimationClass(className) {
  animationClass.value = className
  setTimeout(() => {
    animationClass.value = '';
  }, 2000);
}


</script>

<template>
  <section class="hob" @touchstart="pokazgdekos" @touchend="pokazgdeotpusk">
    <div class="card-container" :class="animationClass">
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

.flip-left {
  animation: flip-left-animation 1s ease-in-out;
}

.flip-right {
  animation: flip-right-animation 1s ease-in-out;
}



@keyframes flip-left-animation {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(200px) translateY(200px) rotateZ(30deg);
    opacity: 1;
  }
}

@keyframes flip-right-animation {
  0% {
    transform: translateX(0) translateY(0);;
    opacity: 1;
  }
  100% {
    transform: translateX(-200px) translateY(200px) rotateZ(-30deg);;
    opacity: 1;
  }
}


</style>