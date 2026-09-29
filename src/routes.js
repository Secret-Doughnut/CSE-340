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
import { showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { showNewCategoryForm, processNewCategoryForm } from './controllers/categories.js';
import { categoryValidation } from './controllers/categories.js';
import { showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { showUserRegistrationFrom, processUserRegistrationForm, requireLogin, showDashboard } from './controllers/users.js';
import { showLoginForm, processLoginForm, processLogout } from './controllers/users.js';
import { requireRole } from './controllers/users.js';

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

router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

router.get('/new-project', requireRole('admin'), showNewProjectForm);

router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm);

router.get('/edit-project/:projectId', requireRole('admin'), showEditProjectForm);

router.get('/new-category', requireRole('admin'), showNewCategoryForm);

router.get('/edit-category/:categoryId', requireRole('admin'), showEditCategoryForm);

router.get('/register', showUserRegistrationFrom);

router.get('/login', showLoginForm);

router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.post('/project/:projectId/assign-categories', requireRole('admin'), processAssignCategoriesForm);

router.post('/edit-project/:projectId', requireRole('admin'), projectValidation, processEditProjectForm);

router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.post('/edit-category/:categoryId', requireRole('admin'), categoryValidation, processEditCategoryForm);

router.post('/register', processUserRegistrationForm);

router.post('/login', processLoginForm);


export default router;