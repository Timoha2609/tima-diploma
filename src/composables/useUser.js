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

  // войти с помощью окна гугл
  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user

        // проверка первый ли раз он зашел
        await addUserToMainDatabase()

        // достаем данные если не первый раз
        await getFromMainDatabase()

        // добавляем в локал сторадж
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
          
          // Обновляем локальное хранилие и пользовательский объект
          user.value.favorites = userFavorites;
          await addToLocalStorage();
        }
      } catch (error) {
        console.error('Error while adding to favorites:', error);
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
  }

  watch(() => user.value, async (newValue) => {
    if (newValue) {
      await updateUserInDatabase();
    }
  });

  async function addToFavorites(favoriteId) {
    console.log('Adding favoriteId:', favoriteId);
    if (userRemake.value && userRemake.value.uid && favoriteId) {
      try {
        console.log(userRemake.value.uid)
        const userDocRef = doc(db, 'users', userRemake.value.uid);
        console.log(userDocRef);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log(userDocSnapshot.data());
        console.log('User data from Firestore:', userDocSnapshot.data());
        
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();  
          console.log('Current favorites:', userData.favorites);
          let favorites = userData.favorites || []; 
          if (!favorites.includes(favoriteId)) {
            favorites.push(favoriteId);
            console.log('Updated favorites:', favorites);
            await updateDoc(userDocRef, { favorites: favorites });
            console.log('Favorites updated successfully.');
  
            user.value.favorites = favorites;
            await addToLocalStorage();
          }
        }
      } catch (error) {
        console.error('Error while adding to favorites:', error);
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

  return {
    user,
    loading,
    googleRegister,
    addToFavorites,
    googleLogout,
    getAllUsers,
    userRemake,
    addToLocalStorage,
    getUserFromLocalStorage,
    removeFromLocalStorage,
    userList
  }
}