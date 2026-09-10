import '../styles/RequestState.css';

type RequestStateProps = {
  title: string;
  message?: string;
  icon?: string;
  isRetrying?: boolean;
  onRetry?: () => void;
}

export function RequestState({ title, message, icon = 'error_outline', isRetrying, onRetry }: RequestStateProps) {
  return (
    <div className='request-state' role={onRetry ? 'alert' : 'status'}>
      <span className='material-icons request-state-icon' aria-hidden='true'>{icon}</span>
      <div className='request-state-copy'>
        <strong>{title}</strong>
        {message && <span>{message}</span>}
      </div>
      {onRetry && (
        <button type='button' onClick={onRetry} disabled={isRetrying}>
          {isRetrying ? 'Trying Again...' : 'Try Again'}
        </button>
      )}
    </div>
  );
}
