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



onMounted(async () => {
  await getHubList();

});

</script>

<template> 

  <section class="cars">
    <div v-touch:swipe.left="next" v-touch:swipe.right="pred">
    <button @click="pred">Предыдущий</button>
    <UserItem :hub="currentHub" v-if="currentHub" />
    <button @click="next">Next</button>
    </div>
  </section>




</template>

<style scoped> 


</style>