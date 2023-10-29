<template>
  <div class="page-container">
  </div>

    <footer class="footer">
      <div class="additional-info">
        <p>Сайт создал Karipzhanov T</p>
        <p>Mail: temirlan.k.it@gmail.com</p>
      </div>
      <div class="animation-container" @click="startAnimation">
        <span class="textforanim">We are friends forever</span>
        <span class="heart">❤️</span>
      </div>
    </footer>

  </template>
  
  <script>
  
  </script>
  
  <style scoped>  

  .page-container {
    margin-bottom: 100px; 
  }
  .footer {
    background-color: #333;
    color: red;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
  }
  
  .animation-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .textforanim {
    font-size: 18px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid transparent;
    animation: typing 1s steps(25, end), blink-caret 0.75s step-end infinite;
    margin-right: 10px;
  }
  
  .heart {
    font-size: 24px;
  }
  
  .additional-info {
    text-align: center;
    margin-top: 10px;
    color: #ccc;
  }
  
  .additional-info p {
    margin: 5px;
  }
  
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: white;
    }
  }
  
  </style>