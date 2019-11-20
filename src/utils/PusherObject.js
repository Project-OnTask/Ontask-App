import Pusher from 'pusher-js/react-native';

var pusher = new Pusher("979175850cb82f80c70a", {
  cluster: "ap2",
  encrypted: true,
});

export default pusher;
