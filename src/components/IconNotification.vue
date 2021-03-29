<template>
  <div :class="{'app-icon-notification': true, [`app-icon-notification--${color}`]: isColor}">
    <font-awesome-icon
      :icon="icon"
      class="app-icon-notification__icon"
      :style="{ ...(!isColor ? {color: color} : {}) }"
    ></font-awesome-icon>
    <span class="app-icon-notification__text" ref="textRef">{{ currentText }}</span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, PropType, ref,
} from 'vue';
import anime from 'animejs';

export default defineComponent({
  name: 'app-icon-notification',
  props: {
    texts: {
      type: Object as PropType<string[]>,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    icon: {
      type: Object as PropType<string[]>,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: 'orange',
    },
  },
  setup(props) {
    const step = ref(0);
    const currentText = ref<string | null>(null);
    const textRef = ref(null);
    const isColor = ref(['orange', 'red', 'green', 'purple', 'blue'].indexOf(props.color) !== -1);

    onMounted(() => {
      currentText.value = props.texts[step.value];
      const interval = (props.duration - 500 * props.texts.length) / (props.texts.length);

      anime({
        targets: textRef.value,
        'clip-path': ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
        easing: 'linear',
        loop: props.texts.length,
        endDelay: interval,
        loopBegin: () => {
          currentText.value = props.texts[step.value];
          step.value += 1;
        },
        duration: 500,
        autoplay: true,
      });
    });

    return { currentText, textRef, isColor };
  },
});
</script>

<style lang="scss">

@import '@/style/colors.scss';

$margin_tb: 30px;
$notif_height: 85px;

.app-icon-notification {
  $self: &;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  box-shadow: 0px 16px 16px 0px rgba(0,0,0,0.16);
  background-color: $white;
  width: max-content;
  margin: $margin_tb 0;
  height: 85px;
  min-width: 325px;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  transition: all 1s linear;
  gap: 15px;

  &__icon {
    font-size: 25pt;
  }

  &__text {
     white-space: nowrap;
     text-align: center;
  }

  &--orange {
    #{ $self }__icon {
      color: $orange
    }
  }

  &--blue {
    #{ $self }__icon {
      color: $blue
    }
  }

  &--red {
    #{ $self }__icon {
      color: $red
    }
  }

  &--purple {
    #{ $self }__icon {
      color: $purple
    }

  }

  &--green {
    #{ $self }__icon {
      color: $green
    }
  }
}

</style>
