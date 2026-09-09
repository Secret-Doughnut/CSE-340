import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT c.name AS category_name
      FROM public.category c`;

    const result = await db.query(query);

    return result.rows;
}

export {getAllCategories}