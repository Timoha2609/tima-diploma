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



const like = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    currentIndex.value++;
  }
};

const diz = () => {
  if (currentIndex.value < (HubListRemake.value.length - 1)) {
    currentIndex.value++;
  }
};


onMounted(async () => {
  await getHubList();

});

</script>

<template> 

  <section class="hob">
    <button @click="diz">Дизлайк</button>
    <div class="card-container">
      <UserItem :hub="currentHub" v-if="currentHub" />
    </div>
    <button @click="like">Лайк</button>

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