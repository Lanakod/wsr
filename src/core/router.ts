import { Router } from "express";
import { CabinetController, UserController } from "~/core/controllers";
import { GroupController } from "~/core/controllers/group.controller";
import { authMiddleware } from "~/core/middleware";
import { EmployeeController } from "~/core/controllers/employee.controller";

const router = Router();

router.post("/register", UserController.signUp);
router.post("/signin", UserController.signIn);

router.post("/groups", authMiddleware, GroupController.create);
router.get("/groups", authMiddleware, GroupController.getAll);
router.delete("/groups/:id", authMiddleware, GroupController.delete);

router.post("/employee", authMiddleware, EmployeeController.create);
router.patch("/employee/:id", authMiddleware, EmployeeController.update);
router.delete("/employee/:id", authMiddleware, EmployeeController.delete);
router.get(
  "/group/:groupId/employee/:userId",
  authMiddleware,
  EmployeeController.changeGroup
);
router.get("/employeesingroups", authMiddleware, EmployeeController.getAll);

router.post("/cabinet", authMiddleware, CabinetController.create);
router.get("/cabinets", authMiddleware, CabinetController.getAll);
router.delete("/cabinet/:id", authMiddleware, CabinetController.delete);
router.get(
  "/cabinet/:cabinetId/group/:groupId",
  authMiddleware,
  CabinetController.addGroup
);
router.get(
  "/cabinetsingroups",
  authMiddleware,
  CabinetController.getEverything
);

export default router;
