import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createLayout, editLayout, getLayoutByType } from '../controllers/layout.controller';
import { updateAccessToken } from '../controllers/user.controller';

const layoutRouter = express.Router();


layoutRouter.post("/create-layout", isAuthenticated,authorizeRoles("admin"), createLayout);

layoutRouter.put("/edit-layout", updateAccessToken,isAuthenticated,authorizeRoles("admin"), editLayout);

layoutRouter.get("/get-layout/:type",updateAccessToken,getLayoutByType);



export default layoutRouter;