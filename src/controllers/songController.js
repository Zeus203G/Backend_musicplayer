const Song = require('../models/songModel');

// Phương thức lấy tất cả bài hát
exports.getAllSongs = async (req, res) => {
    try {
      const songs = await Song.getAllSongs();  // Lấy tất cả bài hát từ model
      res.status(200).json(songs);  // Trả về mảng bài hát dưới dạng JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching songs', error: error.message });
    }
  };
  // Phương thức tìm kiếm bài hát theo tiêu chí (ví dụ: theo tên bài hát hoặc nghệ sĩ)
exports.searchSongs = async (req, res) => {
    const { q } = req.query;  // Lấy từ khóa tìm kiếm từ query string
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
  
    try {
      // Tìm bài hát trong cơ sở dữ liệu với từ khóa tìm kiếm
      const songs = await Song.searchSongs(q);
      
      if (songs.length === 0) {
        return res.status(404).json({ message: 'No songs found' });
      }
  
      res.status(200).json(songs);  // Trả về danh sách bài hát tìm được
    } catch (error) {
      res.status(500).json({ message: 'Error searching songs', error: error.message });
    }
  };
  
// Phương thức thêm bài hát
exports.addSong = async (req, res) => {
  const { title, artist, album, duration, url, images } = req.body;

  if (!title || !artist || !duration || !url) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const songId = await Song.addSong(title, artist, album, duration, url, images);
    res.status(201).json({ message: 'Song added', songId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error: error.message });
  }
};


// Phương thức xóa bài hát
exports.deleteSong = async (req, res) => {
    const { id } = req.params;
    console.log(`Received request to delete song with ID: ${id}`); // Log ID bài hát cần xóa
  
    try {
        const result = await Song.deleteSong(id);
        console.log(`Delete result: `, result); // Log kết quả từ cơ sở dữ liệu
        if (result.affectedRows === 0) {
            console.log('No song found with that ID.');
            return res.status(404).json({ message: 'Song not found' });
        }
        console.log('Song deleted successfully.');
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.error('Error during deletion:', error); // Log lỗi nếu có
        res.status(500).json({ message: 'Error deleting song', error: error.message });
    }
};
// Phương thức tìm kiếm bài hát theo tiêu chí (ví dụ: theo tên bài hát hoặc nghệ sĩ)
exports.searchSongs = async (req, res) => {
    const { q } = req.query;  // Lấy từ khóa tìm kiếm từ query string
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
  
    try {
      const songs = await Song.searchSongs(q);  // Gọi phương thức tìm kiếm
      if (songs.length === 0) {
        return res.status(404).json({ message: 'No songs found' });
      }
  
      res.status(200).json(songs);  // Trả về danh sách bài hát tìm được
    } catch (error) {
      res.status(500).json({ message: 'Error searching songs', error: error.message });
    }
  };
  
  

  
