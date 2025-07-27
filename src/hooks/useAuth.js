import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation, useGetUserInfoQuery, authApi } from "../features/auth/authApi"; // ✅ Fixed path
import { logOutUser, clearError } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user, userInformation, isLoading, isError, error } = useSelector((state) => state.auth);

  // RTK Query hooks
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginUserMutation();

  // Auto-fetch user info if token exists
  const {
    data: userProfile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetUserInfoQuery(undefined, {
    skip: !token, // Only fetch if token exists
  });

  // Login function
  const login = async (credentials) => {
    try {
      console.log("credentials", credentials);
      const result = await loginMutation(credentials).unwrap();
      dispatch(authApi.util.invalidateTags([{ type: "Auth", id: "USER_INFO" }]));
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    dispatch(authApi.util.resetApiState());
    dispatch(logOutUser()); // This clears user, token, userInformation in state and removes token from localStorage
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
