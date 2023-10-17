<script setup>
import UserItem from "@/components/UserItem.vue";
import { onMounted } from "vue";
import { userHob } from '@/composables/userHob';
import { ref, computed } from 'vue';

const { HubListRemake, getHubList } = userHob();

const currentIndex = ref(0);

const currentHub = computed(() => {
  if (HubListRemake.value && HubListRemake.value.length > 0) {
    return HubListRemake.value[currentIndex.value];
  } else {
    return null;
  }
});

const pred = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const next = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    currentIndex.value++;
  }
};

let touchstartX = 0;
let touchendX = 0;
const slider = document.querySelector(".cars");

slider.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchendX < touchstartX) {
    next(); 
  }

  if (touchendX > touchstartX) {
    pred(); 
  }
}

onMounted(async () => {
  await getHubList();
});

</script>

<template> 

  <section class="cars">
    <button @click="pred">Предыдущий</button>
    <UserItem :hub="currentHub" v-if="currentHub" />
    <button @click="next">Next</button>
  </section>




</template>

<style scoped> 


</style>