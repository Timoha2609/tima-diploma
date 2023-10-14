import { collection, query, where, getDocs, addDoc  } from 'firebase/firestore'
import { db} from '@/firebase'
import { ref, computed } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut} from 'firebase/auth'

export const useUser = () => {
  const user = ref()

  const loading = ref({
    user: false
  })

  const auth = getAuth()

  const userRemake = computed(() => {
    if (user.value) {
      return {
        displayName: user.value.displayName,
        email: user.value.email,
        photoURL: user.value.photoURL,
        uid: user.value.uid
      }
    }
    return null
  })

  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user
        await addUserToMainDatabase()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true
    const email = userRemake.value.email;
    const check = await getDocs(query(collection(db, 'users'), where('email', '==', email)));
    try {
      if (check.size===0) {
        await addDoc(collection(db, 'users'), userRemake.value)
        console.log('Пользователь успешно добавлен');
      }
      else {
        console.log('Пользователь с таким email уже зарегистрирован');
      }
      loading.value.user = false
    } catch (error) {
      console.error(error)
    }
  }

  function googleLogout() {
    try {
      signOut(auth).then(() => {
        user.value = null;
        console.log("вышли")
      }).catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  }
  return {
    user,
    loading,
    googleRegister,
    googleLogout
  }
}