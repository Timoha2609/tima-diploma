<template>
  <div class="center-container">
    <div class="hub-card card-appear" v-if="Hub">
      <div class="hub-image-container">
        <img :src="Hub.image" alt="hub" class="hub-image" />
      </div>
      <div class="hub-description">
        <h3 class="card-title">{{ Hub.name }}</h3>
        <p class="card-paragraph">Email:  {{ Hub.autor && Hub.autor.email.replace('@gmail.com', '') }}</p>
        <p class="card-paragraph">Мое хобби: {{ Hub.hobbie }}</p>
        <p class="card-paragraph">Мой адрес: {{ Hub.adres }}</p>
        <p class="card-paragraph">Мой город: {{ Hub.city }}</p>
        <p class="card-paragraph">Обо мне: {{ Hub.about }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userHob } from "@/composables/userHob";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

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
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  text-align: center;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hub-image-container {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
}

.hub-image {
  width: 100%;
  height: auto;
  max-width: 100%;
}

.hub-description {
  padding: 16px;
  text-align: center;
  font-size: 18px;
}

.card-title {
  font-size: 24px;
  margin: 16px 0;
}

.card-paragraph {
  margin: 8px 0;
}
</style>