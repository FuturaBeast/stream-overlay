<template>
  <router-view/>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onUnmounted,
} from 'vue';
import { useStreamlabs } from './services/streamlabs';
import { useAudio } from './services/audio';
import { useSocketApi } from './services/socket-api';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const { connect, disconnect } = useStreamlabs();
    const { connect: connectApi, disconnect: disconnectApi } = useSocketApi();
    const { init, onLoaded } = useAudio();

    onMounted(() => {
      connect();
      connectApi();
      init();
    });

    onLoaded((result) => {
      console.log(result);
    });

    onUnmounted(() => {
      disconnect();
      disconnectApi();
    });
  },
});
</script>

<style lang="scss">

body {
  //background-color: gray;
  font-family: 'Poppins';
  font-size: 20px;
  font-weight: 600;
}

</style>
