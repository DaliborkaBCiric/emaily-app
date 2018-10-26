const passport = require('passport');

module.exports = app => {
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // brise cookie, i tako obrise sesiju korisnika
    req.logout();
    // salje obavestenje da je user izlogovan
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
      res.send(req.user);
  });
};
