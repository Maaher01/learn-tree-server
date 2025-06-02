const classController = require("../controllers/class.controller");
const checkAdminAuth = require("../middleware/check-admin-auth");
const checkUserAuth = require("../middleware/check-user-auth");

const { Router } = require("express");

const router = Router();

router.get("/get-all-classes", checkUserAuth, classController.allClassesGet);
router.post("/create-class", checkAdminAuth, classController.classCreate);

module.exports = router;
