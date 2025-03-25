import { Router } from "express";
import { healthcheck } from "../controller/healthcheck.controllers";

const router = Router();

router.route("/").get(healthcheck);

export default router;
