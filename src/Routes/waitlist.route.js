import { Router } from "express";
import { addUserToWaitList, removeUserFromWaitList } from "../Controllers/waitlist.controller.js";  

const waitlistRoutes = Router();

waitlistRoutes.post("/addToWaitlist", addUserToWaitList);
waitlistRoutes.post("/removeFromWaitlist", removeUserFromWaitList);

export { waitlistRoutes };