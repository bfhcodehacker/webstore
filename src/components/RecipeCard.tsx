import { Link } from 'react-router';
import type { Recipe } from '../types/recipeTypes';
import defaultImage from '../assets/5191452-200.png';
import { StarRating } from './StarRating';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className='recipe-card'>
      <Link to={`/recipe/${recipe.id}`} className='recipe-card-link' aria-label={`View recipe for ${recipe.name}`}>
        <img
          src={recipe.image || defaultImage}
          alt=''
          className='recipe-card-image'
          loading='lazy'
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = defaultImage;
          }}
        />
        <div className='recipe-card-content'>
          <h2>{recipe.name}</h2>
          <div className='recipe-card-meta'>
            {recipe.cuisine && <span>{recipe.cuisine}</span>}
            {recipe.difficulty && <span>{recipe.difficulty}</span>}
          </div>
          {recipe.rating !== undefined && <StarRating rating={recipe.rating} />}
          <span className='recipe-card-action'>View Recipe <span className='material-icons' aria-hidden='true'>arrow_forward</span></span>
        </div>
      </Link>
    </article>
  );
}
