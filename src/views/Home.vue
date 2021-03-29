<template>
  <div class="home">
    <app-notifications></app-notifications>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

import AppNotifications from '@/components/Notifications.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AppNotifications,
  },
});
</script>

<style lang="scss">

</style>
