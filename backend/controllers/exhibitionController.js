const Exhibition = require('../models/Exhibition');

// Create a new exhibition
const { URL } = require('url'); // Node's built-in URL validation

exports.createExhibition = async (req, res) => {
  const { title, description, imageUrl } = req.body;

  // Validate that the imageUrl is a valid URL
  try {
    new URL(imageUrl); // Will throw if invalid
    const exhibition = await Exhibition.create({ title, description, imageUrl });
    res.status(201).json(exhibition);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid image URL' });
  }
};


// Get all exhibitions and group them by section (e.g., Current, Upcoming)
exports.getExhibitions = async (req, res) => {
    try {
      const exhibitions = await Exhibition.findAll();
      res.status(200).json(exhibitions); // Send exhibitions without grouping
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exhibitions' });
    }
  };
  
