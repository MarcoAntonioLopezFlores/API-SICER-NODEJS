const getPagination = (pageSize, pageNumber) => {
  const query = {
    offset: pageSize ? pageSize * (pageNumber - 1) : 0,
    limit: pageSize ? pageSize : 5,
  };
  return query;
};

const getPagingData = (result, page, limit) => {
  const { count: totalItems, rows: data } = result;
  const currentPage = page ? page : 1;
  const pageSize = limit ? limit : 5;
  const totalPages = Math.ceil(totalItems / pageSize);

  return { totalItems, data, totalPages, currentPage };
};

module.exports = { getPagination, getPagingData };
