import express from 'express';

import { showHomePage } from './controllers/homeController.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showCategoriesPage } from './controllers/categories.js';
import { showProjectsPage } from './controllers/projects.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;