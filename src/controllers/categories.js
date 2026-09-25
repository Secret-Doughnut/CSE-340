// Import any needed model functions
import { getAllCategories, updateCategoryAssignments } from '../models/categories.js';
import { getCategory } from '../models/categories.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { createCategory } from '../models/categories.js';
import { body, validationResult } from 'express-validator';
import { updateCategory } from '../models/categories.js';

let categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 150 characters')
];

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    console.log(JSON.stringify(categories, null, 2));

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategory(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = categoryDetails.name;

    res.render('category', { categoryDetails, projects, title });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const projectCategories = await getCategoriesByProjectId(projectId);
    const title = 'Assign Categories to Project';

    console.log(categories);

    res.render('assign-categories', { title, projectId, projectDetails, categories, projectCategories })
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    try { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach((error) => {
                req.flash('error', error.msg);
            });
            
            return res.redirect('/new-category');
        }

        const { name } = req.body;
        
        const newCategory = await createCategory(name);
        
        req.flash('success', 'New category created successfully!');

        res.redirect(`/categories`);
    } catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.categoryId;
    const categoryDetails = await getCategory(categoryId);
    const title = 'Edit Category';

    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.categoryId;

    // Check for validation errors
    const results = validationResult(req);
        if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
        req.flash('error', error.msg);
    });
            

    // Redirect back to the edit organization form
    return res.redirect('/edit-category/' + categoryId);
    }

    const { name } = req.body;
    
    await updateCategory(name, categoryId);

    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, categoryValidation, showEditCategoryForm, processEditCategoryForm };