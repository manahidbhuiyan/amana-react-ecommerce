import { useSelector, useDispatch } from 'react-redux';
import { 
  useLoginUserMutation, 
  useGetUserInfoQuery, 
  useLogoutUserMutation 
} from '../features/auth/authApi'; // ✅ Fixed path
import { logOutUser, clearError } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user, userInformation, isLoading, isError, error } = useSelector(
    (state) => state.auth
  );
  
  // RTK Query hooks
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [logoutMutation] = useLogoutUserMutation();
  
  // Auto-fetch user info if token exists
  const { 
    data: userProfile, 
    isLoading: isProfileLoading,
    error: profileError 
  } = useGetUserInfoQuery(undefined, {
    skip: !token, // Only fetch if token exists
  });

  // Login function
  const login = async (credentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.log('Logout API failed, but clearing local state');
    } finally {
      dispatch(logOutUser());
    }
  };

  // Clear error function
  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    isAuthenticated: !!token,
    user: userProfile || userInformation || user,
    token,
    error,
    
    // Loading states
    isLoading: isLoading || isLoginLoading || isProfileLoading,
    isLoginLoading,
    isProfileLoading,
    
    // Error states
    isError,
    profileError,
    
    // Functions
    login,
    logout,
    clearAuthError,
  };
};