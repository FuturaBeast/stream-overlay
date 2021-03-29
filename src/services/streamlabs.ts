import { StreamlabsEvent } from '@/types/Streamlabs';
import io from 'socket.io-client';
import { reactive, toRefs } from 'vue';

export interface StreamlabsState {
  socketConnection: SocketIOClient.Socket | null;
}

const state = reactive<StreamlabsState>({
  socketConnection: null,
});

function connect() {
  const socket = io(
    `https://sockets.streamlabs.com?token=${process.env.VUE_APP_STREMLABS_SOCKET_API_TOKEN}`,
    { transports: ['websocket'] },
  );

  socket.on('connect', () => {
    console.log('Connected to Streamlabs');
  });

  state.socketConnection = socket;
  return {
    ...toRefs(state),
  };
}

function disconnect() {
  if (state.socketConnection) { state.socketConnection.close(); }
}

function onEvent(callback: (event: StreamlabsEvent) => void) {
  if (!state.socketConnection) { return; }
  state.socketConnection.on('event', (eventData: StreamlabsEvent) => {
    console.log(eventData);
    callback(eventData);
  });
}

export function useStreamlabs() {
  return {
    connect,
    disconnect,
    onEvent,
    ...toRefs(state),
  };
}
