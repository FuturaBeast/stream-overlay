import { reactive, toRefs } from 'vue';
import { Howl, Howler } from 'howler';

export interface AudioState {
  audioSources: {[key: string]: Howl};
  loadedCb?: ((result: boolean[]) => void) | undefined;
}

export class AudioRegistry {
  notificationDefault = '/audio/notification_sound.mp3';
}

const state = reactive<AudioState>({
  audioSources: {},
});

function init() {
  Howler.autoUnlock = false;
  const registry = new AudioRegistry();
  Promise.all(
    Object.keys(registry)
      .map((key) => new Promise((resolve, reject) => {
        state.audioSources[key] = new Howl({
          src: [(registry as any)[key]],
          onload() { resolve(true); },
          onloaderror() { resolve(false); },
          autoplay: false,
          preload: true,
        });
      }) as Promise<boolean>),
  ).then((result: boolean[]) => {
    if (state.loadedCb) { state.loadedCb(result); }
  });
}

function onLoaded(callback: (result: boolean[]) => void) {
  state.loadedCb = callback;
}

function play(name: keyof AudioRegistry): number {
  if (!state.audioSources[name]) { throw new Error('This sound does not exist!'); }
  const source = state.audioSources[name] as Howl;
  console.log(source.state());
  return source.play();
}

export function useAudio() {
  return {
    ...toRefs(state),
    init,
    onLoaded,
    play,
  };
}
