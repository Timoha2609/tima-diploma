<script setup>
import UserItem from "@/components/UserItem.vue";
import { onMounted } from "vue";
import { userHob } from '@/composables/userHob';
import { ref, computed } from 'vue';

const { HubListRemake, getHubList } = userHob();
const currentIndex = ref(0);
const currentTouchStartX = ref(null);

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

const onTouchStart = (event) => {
  currentTouchStartX.value = event.touches[0].clientX;
};

const onTouchMove = (event) => {
  if (currentTouchStartX.value !== null) {
    const deltaX = event.touches[0].clientX - currentTouchStartX.value;
    if (deltaX > 50) { 
      pred();
    } else if (deltaX < -50) { 
      next();
    }
  }
};

const onTouchEnd = () => {
  currentTouchStartX.value = null;
};



onMounted(async () => {
  await getHubList();

});

</script>

<template> 

  <section class="cars">
    <button @click="pred">Предыдущий</button>
    <UserItem :hub="currentHub" v-if="currentHub" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"  />
    <button @click="next">Next</button>

  </section>




</template>

<style scoped> 


</style>