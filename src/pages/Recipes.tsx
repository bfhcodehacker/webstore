import '../styles/Recipes.css';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { useState, type FormEvent } from 'react';
import datasource from '../datasource/datasource';
import { RecipeCard } from '../components/RecipeCard';
import { RequestState } from '../components/RequestState';
import { getRequestErrorMessage, shouldRetryRequest } from '../utils/requestError';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer', 'Side Dish', 'Beverage'];

export function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q')?.trim() || '';
  const tag = searchParams.get('tag')?.trim() || '';
  const meal = searchParams.get('meal')?.trim() || '';
  const [searchText, setSearchText] = useState(search);
  const requestedPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  const recipesQuery = useQuery({
    queryKey: ['recipes', currentPage, search, tag, meal],
    queryFn: () => {
      if (search) return datasource.searchRecipes(search, pageSize, skip);
      if (tag) return datasource.fetchRecipesByTag(tag, pageSize, skip);
      if (meal) return datasource.fetchRecipesByMeal(meal, pageSize, skip);
      return datasource.fetchRecipes(pageSize, skip);
    },
    retry: shouldRetryRequest,
  });
  const tagsQuery = useQuery({
    queryKey: ['recipe-tags'],
    queryFn: datasource.fetchRecipeTags,
    retry: shouldRetryRequest,
  });
  const totalRecipes = recipesQuery.data?.total || 0;
  const totalPages = Math.ceil(totalRecipes / pageSize);
  const activeFilter = search ? `matching “${search}”` : tag ? `tagged “${tag}”` : meal ? `for ${meal}` : '';

  const goToPage = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    if (page > 1) nextParams.set('page', String(page));
    else nextParams.delete('page');
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setFilter = (type: 'tag' | 'meal', value: string) => {
    const nextParams = new URLSearchParams();
    if (value) nextParams.set(type, value);
    setSearchText('');
    setSearchParams(nextParams);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchText.trim();
    setSearchParams(query ? { q: query } : {});
  };

  const clearFilters = () => {
    setSearchText('');
    setSearchParams({});
  };

  return (
    <main className='recipes-page'>
      <header className='recipes-hero'>
        <span className='recipes-eyebrow'>Recipe collection</span>
        <h1>Find your next favorite meal</h1>
        <p>Explore step-by-step recipes for every occasion, cuisine, and skill level.</p>
        {recipesQuery.isSuccess && (
          <strong aria-live='polite'>
            {totalRecipes > 0 ? `Showing ${skip + 1}–${Math.min(currentPage * pageSize, totalRecipes)} of ${totalRecipes} recipes ${activeFilter}` : `0 recipes ${activeFilter}`}
          </strong>
        )}
      </header>

      <section className='recipe-filters' aria-labelledby='recipe-filters-heading'>
        <h2 id='recipe-filters-heading'>Find recipes</h2>
        <form className='recipe-search' role='search' onSubmit={submitSearch}>
          <label htmlFor='recipe-search-input'>Search by recipe name</label>
          <div>
            <input id='recipe-search-input' type='search' value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder='Try “pizza”' />
            <button type='submit'>Search</button>
          </div>
        </form>
        <div className='recipe-filter-selects'>
          <label htmlFor='recipe-tag-filter'>Filter by tag
            <select id='recipe-tag-filter' value={tag} onChange={(event) => setFilter('tag', event.target.value)} disabled={tagsQuery.isPending}>
              <option value=''>All tags</option>
              {tagsQuery.data?.map((recipeTag) => <option value={recipeTag} key={recipeTag}>{recipeTag}</option>)}
            </select>
          </label>
          <label htmlFor='recipe-meal-filter'>Filter by meal
            <select id='recipe-meal-filter' value={meal} onChange={(event) => setFilter('meal', event.target.value)}>
              <option value=''>All meals</option>
              {mealTypes.map((mealType) => <option value={mealType} key={mealType}>{mealType}</option>)}
            </select>
          </label>
        </div>
        {(search || tag || meal) && <button className='recipe-clear-filters' type='button' onClick={clearFilters}>Clear filters</button>}
        {tagsQuery.isError && <span className='recipe-filter-error' role='status'>Tags are currently unavailable.</span>}
      </section>

      {recipesQuery.isPending && <RequestState title='Loading recipes...' icon='hourglass_empty' />}
      {recipesQuery.isError && <RequestState title='Unable to load recipes' message={getRequestErrorMessage(recipesQuery.error, 'recipes')} isRetrying={recipesQuery.isFetching} onRetry={() => recipesQuery.refetch()} />}
      {recipesQuery.isSuccess && !recipesQuery.data.recipes.length && <RequestState title='No recipes found' message='Try a different search or filter.' icon='search_off' />}

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
