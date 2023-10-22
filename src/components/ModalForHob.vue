<template> 
    <Button label="Расскажи о себе" icon="pi pi-external-link" @click="toogleVisible" true />

    <Dialog v-model:visible="visible" modal header="Расскажи о себе" :style="{ width: '50vw' }">
        <template #default>
            <div class="p-field">
                <label for="name">Name</label>
                <InputText type="text" v-model="newHub.name" />
              </div>
            <div class="p-fluid">
              <div class="p-field">
                <label for="hobbie">Хобби</label>
                <Dropdown id="hobbie" v-model="newHub.hobbie" editable :options="HubLabel" option-label="hobbie" option-value="hobbie" placeholder="Хобби" />
              </div>
              <div class="p-field">
                <label for="adres">Адрес</label>
                <InputText type="text" v-model="newHub.adres" />
              </div>
              <div class="p-field">
                <label for="city">Город</label>
                <Dropdown id="city" v-model="newHub.city" editable :options="kazakhcity" option-label="city" option-value="city" placeholder="Город" />
              </div>
              <div class="p-field">
                <label for="about">О себе</label>
                <InputText type="about" v-model="newHub.about" />
              </div>
              <div class="p-field">
              <form class="input__wrapper" enctype="multipart/form-data">
              <input id="inputfile" class="input inputfile" name="images" type="file" accept=".jpg, .png" @input="onUpload($event)" />
              <label for="inputfile" class="inputfile-button">
              <span class="input__file-icon-wrapper">
              <img class="input__file-icon" src="@/assets/uploadImage.png" alt="Выбрать файл" width="25" />
              </span>
              <span class="input__file-button-text"> Загрузи картинку машины</span>
            </label>
              </form>
                </div>
            </div>
          </template>
     <template #footer> 
        <Button label="Сбросить" icon="pi pi-times" @click="clearHub" text> </Button>
        <Button label="Добавить" icon="pi pi-check" @click="addHub" autofocus> </Button>
    </template>
    </Dialog>
</template>

<script setup>
import { ref } from "vue";
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { userHob } from '@/composables/userHob';


const{newHub,createHub,clear,uploadImage}=userHob()

const visible = ref(false);

const toogleVisible=()=>{
    visible.value=!visible.value
}


async function onUpload(e) {
  const image = e.target.files[0]
  await uploadImage(image)
}


async function addHub(){
  await createHub()
  toogleVisible()
}

function clearHub(){
  clear()
  toogleVisible()
}



const HubLabel = [
  { hobbie: 'Футбол' },
  { hobbie: 'Шахматы' },
  { hobbie: 'Везания' },
  { hobbie: 'Настольные игры' },
  { hobbie: 'Танцы' },
  { hobbie: 'IT' },
  { hobbie: 'Догонялки' },
  { hobbie: 'Комиксы' },
  { hobbie: 'Книги' },
  { hobbie: 'Просто ищу друзей' },
]

const kazakhcity=[
  { city: 'Алматы' },
  { city: 'Астана' },
  { city: 'Шымкент' },
  { city: 'Актау' },
  { city: 'Талдыкорган' },
  { city: 'Атырау' },
]

</script>


<style scoped> 

.input__wrapper {
  width: 100%;
  position: relative;
  margin: 15px 0;
  text-align: center;
} 
.inputfile {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}



</style>    