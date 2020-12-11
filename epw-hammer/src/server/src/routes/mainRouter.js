const { Router } = require('express');
const WargearController = require('../controllers/mainController.js');

function myRouter(MarinesWargear, HarlequinWargear) {
  const router = Router();
  const gunController = WargearController(MarinesWargear, HarlequinWargear);

  router.route('/:gunModel')
    .all(gunController.allMethod)
    .get(gunController.getMethod);

  return router;
}

module.exports = myRouter;
