export default function Unauthorized() {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
          <p className="mt-2 text-gray-600">You don’t have access to this page.</p>
        </div>
      </div>
    );
  }
  