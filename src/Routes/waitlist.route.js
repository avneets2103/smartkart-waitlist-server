import { Router } from "express";
import { addUserToWaitList, removeUserFromWaitList, getWaitList } from "../Controllers/waitlist.controller.js";  

const waitlistRoutes = Router();

waitlistRoutes.post("/addToWaitlist", addUserToWaitList);
waitlistRoutes.post("/removeFromWaitlist", removeUserFromWaitList);
waitlistRoutes.get("/getWaitlist", getWaitList);

export { waitlistRoutes };