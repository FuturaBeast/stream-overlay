import io from 'socket.io-client';
import { reactive, toRefs } from 'vue';

export interface SocketApiState {
  socketConnection: SocketIOClient.Socket | null;
}

const state = reactive<SocketApiState>({
  socketConnection: null,
});

function connect() {
  const socket = io(
    'http://localhost:3000',
  );

  socket.on('connect', () => {
    console.log('Connected to Api');
  });

  state.socketConnection = socket;
  return {
    ...toRefs(state),
  };
}

function disconnect() {
  if (state.socketConnection) { state.socketConnection.close(); }
}

function onEvent<T = any>(event: string, callback: (event: T) => void) {
  if (!state.socketConnection) { return; }
  state.socketConnection.on(event, (eventData: T) => {
    callback(eventData);
  });
}

export function useSocketApi() {
  return {
    connect,
    disconnect,
    onEvent,
    ...toRefs(state),
  };
}
