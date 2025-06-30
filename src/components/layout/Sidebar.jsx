import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExpandedCategory } from "../../features/slice/sidebarSlice";
import { loadCategoryData } from "../../features/categories/categoriesSlice";
import {
  Heart,
  Sun,
  Zap,
  UtensilsCrossed,
  Sparkles,
  User,
  Activity,
  Baby,
  Home,
  FileText,
  PawPrint,
  Gamepad2,
  Palette,
  Shirt,
  Car,
  Shield,
  Star,
  BookOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const Sidebar = ({ isOpen, activeCategory, activeSubCategory, onCategorySelect, onSubCategorySelect, onReset }) => {
  const dispatch = useDispatch();
  const { expandedCategory } = useSelector((state) => state.sidebar);

  // API data থেকে categories
  useEffect(() => {
    let branchId = localStorage.branchId;
    dispatch(loadCategoryData({ branchId }));
  }, [dispatch]);

  const { CategoriesData, isLoading, isError } = useSelector((state) => state.categories);

  const handleCategoryClick = (category) => {
    if (category.hasSubCategories) {
      // Toggle expand/collapse using Redux
      dispatch(setExpandedCategory(expandedCategory === category.id ? null : category.id));
    } else {
      // Select category without subcategories
      onCategorySelect(category.id);
      dispatch(setExpandedCategory(null));
    }
  };

  const handleSubCategoryClick = (categoryId, subCategory) => {
    onCategorySelect(categoryId);
    onSubCategorySelect(subCategory);
  };

  // Default icon mapping for categories
  const getDefaultIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('food') || name.includes('fruit') || name.includes('vegetable')) return UtensilsCrossed;
    if (name.includes('personal') || name.includes('care')) return User;
    if (name.includes('health') || name.includes('medicine')) return Activity;
    if (name.includes('baby') || name.includes('child')) return Baby;
    if (name.includes('home') || name.includes('kitchen')) return Home;
    if (name.includes('beauty') || name.includes('makeup')) return Palette;
    if (name.includes('fashion') || name.includes('cloth')) return Shirt;
    if (name.includes('clean')) return Sparkles;
    if (name.includes('pet')) return PawPrint;
    if (name.includes('toy') || name.includes('game')) return Gamepad2;
    if (name.includes('office') || name.includes('station')) return FileText;
    return Home; // default icon
  };

  // Default color mapping
  const getDefaultColors = (index) => {
    const colors = [
      { color: "text-green-600", bgColor: "bg-green-50" },
      { color: "text-blue-500", bgColor: "bg-blue-50" },
      { color: "text-purple-500", bgColor: "bg-purple-50" },
      { color: "text-red-500", bgColor: "bg-red-50" },
      { color: "text-yellow-500", bgColor: "bg-yellow-50" },
      { color: "text-pink-500", bgColor: "bg-pink-50" },
      { color: "text-indigo-500", bgColor: "bg-indigo-50" },
      { color: "text-teal-500", bgColor: "bg-teal-50" },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-1">
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-red-500 text-center py-4">
          <p>Failed to load categories</p>
        </div>
      )}

      {/* Categories from API */}
      {!isLoading && !isError && CategoriesData && CategoriesData.map((categoryItem, index) => {
        const category = categoryItem.category;
        const subcategories = categoryItem.subcategory || [];
        const Icon = getDefaultIcon(category.name);
        const colors = getDefaultColors(index);
        const isActive = activeCategory === category._id;
        const isExpanded = expandedCategory === category._id;
        const hasSubCategories = subcategories.length > 0;

        return (
          <div key={category._id} className="select-none">
            {/* Main Category */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                isActive ? `text-themeColor ` : "hover:bg-gray-50"
              }`}
              onClick={() => handleCategoryClick({
                id: category._id,
                name: category.name,
                hasSubCategories: hasSubCategories
              })}
            >
              <div className="flex items-center space-x-3 flex-1">
                {/* API Icon or Default Icon */}
                {category.icon ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/${category.icon}`}
                    alt={category.name}
                    className={`w-5 h-5 object-contain ${isActive ? "opacity-100" : "opacity-80"}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                <Icon 
                  className={`w-5 h-5 ${isActive ? "text-themeColor" : colors.color} ${category.icon ? 'hidden' : 'block'}`} 
                  style={{ display: category.icon ? 'none' : 'block', margin: 0 }}
                />
                
                <span className={`font-medium capitalize ${isActive ? "text-themeColor " : "textColorLight"}`}>
                  {category.name}
                </span>
              </div>

              {hasSubCategories && (
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronDown className={`w-4 h-4 ${isActive ? "text-themeColor " : "text-textColorLight"}`} />
                  ) : (
                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-themeColor" : "text-textColorLight"}`} />
                  )}
                </div>
              )}
            </div>

            {/* Subcategories */}
            {hasSubCategories && isExpanded && (
              <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-100">
                {subcategories.map((subCategory) => {
                  const isSubActive = activeCategory === category._id && activeSubCategory === subCategory.name;

                  return (
                    <div
                      key={subCategory._id}
                      className={`p-2 pl-4 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        isSubActive ? " text-themeColor" : "text-textColorLight hover:bg-gray-50 hover:text-textColorLight"
                      }`}
                      onClick={() => handleSubCategoryClick(category._id, subCategory.name)}
                    >
                      <span className="text-sm font-medium capitalize">{subCategory.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Empty State */}
      {!isLoading && !isError && (!CategoriesData || CategoriesData.length === 0) && (
        <div className="text-gray-500 text-center py-8">
          <p>No categories available</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;