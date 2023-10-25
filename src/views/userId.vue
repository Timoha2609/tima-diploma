<template>
  <div class="center-container">
    <div class="hub-card card-appear" v-if="Hub">
      <Card>
        <template #header>
          <img :src="Hub.image" alt="hub" class="hub-image" />
        </template>
        <template #title>
          <h3 class="card-title">{{ Hub.name }}</h3>
        </template>
        <template #content>
          <p class="card-paragraph">Email: {{ Hub.autor && Hub.autor.email }}</p>
          <p class="card-paragraph">Hobbie: {{ Hub.hobbie }}</p>
          <p class="card-paragraph">Adres {{ Hub.adres }}</p>
          <p class="card-paragraph">City {{ Hub.city }}</p>
          <p class="card-paragraph">О нем {{ Hub.about }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { userHob } from "@/composables/userHob";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Card from "primevue/card";

const { Hub, getHub } = userHob();

onMounted(async () => {
  await getHub(useRoute().params.id);
});
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.hub-card {
  animation: slideIn 0.5s ease-in-out;
  opacity: 1;
  transform: translateX(0);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hub-image {
  max-width: 100%;
}

.card-title {
  font-size: 24px;
  margin: 16px 0;
}

.card-paragraph {
  margin: 8px 0;
}
</style>