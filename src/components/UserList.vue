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
  setAnimationClass('flip-left');
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    setTimeout(() => {
    currentIndex.value++;
    const favoriteid=HubListRemake.value[currentIndex.value-1].id
    console.log(favoriteid)
    if (favoriteid) {
      addToFavorites(favoriteid); 
    }
  }, 200);
  }
  else{
    setAnimationClass('flip-left');
    setTimeout(() => {
      const favoriteid = HubListRemake.value[currentIndex.value].id;
      if (favoriteid) {
      addToFavorites(favoriteid);
    }
      currentIndex.value=0
  }, 200);
  }

};

const diz = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    setAnimationClass('flip-right');
    setTimeout(() => {
      currentIndex.value++;
  }, 200);

  }
  else{
    setAnimationClass('flip-right');  
    setTimeout(() => {
      currentIndex.value=0
  }, 200);
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
  }, 1000);
}


</script>

<template>
  <section class="hob">
    <div class="card-container" :class="animationClass"  @touchstart="pokazgdekos" @touchend="pokazgdeotpusk">
      <UserItem :hub="currentHub" v-if="currentHub" />
      <div class="action-buttons">
        <Button icon="pi pi-times" @click="diz" severity="danger" rounded outlined aria-label="Cancel" class="diz-button" />
        <Button @click="goToUserListl" label="Мой выбор" severity="success" raised class="choose" />
        <Button @click="like" icon="pi pi-heart" severity="help" rounded outlined aria-label="Favorite" class="like-button" />     
      </div>
    </div>
  </section>
</template>

<style scoped> 
.diz-button {
  margin-left: 20px;
  transform: scale(1.2);

}

.like-button {
  margin-right: 20px; 
  transform: scale(1.2);
}

.hob {
  display: flex;
  flex-direction: column; 
  align-items: space-evenly;
  height: 100%;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  position: relative; 
  height: 80vh;
  padding: 10px 8px;
}

.action-buttons {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 0 20px;
}

.flip-left {
  animation: flip-left-animation 1s ease-in-out;
}

.flip-right {
  animation: flip-right-animation 1s ease-in-out;
}



@keyframes flip-left-animation {
  0%, 100% {
    transform: translateX(0) translateY(0) rotateZ(0);
    opacity: 1;
  }
  50% {
    transform: translateX(300px) translateY(200px) rotateZ(30deg);
    opacity: 1;
  }
}

@keyframes flip-right-animation {
  0%, 100% {
    transform: translateX(0) translateY(0) rotateZ(0);
    opacity: 1;
  }
  50% {
    transform: translateX(-300px) translateY(200px) rotateZ(-30deg);
    opacity: 1;
  }
}

.choose{
  padding: 7px 25px;
  font-size: 15px;
  
}

</style>