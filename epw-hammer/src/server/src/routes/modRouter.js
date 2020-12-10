const { Router } = require('express');
const modController = require('../controllers/modController.js');

function myRouter(Wargear) {
  const router = Router();

  const mod = modController(Wargear);

  router.route('/')
    .get(mod.getMethod);

  return router;
}

module.exports = myRouter;
