const { Router } = require('express');
const WargearController = require('../controllers/mainController.js');

function myRouter(Wargear) {
  const router = Router();

  const gun = WargearController(Wargear);

  router.route('/')
    .get(gun.getMethod);

  return router;
}

module.exports = myRouter;
