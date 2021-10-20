const statusPlugin = {
  options: {
    path: '/status',
    title: 'API Monitor',
    routeConfig: {
      auth: false,
    },
  },
  plugin: require('hapijs-status-monitor'),
};

export default statusPlugin;
