import '../styles/StarRating.css';

type StarRatingProps = {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const roundedRating = Math.floor(rating * 2) / 2;

  return (
    <div className='product-rating-stars' aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((index) => {
        const icon = roundedRating >= index + 1
          ? 'star'
          : roundedRating >= index + 0.5
            ? 'star_half'
            : 'star_border';

        return <span className='material-icons' aria-hidden='true' key={index}>{icon}</span>;
      })}
    </div>
  );
}
