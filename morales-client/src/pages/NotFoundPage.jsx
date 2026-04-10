import React from 'react';
import Button from '../components/Button';

// enhancement 3

function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-teal-50 px-4">
      <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-teal-800 bg-white px-12 py-16 text-center shadow-lg max-w-md w-full">
        
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 border-2 border-teal-800">
          <span className="text-3xl">🔍</span>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
            404 Error
          </p>
          <h1 className="text-3xl font-bold leading-tight text-teal-900 sm:text-4xl">
            Page Not Found
          </h1>
        </div>

        <p className="text-sm leading-7 text-teal-700">
          The link you followed to get here must be broken...
        </p>

        <Button to="/">Back Home</Button>

      </div>
    </div>
  );
}

export default NotFoundPage;