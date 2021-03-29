<template>
  <div :class="{'app-notification': true, [`app-notification--${color}`]: true}">
    <Gecko class="app-notification__logo"/>
    <div class="app-notification__container">
      <span class="app-notification__container__label" v-if="label">{{ label }}</span>
      <span class="app-notification__container__text">{{ text }}</span>
      <span class="app-notification__container__message" v-if="message">{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import Gecko from '@/components/Gecko.vue';

export default defineComponent({
  name: 'app-notification',
  props: {
    label: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: true,
      default: 'orange',
      validator(value: string) {
        return ['orange', 'red', 'green', 'purple', 'blue'].indexOf(value) !== -1;
      },
    },
  },
  components: {
    Gecko,
  },
});
</script>

<style lang="scss">

@import '@/style/colors.scss';

$margin_tb: 40px;
$notif_height: 85px;

.app-notification {
  $self: &;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  box-shadow: 0px 16px 16px 0px rgba(0,0,0,0.16);
  background-color: $white;
  width: max-content;
  margin: $margin_tb 0;

  &__logo {
    padding-left: 20px;
    height: 150px;
    margin-top: -40px;
    margin-bottom: -40px;
    animation-duration: 3s;
    animation-name: headWiggle;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  &__container {
    display: flex;
    flex-direction: column;
    padding: 10px 15px;

    &__label {
      color: #F99C40;
      font-size: 15pt;
      animation-duration: 1s;
      animation-name: text;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in;
      clip-path: inset(0% 100% 0% 0%);
    }

    &__text {
      animation-duration: 1s;
      animation-name: text;
      animation-delay: 1.1s;
      animation-fill-mode: forwards;
      clip-path: inset(0% 100% 0% 0%);
    }

    &__message {
      animation-duration: 1s;
      animation-name: text;
      animation-delay: 2.2s;
      animation-fill-mode: forwards;
      clip-path: inset(0% 100% 0% 0%);
      max-width: 300px;
      text-align: justify;
      font-size: 13pt;
      font-weight: 300;
    }
  }

  @keyframes text {
    from {
      clip-path: inset(0% 100% 0% 0%);
    }

    to {
      clip-path: inset(0% 0% 0% 0%);
    }
  }

  @keyframes headWiggle {
    from {
      transform: rotate(-8deg) translateX(0px);
    }

    to {
      transform: rotate(8deg) translateX(0px);
    }
  }

  &--orange {
    &__label {
      color: $orange
    }
  }

  &--blue {
    #{ $self }__logo {
      .fill-color {
        fill: $blue
      }
      .stroke-color {
        stroke: $blue;
      }
    }

    #{ $self }__container {
      &__label {
        color: $blue
      }
    }
  }

  &--red {
    #{ $self }__logo {
      .fill-color {
        fill: $red
      }
      .stroke-color {
        stroke: $red;
      }
    }

    #{ $self }__container {
      &__label {
        color: $red
      }
    }
  }

  &--purple {
    #{ $self }__logo {
      .fill-color {
        fill: $purple
      }
      .stroke-color {
        stroke: $purple;
      }
    }

    #{ $self }__container {
      &__label {
        color: $purple
      }
    }
  }

  &--green {
    #{ $self }__logo {
      .fill-color {
        fill: $green
      }
      .stroke-color {
        stroke: $green;
      }
    }

    #{ $self }__container {
      &__label {
        color: $green
      }
    }
  }
}

</style>
