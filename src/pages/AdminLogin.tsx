import { useState } from 'react';
import { ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { isAdmin, user, signIn, signOut, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: signInError } = await signIn(email.trim(), password);
    if (signInError) {
      setError(signInError.message || 'Unable to sign in.');
    }

    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
          Loading authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl">
        {isAdmin && user ? (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
              <LogOut className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}>
              Admin Logged In
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Signed in as <span className="font-semibold text-gray-900">{user.email}</span>
            </p>
            <button
              type="button"
              onClick={async () => {
                await signOut();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-white shadow-lg transition hover:bg-green-600"
              style={{ fontFamily: 'Calibri, sans-serif' }}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold" style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}>
                Admin Login
              </h1>
              <p className="mt-3 text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Use your Supabase admin credentials to manage content inline.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  style={{ fontFamily: 'Calibri, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  style={{ fontFamily: 'Calibri, sans-serif' }}
                />
              </div>
              {error && (
                <p className="text-sm text-red-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 disabled:bg-green-300"
                style={{ fontFamily: 'Calibri, sans-serif' }}
              >
                {submitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
