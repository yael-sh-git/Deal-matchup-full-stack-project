import React from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';
import SignIn2 from '../pages/SignIn2';

interface SignInDialogProps {
    open: boolean;
    handleClose: () => void;
  }

const SignInDialog :React.FC<SignInDialogProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogContent>
          <SignIn2 />
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 3, mb: 2, borderColor: 'rgba(255,137,74,255)', color: 'rgba(255,137,74,255)',
              '&:hover': {
                borderColor: 'rgba(255,137,74,255)',
                backgroundColor: '#fdc6ad',
                color: 'white'
              },
            }}
            onClick={()=> handleClose()}
          >
            המשך כאורח
          </Button>
        </DialogContent>
      </Dialog>
  );
};

export default SignInDialog;



