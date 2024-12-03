const db = require('../config/db');

// Phương thức thêm bài hát
const addSong = async (title, artist, album, duration, url, images) => {
  const query = `
    INSERT INTO songs (title, artist, album, duration, url, images)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  // Chèn dữ liệu vào cơ sở dữ liệu
  const [result] = await db.execute(query, [title, artist, album, duration, url, images]);
  return result.insertId; // Trả về ID của bài hát mới
};

// Phương thức lấy tất cả bài hát
const getAllSongs = async () => {
    try {
      const [rows] = await db.execute('SELECT * FROM songs'); // Truy vấn lấy tất cả bài hát
      return rows;  // Trả về mảng các bài hát
    } catch (error) {
      throw new Error('Error fetching songs: ' + error.message);  // Nếu có lỗi, ném ra lỗi
    }
  };
  

// Phương thức xóa bài hát
const deleteSong = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM songs WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);  // Nếu có lỗi trong truy vấn, từ chối (reject)
      }
      resolve(results);  // Trả về kết quả xóa
    });
  });
};
const searchSongs = async (q) => {
    const query = `
      SELECT * FROM songs 
      WHERE title LIKE ? OR artist LIKE ? OR album LIKE ?
    `;
    const [rows] = await db.execute(query, [`%${q}%`, `%${q}%`, `%${q}%`]); // Tìm kiếm không phân biệt chữ hoa, thêm % để tìm phần chuỗi
    return rows;
  };
  
  
// Export tất cả các phương thức vào một đối tượng
module.exports = { addSong, getAllSongs, deleteSong,searchSongs};
