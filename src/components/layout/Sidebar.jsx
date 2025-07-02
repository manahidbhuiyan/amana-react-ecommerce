import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExpandedCategory } from "../../features/slice/sidebarSlice";
import { useNavigate } from "react-router-dom";
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
import { getImageUrl } from "../../utilis/api";

const Sidebar = ({ isOpen, activeCategory, activeSubCategory, onCategorySelect, onSubCategorySelect, onReset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expandedCategory } = useSelector((state) => state.sidebar);
  const { CategoriesData } = useSelector((state) => state.categories);

  // Map for icon components
  const iconMap = {
    Heart: Heart,
    Sun: Sun,
    Zap: Zap,
    UtensilsCrossed: UtensilsCrossed,
    Sparkles: Sparkles,
    User: User,
    Activity: Activity,
    Baby: Baby,
    Home: Home,
    FileText: FileText,
    PawPrint: PawPrint,
    Gamepad2: Gamepad2,
    Palette: Palette,
    Shirt: Shirt,
    Car: Car,
    Shield: Shield,
    Star: Star,
    BookOpen: BookOpen,
  };


  const handleCategoryClick = (category) => {
    // Check if the category has subcategories by checking the corresponding item in CategoriesData
    const categoryData = CategoriesData.find((item) => item.category._id === category._id);
    const hasSubcategories = categoryData && categoryData.subcategory && categoryData.subcategory.length > 0;

    if (hasSubcategories) {
      console.log("category", category);
      // Toggle expand/collapse using Redux
      dispatch(setExpandedCategory(expandedCategory === category._id ? null : category._id));
    } else {
      // Select category without subcategories
      onCategorySelect(category._id);
      dispatch(setExpandedCategory(null));

      // Navigate to products page with just the category
      // const encodedCategory = encodeURIComponent(category.name);
      // navigate(`/products/list/search/?category=${encodedCategory}`);
    }
  };

  const handleSubCategoryClick = (categoryId, categoryName, subCategory, subCategoryId, subCategoryName) => {
    onCategorySelect(categoryId);
    onSubCategorySelect(subCategory);

    const encodedCategory = encodeURIComponent(categoryName);
    console.log("subCategory", subCategoryId);
    const encodedSubCategory = encodeURIComponent(subCategoryName);

    navigate(`/products/list/search/?category=${encodedCategory}&subcategory=${encodedSubCategory}`);
  };

  // Reset expanded when sidebar closes
  //   useEffect(() => {
  //     if (!isOpen) {
  //       setExpandedCategory(null);
  //     }
  //   }, [isOpen]);

  //   if (!isOpen) return null;
  return (
    <div className="space-y-1">
      {CategoriesData &&
        CategoriesData.map((item, index) => {
          const category = item.category;
          const hasSubcategories = item.subcategory && item.subcategory.length > 0;

          // Get the icon from the icon map or default to Heart
          const IconComponent = category.icon ? iconMap[category.icon] || Heart : Heart;

          const isActive = activeCategory === category._id;
          const isExpanded = expandedCategory === category._id;

          return (
            <div key={category._id || index} className="select-none">
              {/* Main Category */}
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? `text-themeColor ` : "hover:bg-gray-100"}`}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center space-x-3 flex-1">
                  {category.icon ? (
                    <img className={`w-5 h-5 ${isActive ? "text-themeColor" : category.color || "text-gray-500"}`} src={getImageUrl(category.icon)} alt="Category Icon" />
                  ) : (
                    <IconComponent className={`w-5 h-5 ${isActive ? "text-themeColor" : category.color || "text-gray-500"}`} />
                  )}
                  <span className={`font-medium ${isActive ? "text-themeColor " : "textColorLight"}`}>{category.name}</span>
                </div>

                {hasSubcategories && (
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
              {hasSubcategories && isExpanded && (
                <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-100">
                  {item.subcategory.map((subCategory, subIndex) => {
                    // Handle both object and string subcategories
                    const subCategoryName = typeof subCategory === "object" ? subCategory.name : subCategory;
                    const subCategoryId = typeof subCategory === "object" ? subCategory._id : subIndex;

                    const isSubActive = activeCategory === category._id && activeSubCategory === subCategoryName;

                    return (
                      <div
                        key={subCategoryId}
                        className={`p-2 pl-4 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                          isSubActive ? " text-themeColor" : "text-textColorLight hover:bg-gray-50 hover:text-textColorLight"
                        }`}
                        onClick={() => handleSubCategoryClick(category._id, category.name, subCategoryName, subCategoryId, subCategoryName)}
                      >
                        <span className="text-sm font-medium">{subCategoryName}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Sidebar;
