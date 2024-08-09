import Marketer from "../models/marketer.js";

export const registerMarketer = async (req, res) => {
  const marketer = new Marketer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newMarketer = await marketer.save();
    res.status(201).json(newMarketer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMarketer = async (req, res) => {
  try {
    const marketer = await Marketer.findById(req.params.id);
    if (!marketer) {
      return res.status(404).json({ message: "Marketer not found" });
    }
    res.json(marketer);
  } catch (err) {
    console.error("Error fetching marketer:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// getting all the marketer's data

export const getAllMarketers = async(req,res)=> {
  try {
    const marketers = await Marketer.find();
    res.json(marketers);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}