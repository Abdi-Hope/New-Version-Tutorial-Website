exports.getPagination = (page, limit) => {
  const pageInt = parseInt(page) || 1;
  const limitInt = parseInt(limit) || 10;
  const skip = (pageInt - 1) * limitInt;
  
  return { skip, limit: limitInt };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(totalItems / limit);
  
  return {
    totalItems,
    items: rows,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};
