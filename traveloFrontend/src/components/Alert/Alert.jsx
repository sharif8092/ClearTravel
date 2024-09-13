import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAlert } from '../../context';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import Grow from '@mui/material/Grow';



export const Alert = ()  => {
  const {alert, setAlert} = useAlert()

  function TransitionGrow(props) {
    return <Grow {...props} timeout={1000} />;
  }
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setAlert({open: false});
  };

  return (
      <Snackbar open={alert.open}
      sx={{ whiteSpace: 'pre-wrap' }} 
      TransitionComponent={TransitionGrow}
       autoHideDuration={4000}
       onClose={handleClose}
       iconMapping={{
        success: <CheckCircleIcon fontSize="inherit" />,
        error: <ErrorIcon fontSize="inherit" />,
        warning: <WarningIcon fontSize="inherit" />,
        info: <InfoIcon fontSize="inherit" />,
      }}
      >
        <MuiAlert onClose={handleClose} severity={alert.type} elevation={13} variant="filled">
          {alert.message} 
        </MuiAlert>
      </Snackbar>
  );
}
