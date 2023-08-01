import React from 'react';

interface DeleteButtonProps {
}

const DeleteButton: React.FC<DeleteButtonProps> = () => {
    return (
        <button className="delete" >
            Delete
        </button>
    );
};

export default DeleteButton;
