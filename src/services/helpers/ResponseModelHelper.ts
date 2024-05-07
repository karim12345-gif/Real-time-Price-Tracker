import toast from 'react-hot-toast';
import { ResponseModel } from '../../models';
import { useNavigate, useSearchParams } from 'react-router-dom';
import routes from '../../routes';

export const isResponseModel = (obj: any): obj is ResponseModel<any> => {
  if (typeof obj === 'object' && obj !== null) {
    return 'result' in obj && 'body' in obj && 'message' in obj;
  } else {
    return false;
  }
};

export const ResponseModelHelper = (error: any) => {
  const navigate = useNavigate();
  // Search parameters via the URLSearchParams
  const [searchParams] = useSearchParams();

  if (!error.response) {
    // Redirect to error page
    navigate(routes.error, { state: { message: error.message, returnUrl: searchParams.get('returnUrl') } });
    toast.error(error.message, { id: 'loading' });
    return;
  }

  if (isResponseModel(error.response.data)) {
    const { result, message } = error.response.data;

    if (result === 400 ) {
      // Redirect to home page if unauthorized
       navigate(routes[404])
      return;
    } else {
      toast.error(message, { id: 'loading' });
      return;
    }
  } else {
    const status = error.response.status;
    if (status === 400) {
      // Redirect to home page if unauthorized
       navigate(routes[404])
      toast.error(error.message, { id: 'loading' });
      return;
    } else if (status === 500 ) {
      // Show error toast for status code 500
      navigate(routes[500])
      toast.error('Something is wrong', { id: 'loading' });
      return;
    }
    else if (status === 404 ) {
      // Show error toast for status code 500
      navigate(routes[404])
      toast.error('Something is wrong', { id: 'loading' });
      return;
    }

    // Redirect to error page for other status codes
    navigate(routes.error, { state: { message: error.message, returnUrl: searchParams.get('returnUrl') } });
    toast.error(error.message, { id: 'loading' });
    return;
  }
};
