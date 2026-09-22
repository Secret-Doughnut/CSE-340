// Import any needed model functions
import { getAllCategories, updateCategoryAssignments } from '../models/categories.js';
import { getCategory } from '../models/categories.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

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

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };