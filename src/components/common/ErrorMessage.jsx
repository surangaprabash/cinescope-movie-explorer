export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="max-w-md p-5 mx-auto text-center text-red-700 border border-red-300 rounded-xl bg-red-50 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
    >
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}