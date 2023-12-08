const Event = require("../models/eventModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");

// Create Event (Admin)

exports.createEvent = catchAsyncErrors(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);     // Single Image
    } else {
      images = req.body.images;       // For Multiple Images
    }
  
    const imagesLinks = [];
  
    // Uploading to Cloudinary
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks; // Store Cloudinary Link
    req.body.user = req.user.id;
  
    const events = await Event.create(req.body);  // create product using product model
  
    res.status(201).json({
      success: true,
      events,
    });
});

// Get All Event (Admin)

exports.getAdminEvents = catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find();
  
    res.status(200).json({
      success: true,
      events,
    });
});

// Update Event -- Admin

exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < event.images.length; i++) {
      await cloudinary.v2.uploader.destroy(event.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    event,
  });
});

// Delete Product

exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < event.images.length; i++) {
    await cloudinary.v2.uploader.destroy(event.images[i].public_id);
  }

  await event.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});