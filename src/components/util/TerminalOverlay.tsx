import React, { useEffect } from 'react';
import { Modal, Box, Backdrop, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TerminalComponent from './TerminalComponent';
import { useTerminalContext } from './TerminalContext';

const TerminalOverlay: React.FC = () => {
  const { open, handleClose, term } = useTerminalContext();

  useEffect(() => {
    if (open && term) {
      term.focus();
    }
  }, [open, term]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          tabIndex={-1}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '95vw',
            height: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '40px',
              padding: '0 10px',
              bgcolor: '#333',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TerminalComponent />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TerminalOverlay;
