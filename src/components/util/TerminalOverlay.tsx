import React from 'react';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import TerminalComponent from './TerminalComponent';
import { useTerminalContext } from './TerminalContext';

const TerminalOverlay: React.FC = () => {
  const { open, handleClose } = useTerminalContext();

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
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            paddingTop: 4,
          }}
        >
          <TerminalComponent />
        </Box>
      </Fade>
    </Modal>
  );
};

export default TerminalOverlay;
