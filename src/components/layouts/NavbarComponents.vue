<template>
  <div class="card relative z-2">
    <Menubar :model="items">
      <template #item="{ label, item, props, root, hasSubmenu }">
        <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
          <a :href="routerProps.href" v-bind="props.action">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ label }}</span>
          <span
            :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]"
            v-bind="props.submenuicon"
          />
        </a>
      </template>
      <template #end>
        <ModalForHob />
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { useUser } from '@/composables/useUser'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import ModalForHob from '@/components/ModalForHob.vue'

const { googleRegister, googleLogout } = useUser()

const items = ref([
  {
    label: 'home',
    icon: 'pi pi-eject',
    route: '/'
  },
  {
    label: 'Users',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'Зайти',
        icon: 'pi pi-fw pi-user-plus',
        command: () => {
          googleRegister()
        }
      },
      {
        label: 'Выйти',
        icon: 'pi-sign-out',
        command: () => {
          googleLogout()
        }
      }
    ]
  },
  {
    label: 'Выбирай',
    icon: 'pi pi-android',
    route: '/list'
  }
])
</script>

<style scoped>
:deep(.p-menubar) {
 justify-content: space-between !important;
 margin: 0 1.5rem;
}
</style>


<!-- Когда ты лайкаешь -->
<!-- stateLikes -->
<!-- добавляешь айди того кого он лайнкул в user.favourires -->
<!-- put запрос чтобы он перезаписал в юзере поле favourites -->
<!-- страница любимых -->
<!-- гетЮзер -->
<!-- гетМаяФаворитс и favouritesList -->
<!-- рисуешь на странице -->