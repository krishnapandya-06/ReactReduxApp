import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, signup } from '../store/slices/authSlice';
import { LogIn, UserPlus } from 'lucide-react';

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [error, setError] = useState(null);

  // Check authentication status and redirect if needed
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && !isAuthenticated) {
      const userData = JSON.parse(savedUser);
      dispatch(login({ email: userData.email }));
    }
    
    if (isAuthenticated) {
      navigate('/todo');
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        // Check if user exists in localStorage
        const savedUser = localStorage.getItem('user');
        if (!savedUser || JSON.parse(savedUser).email !== email) {
          setError('Invalid credentials. Please check your email and password.');
          return;
        }
        
        dispatch(login({ email }));
        navigate('/todo');
      } else {
        // For signup
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }

        // Check if user already exists
        const savedUser = localStorage.getItem('user');
        if (savedUser && JSON.parse(savedUser).email === email) {
          setError('User already exists. Please login instead.');
          return;
        }

        // Save new user
        localStorage.setItem('user', JSON.stringify({ email }));
        dispatch(signup({ email }));
        navigate('/todo');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          {isLogin ? (
            <LogIn className="mx-auto h-12 w-12 text-indigo-600" />
          ) : (
            <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
          )}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              navigate(isLogin ? '/signup' : '/login');
            }}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;