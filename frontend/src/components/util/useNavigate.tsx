import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateInContext = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return { navigate, location };
};
