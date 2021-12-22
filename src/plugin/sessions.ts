const sessionsPlugin = {
  plugin: require('hapi-server-session'),
  options: {
    cookie: {
      isSameSite: false,
      isSecure: false, // never set to false in production
    },
    key: Math.random(),
  },
};

export default sessionsPlugin;
