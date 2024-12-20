const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../auth/pageAuth.js')
const multer = require('multer')
const upload = multer()
const { v4: uuidv4 } = require('uuid'); // Import UUID
const fileModel = require('../models/files.models.js')
const supabase = require('../config/supabase.js');
const { sign } = require('jsonwebtoken');

router.get('/',isAuthenticated,async (req,res)=>{
  // console.log(req.user)
  const userFiles = await fileModel.find({
    user : req.user.userId
  })

  console.log(userFiles)

  res.render('home',{
    files : userFiles
  })
})



router.post('/upload',upload.single('file'),isAuthenticated,async (req,res)=>{
  console.log(req.file.originalname)
  const customPath = `${Date.now()}${req.file.originalname}`

  const newFile = await fileModel.create({
    customPath : customPath,
    user : req.user.userId,
    originalname : req.file.originalname
  })

  // res.json(newFile)

  const file = req.file;
    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

  // Upload the file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('uploads') // Replace with your Supabase bucket name
    .upload(customPath, file.buffer, {
      contentType: file.mimetype,
      upsert: false, // Set to true if you want to overwrite files with the same name
    });

  if (error) {
    throw error; // Handle upload errors
  }

  // Get the public URL of the uploaded file
  // const { publicUrl } = supabase.storage
  //   .from('uploads')
  //   .getPublicUrl(customPath);
  const { publicUrl } = supabase.storage
      .from('uploads') // Replace with your bucket name
      .getPublicUrl(customPath);

  

  const customFileResponse = {
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadTime: new Date().toISOString(),
    customPath: customPath, // Example custom path
    publicUrl : publicUrl
  };

  res.redirect('/')
})


router.get('/signedDownload/:customPath',isAuthenticated,async (req,res)=>{
  const loggedInUser = req.user.userId;
  const customPath = req.params.customPath;
 
  const file = await fileModel.findOne({
    user : loggedInUser,
    customPath : customPath
  });

  if(!file){
    return res.status(401).json({
      message : 'Unauthorized'
    })
  }

  // Generate a signed URL for the file
  const { data: signedUrlData, error } = await supabase.storage
  .from('uploads') // Replace with your bucket name
  .createSignedUrl(customPath, 60); // Generate a signed URL valid for 60 seconds

  if (error) {
    console.error('Error creating signed URL:', error.message);
    return res.status(500).json({ message: 'Failed to create signed URL' });
  }

  // Redirect the user to the signed URL
  res.redirect(signedUrlData.signedUrl); // Use the correct property

})

router.delete('/delete/:customPath', isAuthenticated, async (req, res) => {
  try {
    // Get the user ID and the custom path from the URL params
    const loggedInUser = req.user.userId;
    const customPath = decodeURIComponent(req.params.customPath); // Decode URL-encoded file path

    // Check if the file exists in the database
    const file = await fileModel.findOne({
      user: loggedInUser,
      customPath: customPath,
    });

    if (!file) {
      return res.status(404).json({
        message: 'File not found in the database',
      });
    }

    // Delete the file from Supabase storage
    const { error: deleteError } = await supabase.storage
      .from('uploads') // Replace with your Supabase bucket name
      .remove([customPath]); // Remove the file by its custom path

    if (deleteError) {
      return res.status(500).json({
        message: 'Error deleting file from Supabase',
        error: deleteError.message,
      });
    }

    // Remove the file metadata from the database
    await fileModel.deleteOne({ _id: file._id });

    // Respond with success
    res.status(200).json({
      message: 'File deleted successfully from Supabase and the database',
    });
  } catch (err) {
    // General error handler
    console.error('Error deleting file:', err.message);
    res.status(500).json({
      message: 'An error occurred while deleting the file',
      error: err.message,
    });
  }
});




module.exports = router;

