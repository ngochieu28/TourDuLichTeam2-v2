import React, { useState, useEffect } from "react";
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
    const [dialogValue, setDialogValue] = useState(value);

    useEffect(() => {
        setDialogValue(value); // Cập nhật giá trị ban đầu khi `EditableTextField` được bấm vào
    }, [value]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setDialogValue(value); // Khôi phục giá trị ban đầu khi hủy chỉnh sửa
    };

    const handleSave = () => {
        onSave(editedValue);
        setIsEditing(false);
    };

    const handleChange = (event) => {
        setEditedValue(event.target.value);
        setDialogValue(event.target.value);
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
                        value={dialogValue}
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