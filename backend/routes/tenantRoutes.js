import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js';
import { validateTenant, checkTenantAccess } from '../middlewares/tenantMiddleware.js';
import { upgradeTenant } from '../controllers/tenantController.js';

const router = express.Router();

//Upgrade plan
router.post('/:slug/upgrade', isAuthenticated, authorizeRoles('admin'), validateTenant, checkTenantAccess, upgradeTenant)

export default router;