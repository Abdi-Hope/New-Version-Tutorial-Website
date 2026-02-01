const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
  },
  shortDescription: {
    type: String,
    maxlength: 200,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['web-development', 'mobile-development', 'data-science', 'design', 'business', 'marketing', 'other'],
  },
  subcategory: {
    type: String,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    default: 'beginner',
  },
  price: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  thumbnail: {
    type: String,
    default: '',
  },
  previewVideo: {
    type: String,
  },
  duration: {
    type: String, // e.g., "30 hours", "6 weeks"
  },
  modules: [{
    title: String,
    description: String,
    lessons: [{
      title: String,
      type: { type: String, enum: ['video', 'article', 'quiz', 'assignment'] },
      duration: Number, // in minutes
      content: String, // URL or content
      isFree: { type: Boolean, default: false },
    }],
  }],
  requirements: [String],
  learningOutcomes: [String],
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'archived', 'rejected'],
    default: 'draft',
  },
  rejectionReason: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  studentsEnrolled: {
    type: Number,
    default: 0,
  },
  studentsCompleted: {
    type: Number,
    default: 0,
  },
  revenue: {
    total: { type: Number, default: 0 },
    monthly: [{
      month: String,
      amount: Number,
    }],
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Generate slug before saving
courseSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
  next();
});

module.exports = mongoose.model('Course', courseSchema);
