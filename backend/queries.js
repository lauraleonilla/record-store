export const searchAlbums = async (pool, searchTerm) => {
  const query = {
    text: "SELECT * FROM albums WHERE albumname LIKE $1 OR artistname LIKE $1 OR recordlaber LIKE $1",
    values: ["%" + searchTerm + "%"],
  };

  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (err) {
    console.error("Error fetching the albums table", err);
  }
};
