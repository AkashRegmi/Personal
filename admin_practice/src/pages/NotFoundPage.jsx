import { FiArrowLeft, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/login");
    }
  };

  const handleGoHome = () => {
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <section
        className="w-full max-w-2xl text-center"
        aria-labelledby="not-found-title"
      >
        {/* 404 Illustration */}
        <div className="relative mx-auto mb-8 w-fit">
          <span
            className="select-none text-[120px] font-black leading-none tracking-tighter text-gray-200 sm:text-[160px]"
            aria-hidden="true"
          >
            404
          </span>
        </div>

        {/* Content */}
        <h1
          id="not-found-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
          Sorry, we couldn't find the page you're looking for. The page may have
          been moved, deleted, or the URL may be incorrect.
        </p>

        {/* Current URL */}
        <div className="mx-auto mt-6 w-fit rounded-lg bg-gray-100 px-4 py-2">
          <code className="text-sm text-gray-600">
            {window.location.pathname}
          </code>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go Back
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <FiHome className="h-4 w-4" aria-hidden="true" />
            Go Home
          </button>
        </div>

        {/* Help text */}
        <p className="mt-8 text-xs text-gray-400">
          Error 404 · The requested resource could not be found.
        </p>
      </section>
    </main>
  );
};

export default NotFoundPage;
