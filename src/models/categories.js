import db from './db.js'

const getAllCategories = async () => {
  const query = `
        SELECT
        c.category_id,
        c.name AS category_name
      FROM public.category c`;

  const result = await db.query(query);

  return result.rows;
};

const getCategory = async (id) => {
  const query = `
  SELECT
  category_id,
  name
  FROM category
  WHERE category_id = $1`

  const queryParams = [id];
  const result = await db.query(query, queryParams);

  // Return the first row of the result set, or null if no rows are found
  return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
      const query = `
        SELECT
        c.category_id,
        c.name
        FROM category c
        JOIN project_category pc
        ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
      `;
      
      const queryParams = [projectId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
      const query = `
        SELECT
        c.category_id,
        p.project_id,
        p.organization_id,
        p.title,
        p.description,
        p.location,
        p.project_date
        FROM project p
        JOIN project_category pc
        ON p.project_id = pc.project_id
        JOIN category c
        ON c.category_id = pc.category_id
        WHERE pc.category_id = $1;
      `;
      
      const queryParams = [categoryId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_category
        (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const deleteQuery = `
  DELETE FROM project_category
  WHERE project_id = $1`;

  await db.query(deleteQuery, [projectId]);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }

};

export {getAllCategories, getCategory, getCategoriesByProjectId, getProjectsByCategoryId, updateCategoryAssignments}