

/**
 * Main App Component
 * 
 * Root component that sets up routing with React Router
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;