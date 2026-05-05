import '../styles/Category.css';
import { Link } from "react-router";
import { categoryIcons } from "../constants/categoryIcons";
import type { Category } from "../types/categoryTypes";

export const CategoryComponent = (category: Category) => {
  const slug = category?.slug || 'default';
  const iconName = categoryIcons[slug];
  return (
    <Link className='category-container' to={`/category/${slug}`} key={slug}>
      <span className={`material-icons-sharp ${iconName}`}>{iconName}</span>
      <div className='category-title'>{category.name}</div>
    </Link>
  );
}