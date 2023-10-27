
<template>

    <div class="home-page">
        <div class="content">
          <div class="intro">
            <h1>Выбери себе друга</h1>
          </div>
          <div class="action-button">
            <button @click="goTochose">Let's Start</button>
          </div>
        </div>
      </div>



</template>


<script setup>

import {useRouter} from 'vue-router'
const router=useRouter();

function goTochose(){
  router.push(`/list`)
}


 


</script>

<style scoped>
.home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .content {
    text-align: center;
  }
  
  .intro {
    margin-bottom: 20px;
  }
  
  .action-button {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
  
  button {
    padding: 10px 20px;
    font-size: 18px;
    color:red;
    cursor: pointer;
  }
  
  .text-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  textarea {
    width: 300px;
    height: 150px;
    font-size: 16px;
  }

</style>
