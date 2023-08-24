import React, { useState } from "react";
import {
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

const EditableTextField = ({ label, value, onSave, type }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        onSave(editedValue);
        setIsEditing(false);
    };

    const handleChange = (event) => {
        setEditedValue(event.target.value);
    };

    return (
        <>
            <TextField
                label={label}
                value={value}
                onClick={handleEdit}
                disabled={isEditing}
                variant="standard"
                fullWidth
                type={type}
            />
            <Dialog
                open={isEditing}
                onClose={handleCancel}
                sx={{ "& .MuiDialog-paper": { width: "600px" } }}
            >
                <DialogTitle>Chỉnh sửa {label}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label={label}
                        autoFocus
                        value={editedValue}
                        onChange={handleChange}
                        variant="standard"
                        multiline
                        type={type}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Hủy</Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditableTextField;