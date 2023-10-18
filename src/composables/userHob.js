import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { getStorage, uploadBytes} from 'firebase/storage'
import { ref,computed} from 'vue'
import {createId} from '@/services/methods'
import * as firebase from 'firebase/storage'
import { useUser } from '@/composables/useUser';


export const userHob = () => {

  const newHub = ref({
    id:createId(),
    name: '',
    hobbie: '',
    adres: '',
    autor: '',
    city: '',
    favorites:[],
    image: null,
  })

  const HubList = ref([])
  const Hub = ref({})

  const loading = ref({
    Hub: false,
    HubList: false,
    newHub: false,
  })

const HubListRemake=computed(()=>{
  const _HubListRemake=HubList.value.map((Hub)=>{
    Hub.city=`${Hub.city} г.`
    return Hub
  })
  return _HubListRemake || []
})

  async function createHub() {
    const {userRemake}=useUser();
    try {
      loading.value.newHub = true;
      newHub.value.autor=userRemake.value
      await addDoc(collection(db, 'hobbies'), newHub.value).then(async () => {
      await getHubList()
      })
    } catch (e) {
      console.error(e)
    }
  }




  async function getHubList() {
    loading.value.HubList = true
    try {
      const querySnapshot = await getDocs(collection(db, 'hobbies'))
      querySnapshot.forEach((doc) => {
        HubList.value.push(doc.data())
      })
    } catch (e) {
      console.error('Error: ', e)
    } finally {
      loading.value.HubList = false
    }
  }

  async function getHub(id){
    loading.value.Hub=true
    try{
      const querySnapshot=await getDocs(collection(db,'hobbies'))
      querySnapshot.forEach((doc)=>{
        if(doc.data().id===id){
          Hub.value=doc.data()
        }
      })
    }
    catch(e){
      console.log('Error',e)
    }
    finally{
      loading.value.Hub=false
    }
  }

  async function uploadImage(file) {
    console.log(file)
    const storage = getStorage()
    console.log(storage)
    const storageRef = firebase.ref(storage, 'hobbies/' + file.name)
    console.log(storageRef)

    uploadBytes(storageRef, file)
      .then(() => {
        console.log('Файл успешно загружен!')

      firebase
        .getDownloadURL(storageRef)
          .then((downloadURL) => {
            newHub.value.image = downloadURL
          })
          .catch((error) => {
            console.error('Ошибка получения ссылки на загруженный файл:', error)
          })
      })
      .catch((error) => {
        console.error('Ошибка загрузки файла:', error)
      })
  }
  
  function clear() {
    newHub.value = {
      id:'',
      name: '',
      hobbie: '',
      adres: '',
      autor: '',
      city: '',
      favorites:[],
      image: null,
    }
    HubList.value = []
    Hub.value = null
  }


  return {
    createHub,
    getHubList,
    Hub,
    getHub,
    HubListRemake,
    loading,
    newHub,
    clear,
    uploadImage
  }
}
