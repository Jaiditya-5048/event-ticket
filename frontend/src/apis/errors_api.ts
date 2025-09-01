import { toast } from "react-toastify";
import { getExternalLogout } from "../context/AuthContext";
import { getNavigator } from "../utils/navigation";

export const handleHttpError = (status: number, error: any) => {
  switch (status) {
    case 400:
      console.warn('Bad Request:', error);
      break;
    case 401:
      getExternalLogout()?.();
      toast.error('Session expired. Please log in again.');
      getNavigator()('/login');
      break;
    case 403:
      toast.error('Forbidden: You do not have access.');
      getNavigator()('/');
      break;
      case 404:
      toast.error(error.response.data.message)
      break;
    case 409:
      console.log(error);
      
      // alert('Conflict: Duplicate or invalid data.');
      break;
    case 422:
      alert('Unprocessable Entity: Please check your input.');
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      alert('Server Error: Please try again later.');
      break;
    default:
      console.error('Unhandled error:', error);
      alert('Something went wrong.');
  }
};
