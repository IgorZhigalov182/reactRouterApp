import { Navigate } from 'react-router-dom';
import PostsListPage from './pages/Posts/PostsListPage';
import PostPage from './pages/Posts/PostPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SigupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { isLoggedInSelector } from './store/authSlice';
import AuthLayout from './layouts/AuthLayout';
import PostsLayout from './layouts/PostsLayout';
import MainPage from './pages/MainPage';

const routes = (isLoggedIn, location) => [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/auth/signUp" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: '*',
        element: <Navigate to="/auth/signUp" />,
      },
    ],
  },
  {
    path: 'posts',
    element: isLoggedIn ? (
      <PostsLayout />
    ) : (
      <Navigate to="/auth/login" state={{ refferer: location }} />
    ),

    children: [
      { path: '', element: <PostsListPage /> },
      { path: ':postId', element: <PostPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={isLoggedIn ? '/posts' : '/'} />,
  },
];

export default routes;
