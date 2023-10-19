import { collection, getDocs, addDoc,doc,getDoc,setDoc,updateDoc} from 'firebase/firestore'
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
        getFromMainDatabase()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true
    try {
      if (userRemake.value) {
        await getAllUsers()
        if (!checkUserInDatabase()) {
          await addDoc(collection(db, 'users'), userRemake.value)
        } else {
          console.error('User already in database')
        }
      }
      loading.value.user = false
    } catch (error) {
      console.error(error)
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

  function checkUserInDatabase() {
    return userList.value.some((item) => item.uid === userRemake.value?.uid)
  }

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
    if (userRemake.value && favoriteId) {
      try {
        const userDocRef = doc(db, 'users', user.value.uid);
        const userDocSnapshot = await getDoc(userDocRef);
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
          }
        }
      } catch (error) {
        console.error('Error while adding to favorites:', error);
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
    userList
  }
}