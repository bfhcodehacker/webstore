import '../styles/Recipes.css';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import datasource from '../datasource/datasource';
import { RecipeCard } from '../components/RecipeCard';
import { RequestState } from '../components/RequestState';
import { getRequestErrorMessage, shouldRetryRequest } from '../utils/requestError';

export function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize = 10;
  const recipesQuery = useQuery({
    queryKey: ['recipes', currentPage],
    queryFn: () => datasource.fetchRecipes(pageSize, (currentPage - 1) * pageSize),
    retry: shouldRetryRequest,
  });
  const totalRecipes = recipesQuery.data?.total || 0;
  const totalPages = Math.ceil(totalRecipes / pageSize);

  const goToPage = (page: number) => {
    setSearchParams(page > 1 ? { page: String(page) } : {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className='recipes-page'>
      <header className='recipes-hero'>
        <span className='recipes-eyebrow'>Recipe collection</span>
        <h1>Find your next favorite meal</h1>
        <p>Explore step-by-step recipes for every occasion, cuisine, and skill level.</p>
        {recipesQuery.isSuccess && (
          <strong aria-live='polite'>
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalRecipes)} of {totalRecipes} recipes
          </strong>
        )}
      </header>

      {recipesQuery.isPending && <RequestState title='Loading recipes...' icon='hourglass_empty' />}
      {recipesQuery.isError && <RequestState title='Unable to load recipes' message={getRequestErrorMessage(recipesQuery.error, 'recipes')} isRetrying={recipesQuery.isFetching} onRetry={() => recipesQuery.refetch()} />}
      {recipesQuery.isSuccess && !recipesQuery.data.recipes.length && <RequestState title='No recipes available' message='Please check back later.' icon='restaurant' />}

      {recipesQuery.data?.recipes.length ? (
        <>
          <section className='recipes-grid' aria-label={`Recipes page ${currentPage}`}>
            {recipesQuery.data.recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)}
          </section>
          {totalPages > 1 && (
            <nav className='recipes-pagination' aria-label='Recipe pages'>
              <button type='button' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1 || recipesQuery.isFetching}>
                <span className='material-icons' aria-hidden='true'>chevron_left</span>
                Previous
              </button>
              <div className='recipes-page-numbers'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button type='button' key={page} onClick={() => goToPage(page)} disabled={recipesQuery.isFetching} aria-current={page === currentPage ? 'page' : undefined} aria-label={`Page ${page}`}>
                    {page}
                  </button>
                ))}
              </div>
              <button type='button' onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || recipesQuery.isFetching}>
                Next
                <span className='material-icons' aria-hidden='true'>chevron_right</span>
              </button>
            </nav>
          )}
        </>
      ) : null}
    </main>
  );
}
