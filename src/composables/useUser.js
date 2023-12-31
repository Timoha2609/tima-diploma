import { collection, getDocs,doc,getDoc,setDoc,updateDoc} from 'firebase/firestore'
import {db} from '@/firebase'
import { ref, computed, watch } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const user = ref()
const userList = ref([])

const loading = ref({
  user: false,
  userList: false
})

const userRemake = computed(() => {
  if (user.value) {
    return {
      uid: user.value.uid,
      email: user.value.email,
      favorites:user.value.favorites ? user.value.favorites : [],   
    }
  }
  return null
})

export const useUser = () => {
  const auth = getAuth()


  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user

      
        await addUserToMainDatabase()

      
        await getFromMainDatabase()

       
        addToLocalStorage()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true;
    try {
      if (userRemake.value) {
        const docRef = doc(db, 'users', userRemake.value.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, userRemake.value);
        } else {
          console.error('User already in database');
        }
        if (userRemake.value.favorites) {
          await updateFavorites(userRemake.value.favorites);
        }
        loading.value.user = false;
      } 
    }
    catch (error) {
      console.error(error);
    }
  }
  
  async function updateFavorites(favorites) {
    if (userRemake.value && userRemake.value.uid && favorites) {
      try {
        const userDocRef = doc(db, 'users', userRemake.value.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          let userFavorites = userData.favorites || [];
          
          for (const favoriteId of favorites) {
            if (!userFavorites.includes(favoriteId)) {
              userFavorites.push(favoriteId);
            }
          }
          
          await updateDoc(userDocRef, { favorites: userFavorites });
        
          user.value.favorites = userFavorites;
          await addToLocalStorage();
        }
      } catch (error) {
        console.error('Проблема в обновление фаворитов', error);
      }
    }
  }

  async function getAllUsers() {
    loading.value.userList = true
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        userList.value.push(doc.data())
      })
      loading.value.userList = false
    } catch (error) {
      console.error(error)
    }
  }

  // function checkUserInDatabase() {
  //   return userList.value.some((item) => item.uid === userRemake.value?.uid)
  // }

  async function getFromMainDatabase() {
    await getAllUsers()
    user.value = userList.value.find((item) => item.uid === userRemake.value?.uid)
  }

  async function updateUserInDatabase() {
    if (user.value) {
      try {
        const userDocRef = doc(db, 'users', user.value.uid);
        const existingUserDoc = await getDoc(userDocRef);
        if (existingUserDoc.exists()) {
          const userData = existingUserDoc.data();
          const updatedData = {
            ...userData,
            ...userRemake.value, 
          };
          await setDoc(userDocRef, updatedData);
          await addToLocalStorage()
     
        }
      } catch (error) {
        console.error(error);
      }
    }
    
  }

  function googleLogout() {
    auth.signOut()
    user.value = null
    removeFromLocalStorage()
  }

  watch(() => user.value, async (newValue) => {
    if (newValue) {
      await updateUserInDatabase();
    }
  });

  async function addToFavorites(favoriteId) {
    console.log('Добалвение фаворита', favoriteId);
    if (userRemake.value && userRemake.value.uid && favoriteId) {
      try {
        console.log(userRemake.value.uid)
        const userDocRef = doc(db, 'users', userRemake.value.uid);
        console.log(userDocRef);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log(userDocSnapshot.data());
        console.log('Куда добавлять', userDocSnapshot.data());
        
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();  
          console.log('Текущий favorit', userData.favorites);
          let favorites = userData.favorites || []; 
          if (!favorites.includes(favoriteId)) {
            favorites.push(favoriteId);
            console.log('Обновленные фавориты', favorites);
            await updateDoc(userDocRef, { favorites: favorites });
            console.log('Все прошло успешно');
  
            user.value.favorites = favorites;
            await addToLocalStorage();
          }
        }
      } catch (error) {
        console.error('У тебя ошибка в добавлен фаворитов', error);
      }
    }
  }  

async function addToLocalStorage() {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  watch(() => user.value, () => {
    addToLocalStorage(); 
  });

function getUserFromLocalStorage() {
    const userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage) {
      user.value = JSON.parse(userFromLocalStorage)
    }
  }

  watch(getUserFromLocalStorage, (newUser) => {
    if (newUser) {
      user.value = newUser;
    }
  });

  function removeFromLocalStorage() {
    localStorage.removeItem('user')
  }

  async function removeFromFavorites(favoriteId) {
    if (userRemake.value && userRemake.value.favorites) {
      const index = userRemake.value.favorites.indexOf(favoriteId);
      if (index !== -1) {
        userRemake.value.favorites.splice(index, 1);
        try {
          const userDocRef = doc(db, 'users', userRemake.value.uid);
          await updateDoc(userDocRef, { favorites: userRemake.value.favorites });
          await addToLocalStorage();
        } catch (error) {
          console.error('Проблема в удаление фаворитов', error);
        }
      }
    }
  }


  return {
    user,
    loading,
    googleRegister,
    addToFavorites,
    googleLogout,
    getAllUsers,
    userRemake,
    removeFromFavorites,
    addToLocalStorage,
    getUserFromLocalStorage,
    removeFromLocalStorage,
    userList
  }
}