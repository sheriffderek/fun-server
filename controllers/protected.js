app.get('/protected',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  }
);