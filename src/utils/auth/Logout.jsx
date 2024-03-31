const logout = async () => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);

  }
};

export default logout;
