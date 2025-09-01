import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigator } from '../utils/navigation';

const NavigationSetter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null;
};

export default NavigationSetter;
