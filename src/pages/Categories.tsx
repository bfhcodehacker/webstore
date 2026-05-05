import '../styles/Categories.css';
import { useQuery } from "@tanstack/react-query";
import datasource from "../datasource/datasource";
import { CategoryComponent } from "../components/Category";

export function Categories() {
  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: datasource.fetchCategories
  });
  
  const renderCategories = () => {
    return categoryQuery.data?.map(CategoryComponent);
  }

  return (
    <div className='categories-page-container'>
      <div className='categories-page-title'>Categories</div>
      <div className='categories-page-data'>
        {!categoryQuery.isError && renderCategories()}
      </div>
    </div>
  );
}