import React from 'react'
import { CloseIcon } from '../../assets/icons/icon'
import {
    IconButton,
} from '../MUI';


const CloseButton = ({ handleClose }) => {
    return (
        <IconButton
            onClick={handleClose}
            sx={{
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: 'action.hover',
                    transform: 'rotate(90deg)',
                }
            }}
        >
            <CloseIcon />
        </IconButton>
    )
}

export default CloseButton
