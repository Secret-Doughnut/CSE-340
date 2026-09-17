// Import any needed model functions
import { getAllCategories } from '../models/categories.js';
import { getCategory } from '../models/categories.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/categories.js';

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

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };