import { useState } from 'react';

function Login2() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    remember_me: false
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    mobileNumber: ''
  });

  const handleLogin = () => {
    // Submit logic
  };

  const validateUsername = () => {
    if (user.username.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
    }
  };

  const validatePassword = () => {
    if (user.password.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const validateEmail = () => {
    // Implement email validation logic here
  };

  const validateMobileNumber = () => {
    // Implement mobile number validation logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateUsername();
    validatePassword();
    validateEmail();
    validateMobileNumber();

    // Check for errors and submit if everything is valid
    if (Object.values(errors).every((error) => error === '')) {
      handleLogin();
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder="Username"
            value={user.username}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={(e) => setUser((prevUser) => ({ ...prevUser, username: e.target.value }))}
            onBlur={validateUsername}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            value={user.password}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
            onBlur={validatePassword}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
      </div>

      {/* Remember me and Forgot password sections remain unchanged */}

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default Login2;