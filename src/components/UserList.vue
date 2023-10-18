<script setup>
import UserItem from "@/components/UserItem.vue";
import { onMounted } from "vue";
import { userHob } from '@/composables/userHob';
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Swiper from 'swiper/bundle';
// import {useUser} from ///

const { HubListRemake, getHubList } = userHob();
const currentIndex = ref(0);

// const {user} = useUser()


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
    console.log(HubListRemake.value[currentIndex.value-1].id)
    // user.value.favourites.push(///)

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

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1, 
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  swiper.on('slideChange', () => {
    currentIndex.value = swiper.activeIndex; // Обновление currentIndex при перелистывании
  });




</script>

<template> 

  <section class="hob">
    <Button label="Дизлайк" @click="diz" severity="danger" raised />
    <div class="card-container">
      <UserItem :hub="currentHub" v-if="currentHub" />
    </div>
    <Button @click="like" label="Лайк" severity="success" raised />
  </section>





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