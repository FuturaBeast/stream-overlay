<template>
  <div class="app-notifications">
    <div
      v-for="notif in notifications"
      class="app-notifications__item"
      :key="notif.id"
      :id="`notif-${notif.id}`"
      :ref="el => assignNotification(notif, el)"
    >
      <app-notification
        v-if="notif.type === 'gecko'"
        :label="notif.label"
        :text="notif.text"
        :color="notif.color"
        :message="notif.message"
      ></app-notification>
      <app-icon-notification
        v-if="notif.type === 'icon'"
        :texts="notif.text"
        :icon="notif.icon"
        :color="notif.color"
        :duration="notif.duration"
      ></app-icon-notification>
    </div>
  </div>

</template>

<script lang="ts">
import { useStreamlabs } from '@/services/streamlabs';
import {
  Notification, messageToNotification, isNotification, IconNotification,
} from '@/services/notifications';
import {
  defineComponent, onMounted, ref,
} from 'vue';
import AppNotification from '@/components/Notification.vue';
import AppIconNotification from '@/components/IconNotification.vue';
import { v4 as uuidv4 } from 'uuid';
import { useAudio } from '@/services/audio';
import { useSocketApi } from '@/services/socket-api';
import { PlayingSong } from '@/types/SocketApi';

import anime from 'animejs';

export default defineComponent({
  name: 'Home',
  components: {
    AppNotification,
    AppIconNotification,
  },
  setup() {
    const { onEvent } = useStreamlabs();
    const { onEvent: onApiEvent } = useSocketApi();
    const { play } = useAudio();
    const notifications = ref<Notification[]>([]);

    const removeNotification = (notif: Notification) => {
      notif.status = 'ENDED';
      notifications.value.splice(notifications.value.indexOf(notif), 1);
    };

    const startNotification = (notif: Notification) => {
      if (!notif.ref) return;
      notif.status = 'STARTED';
      if (notif.sound) { play(notif.sound); }

      const child = notif.ref.children[0];
      const BOUNCE_OFFSET = 100;
      const notifWidth = child.clientWidth + BOUNCE_OFFSET;

      anime({
        targets: notif.ref,
        keyframes: [
          { translateX: [-notifWidth, 0] },
          { translateX: -notifWidth, delay: notif.duration },
        ],
        autoplay: true,
        complete: () => {
          notif.status = 'WAITING';
          removeNotification(notif);
        },
      });
    };

    const assignNotification = (notif: Notification, el: Element) => {
      notif.ref = el;
      if (notif.status === 'PENDING') { startNotification(notif); }
    };

    onEvent(({ type, message: messages }) => {
      console.log(messages);
      if (isNotification(type)) {
        messages.forEach((message) => {
          const notification = messageToNotification(message, type);
          if (notification) {
            notifications.value.push(notification);
          }
        });
      }
    });

    const newNotification = (notif: IconNotification) => {
      notif.status = 'PENDING';
      notif.id = uuidv4();
      notifications.value.push(notif);
    };

    const scheduleNotification = (notif: IconNotification, interval: number) => {
      setInterval(() => {
        newNotification(notif);
      }, interval);
    };

    onMounted(() => {
      scheduleNotification({
        type: 'icon',
        icon: ['fab', 'discord'],
        text: ['Rejoins Discord!', 'discord.futurabeast.com'],
        color: '#7289DA',
        duration: 5000,
      }, 10 * 1000 * 60);

      scheduleNotification({
        type: 'icon',
        icon: ['fab', 'youtube'],
        text: ['Youtube', 'FuturaBeast'],
        color: 'red',
        duration: 5000,
      }, 12 * 1000 * 60);
    });

    onApiEvent<PlayingSong>('new_song', ({ name, artists }) => {
      newNotification({
        type: 'icon',
        icon: ['fab', 'spotify'],
        text: ['Currently Playing', `${name} - ${artists.join(',')}`],
        color: 'green',
        duration: 5000,
      });
    });

    return { notifications, assignNotification };
  },
});
</script>

<style lang="scss">

.app-notifications {

  &__item {
    &:first-child {
      animation: move 0.2s cubic-bezier(0.215, 0.610, 0.355, 1);
    }

    @keyframes move {
      0% {margin-top: 85px + 40px * 2;}
      100% {margin: 30px 0;}
    }
  }
}

</style>
