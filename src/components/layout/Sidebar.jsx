import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExpandedCategory } from "../../features/slice/sidebarSlice";
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

  const categories = [
    {
      id: "favourites",
      name: "Favourites",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      id: "summer",
      name: "Summer Collection",
      icon: Sun,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      id: "flash",
      name: "Flash Sales",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: "food",
      name: "Food",
      icon: UtensilsCrossed,
      color: "text-green-600",
      bgColor: "bg-green-50",
      hasSubCategories: true,
      subCategories: ["Fruits & Vegetables", "Dairy & Eggs", "Meat & Fish", "Beverages", "Snacks"],
    },
    {
      id: "cleaning",
      name: "Cleaning Supplies",
      icon: Sparkles,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      hasSubCategories: true,
      subCategories: ["Detergents", "Bathroom Cleaners", "Kitchen Cleaners", "Floor Cleaners"],
    },
    {
      id: "personal",
      name: "Personal Care",
      icon: User,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      hasSubCategories: true,
      subCategories: ["Women's Care", "Men's Care", "Handwash", "Tissue & Wipes", "Oral Care", "Skin Care", "Talcom Powder", "Hair Color"],
    },
    {
      id: "health",
      name: "Health & Wellness",
      icon: Activity,
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      hasSubCategories: true,
      subCategories: ["Vitamins", "First Aid", "Medicines", "Health Devices"],
    },
    {
      id: "baby",
      name: "Baby Care",
      icon: Baby,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      hasSubCategories: true,
      subCategories: ["Baby Food", "Diapers", "Baby Bath", "Toys"],
    },
    {
      id: "home",
      name: "Home & Kitchen",
      icon: Home,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      hasSubCategories: true,
      subCategories: ["Cookware", "Storage", "Home Decor", "Appliances"],
    },
    {
      id: "stationery",
      name: "Stationery & Office",
      icon: FileText,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      hasSubCategories: true,
      subCategories: ["Writing Tools", "Paper Products", "Office Supplies"],
    },
    {
      id: "pet",
      name: "Pet Care",
      icon: PawPrint,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      hasSubCategories: true,
      subCategories: ["Pet Food", "Pet Accessories", "Pet Health"],
    },
    {
      id: "toys",
      name: "Toys & Sports",
      icon: Gamepad2,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "beauty",
      name: "Beauty & MakeUp",
      icon: Palette,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
    },
    {
      id: "fashion",
      name: "Fashion & Lifestyle",
      icon: Shirt,
      color: "text-violet-500",
      bgColor: "bg-violet-50",
    },
    {
      id: "vehicle",
      name: "Vehicle Essentials",
      icon: Car,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
    },
    {
      id: "safety",
      name: "Safety Center",
      icon: Shield,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "premium",
      name: "Premium Care",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      id: "recipes",
      name: "Recipes",
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

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

  // Reset expanded when sidebar closes
  //   useEffect(() => {
  //     if (!isOpen) {
  //       setExpandedCategory(null);
  //     }
  //   }, [isOpen]);

  //   if (!isOpen) return null;

  return (
    <div className="space-y-1">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        const isExpanded = expandedCategory === category.id;

        return (
          <div key={category.id} className="select-none">
            {/* Main Category */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                isActive ? `text-themeColor ` : "hover:bg-gray-50"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="flex items-center space-x-3 flex-1">
                <Icon className={`w-5 h-5 ${isActive ? "text-themeColor" : category.color}`} />
                <span className={`font-medium ${isActive ? "text-themeColor " : "textColorLight"}`}>{category.name}</span>
              </div>

              {category.hasSubCategories && (
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
            {category.hasSubCategories && isExpanded && (
              <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-100">
                {category.subCategories.map((subCategory, index) => {
                  const isSubActive = activeCategory === category.id && activeSubCategory === subCategory;

                  return (
                    <div
                      key={index}
                      className={`p-2 pl-4 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        isSubActive ? " text-themeColor" : "text-textColorLight hover:bg-gray-50 hover:text-textColorLight"
                      }`}
                      onClick={() => handleSubCategoryClick(category.id, subCategory)}
                    >
                      <span className="text-sm font-medium">{subCategory}</span>
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
