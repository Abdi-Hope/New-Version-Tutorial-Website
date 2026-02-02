import React, { useState } from 'react';
import { 
  Package, Tag, Users, Clock, Star, Award, 
  ChevronRight, Check, Zap, BookOpen, TrendingUp,
  ShoppingCart, Heart, Share2, Eye, Lock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const BundleCard = ({ 
  bundle,
  onView,
  onEnroll,
  onWishlist,
  onShare,
  compact = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { theme } = useTheme();

  const {
    id,
    title,
    description,
    courses = [],
    price,
    originalPrice,
    discount,
    duration,
    students,
    rating,
    reviews,
    level = 'Beginner',
    instructor,
    features = [],
    isPopular = false,
    isBestValue = false,
    isNew = false,
    accessType = 'lifetime', // lifetime, subscription, trial
    certificate = true,
    support = true,
    updates = true
  } = bundle;

  const calculateSavings = () => {
    if (!originalPrice || !price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const formatPrice = (amount) => {
    if (amount === 0) return 'Free';
    return `$${amount.toFixed(2)}`;
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-green-500 bg-green-500/10';
      case 'intermediate':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'advanced':
        return 'text-red-500 bg-red-500/10';
      case 'expert':
        return 'text-purple-500 bg-purple-500/10';
      default:
        return 'text-blue-500 bg-blue-500/10';
    }
  };

  const getAccessTypeIcon = (type) => {
    switch (type) {
      case 'lifetime':
        return <Award className="w-4 h-4 text-green-500" />;
      case 'subscription':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'trial':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      default:
        return <Lock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        rounded-2xl border transition-all duration-500 overflow-hidden
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}
        ${isPopular ? 'ring-2 ring-yellow-500 ring-opacity-50' : ''}
        ${isBestValue ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        ${compact ? 'p-4' : 'p-6'}
      `}
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {isNew && (
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">
            NEW
          </div>
        )}
        {isPopular && (
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            POPULAR
          </div>
        )}
        {isBestValue && (
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold flex items-center gap-1">
            <Tag className="w-3 h-3" />
            BEST VALUE
          </div>
        )}
        {discount > 0 && (
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold">
            SAVE {calculateSavings()}%
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold truncate">{title}</h3>
          </div>
          
          {!compact && description && (
            <p className={`
              text-sm line-clamp-2 mb-3
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
            `}>
              {description}
            </p>
          )}

          {/* Tags & Level */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
              {level}
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span>{courses.length} Courses</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              {getAccessTypeIcon(accessType)}
              <span className="capitalize">{accessType} Access</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          {originalPrice && originalPrice > price && (
            <div className="text-sm text-gray-500 line-through mb-1">
              {formatPrice(originalPrice)}
            </div>
          )}
          <div className="text-3xl font-bold mb-1">{formatPrice(price)}</div>
          {price === 0 ? (
            <div className="text-sm text-green-500 font-medium">Free Forever</div>
          ) : (
            <div className="text-sm text-gray-500">One-time payment</div>
          )}
        </div>
      </div>

      {/* Course List */}
      {!compact && courses.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Includes {courses.length} courses:</div>
          <div className="space-y-2">
            {courses.slice(0, 3).map((course, index) => (
              <div
                key={index}
                className={`
                  flex items-center gap-2 p-2 rounded-lg
                  ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}
                `}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                <div className="flex-1 truncate">{course.title}</div>
                <div className="text-xs text-gray-500">{course.duration}</div>
              </div>
            ))}
            {courses.length > 3 && (
              <div className="text-center text-sm text-gray-500">
                +{courses.length - 3} more courses
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      {!compact && features.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
          {features.length > 4 && (
            <div className="text-center text-sm text-gray-500 mt-2">
              +{features.length - 4} more benefits
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
            <Users className="w-4 h-4" />
            <span>Students</span>
          </div>
          <div className="font-bold">{students.toLocaleString()}+</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
            <Star className="w-4 h-4" />
            <span>Rating</span>
          </div>
          <div className="font-bold">{rating.toFixed(1)}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
            <Award className="w-4 h-4" />
            <span>Reviews</span>
          </div>
          <div className="font-bold">{reviews.toLocaleString()}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-lg transition-colors ${isLiked ? 'text-red-500 bg-red-500/10' : 'hover:bg-gray-700/50'}`}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={onShare}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="Share bundle"
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={onView}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="View bundle details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onView}
            className={`
              px-4 py-2 rounded-lg font-medium flex items-center gap-2
              transition-all duration-200
              ${theme === 'dark' 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              hover:scale-105 active:scale-95
            `}
          >
            <span>View Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEnroll}
            className={`
              px-6 py-2 rounded-lg font-medium flex items-center gap-2
              transition-all duration-200
              ${price === 0
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
              }
              hover:scale-105 active:scale-95
              shadow-lg
            `}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{price === 0 ? 'Enroll Free' : 'Enroll Now'}</span>
          </button>
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default BundleCard;
