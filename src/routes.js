import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
showOrganizationsPage,
showOrganizationDetailsPage,
showNewOrganizationForm,
processNewOrganizationForm,
organizationValidation,
showEditOrganizationForm,
processEditOrganizationForm
} from './controllers/organizations.js';

import {
showProjectsPage,
showProjectDetailsPage,
showNewProjectForm,
processNewProjectForm,
projectValidation
} from './controllers/projects.js';

import {
showCategoriesPage,
showCategoryDetailsPage
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';
import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get('/edit-organization/:id', showEditOrganizationForm);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

router.get('/new-project', showNewProjectForm);

router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

router.post('/new-project', projectValidation, processNewProjectForm);

router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);


export default router;