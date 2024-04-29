import toast from 'react-hot-toast';
import { ResponseModel } from '../../models';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const isResponseModel = (obj: any): obj is ResponseModel<any> => {
  if (typeof obj === 'object' && obj !== null) {
    return 'result' in obj && 'body' in obj && 'message' in obj;
  } else {
    return false;
  }
};

export const ResponseModelHelper = (error: any) => {
  const navigate = useNavigate();
  //** search parameters via the URLSearchParams */
  const [searchParams] = useSearchParams();

  if (!error.response) {
    // Redirect to error page
    navigate(error.error, { state: { message: error.message, returnUrl: searchParams.get('returnUrl') } });
    toast.error(error.message, { id: 'loading' });
    return;
  }

  if (isResponseModel(error.response.data)) {
    const { result, message } = error.response.data;

    if (result === 401) {
      // Redirect to home page if unauthorized
      navigate('/');
      return;
    } else {
      toast.error(message, { id: 'loading' });
      return;
    }
  } else {
    const status = error.response.status;
    if (status === 401) {
      // Redirect to home page if unauthorized
      navigate('/');
      toast.error(error.message, { id: 'loading' });
      return;
    }

    // Redirect to error page
    navigate(error.error, { state: { message: error.message, returnUrl: searchParams.get('returnUrl') } });
    toast.error(error.message, { id: 'loading' });
    return;
  }
};
