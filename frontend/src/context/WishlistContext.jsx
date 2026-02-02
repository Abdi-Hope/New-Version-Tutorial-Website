import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };
      
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'LOAD_WISHLIST':
      return { ...state, items: action.payload };
      
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
      
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistState, dispatch] = useReducer(wishlistReducer, {
    items: []
  });

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('eLearningWishlist');
    if (savedWishlist) {
      dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(savedWishlist) });
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('eLearningWishlist', JSON.stringify(wishlistState.items));
  }, [wishlistState.items]);

  const addToWishlist = (course) => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        price: course.price,
        discountedPrice: course.discountedPrice,
        thumbnail: course.thumbnail,
        rating: course.rating,
        students: course.students,
        category: course.category
      }
    });
  };

  const removeFromWishlist = (courseId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: courseId });
  };

  const isInWishlist = (courseId) => {
    return wishlistState.items.some(item => item.id === courseId);
  };

  const moveToCart = (courseId) => {
    const course = wishlistState.items.find(item => item.id === courseId);
    if (course) {
      removeFromWishlist(courseId);
      // This would need to be connected with CartContext
      return course;
    }
    return null;
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const getWishlistCount = () => {
    return wishlistState.items.length;
  };

  const value = {
    wishlistItems: wishlistState.items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    clearWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;