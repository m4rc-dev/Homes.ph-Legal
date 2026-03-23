interface StarRatingProps {
  rating: number
  size?: number
}

export default function StarRating({ rating, size = 11 }: StarRatingProps) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24"
          fill={n <= Math.round(rating) ? 'var(--gold)' : 'none'}
          stroke="var(--gold)" strokeWidth={n <= Math.round(rating) ? 0 : 1.5}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}
