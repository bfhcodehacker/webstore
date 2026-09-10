import '../styles/Recipes.css';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import datasource from '../datasource/datasource';
import defaultImage from '../assets/5191452-200.png';
import { StarRating } from '../components/StarRating';
import { RequestState } from '../components/RequestState';
import { getRequestErrorMessage, shouldRetryRequest } from '../utils/requestError';

export function Recipe() {
  const { id } = useParams();
  const recipeQuery = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => datasource.fetchRecipe(id!),
    enabled: Boolean(id),
    retry: shouldRetryRequest,
  });
  const recipe = recipeQuery.data;

  return (
    <main className='recipe-page'>
      <Link className='recipe-back-link' to='/recipes'><span className='material-icons' aria-hidden='true'>arrow_back</span> All Recipes</Link>
      {recipeQuery.isPending && <RequestState title='Loading recipe...' icon='hourglass_empty' />}
      {recipeQuery.isError && <RequestState title='Unable to load recipe' message={getRequestErrorMessage(recipeQuery.error, 'this recipe')} isRetrying={recipeQuery.isFetching} onRetry={() => recipeQuery.refetch()} />}

      {recipe && (
        <article className='recipe-detail'>
          <header className='recipe-detail-header'>
            <div className='recipe-detail-heading'>
              {recipe.cuisine && <span className='recipes-eyebrow'>{recipe.cuisine} cuisine</span>}
              <h1>{recipe.name}</h1>
              {recipe.rating !== undefined && (
                <div className='recipe-detail-rating'>
                  <StarRating rating={recipe.rating} />
                  {recipe.reviewCount !== undefined && <span>{recipe.reviewCount} {recipe.reviewCount === 1 ? 'review' : 'reviews'}</span>}
                </div>
              )}
              <div className='recipe-facts' aria-label='Recipe information'>
                {recipe.prepTimeMinutes !== undefined && <div><span className='material-icons-outlined' aria-hidden='true'>schedule</span><strong>{recipe.prepTimeMinutes} min</strong><span>Prep</span></div>}
                {recipe.cookTimeMinutes !== undefined && <div><span className='material-icons-outlined' aria-hidden='true'>timer</span><strong>{recipe.cookTimeMinutes} min</strong><span>Cook</span></div>}
                {recipe.servings !== undefined && <div><span className='material-icons-outlined' aria-hidden='true'>groups</span><strong>{recipe.servings}</strong><span>Servings</span></div>}
                {recipe.difficulty && <div><span className='material-icons-outlined' aria-hidden='true'>equalizer</span><strong>{recipe.difficulty}</strong><span>Difficulty</span></div>}
              </div>
            </div>
            <img src={recipe.image || defaultImage} alt={`Prepared ${recipe.name}`} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = defaultImage; }} />
          </header>

          <div className='recipe-detail-content'>
            <section aria-labelledby='ingredients-heading'>
              <h2 id='ingredients-heading'>Ingredients</h2>
              <ul>{recipe.ingredients?.map((ingredient, index) => <li key={`${ingredient}-${index}`}>{ingredient}</li>)}</ul>
            </section>
            <section aria-labelledby='instructions-heading'>
              <h2 id='instructions-heading'>Instructions</h2>
              <ol>{recipe.instructions?.map((instruction, index) => <li key={index}>{instruction}</li>)}</ol>
            </section>
          </div>

          <footer className='recipe-detail-footer'>
            {recipe.caloriesPerServing !== undefined && <span><strong>{recipe.caloriesPerServing}</strong> calories per serving</span>}
            {recipe.mealType?.map((type) => <span className='recipe-tag' key={type}>{type}</span>)}
            {recipe.tags?.map((tag) => <span className='recipe-tag' key={tag}>{tag}</span>)}
          </footer>
        </article>
      )}
    </main>
  );
}
