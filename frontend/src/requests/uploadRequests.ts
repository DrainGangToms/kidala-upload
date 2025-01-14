import axios from 'axios';
import React from 'react';
import { Dispatch } from 'redux';
import { addNewFile } from '../redux/slices/appSlice';
import { clearNotification } from '../redux/slices/notificationSlice';
import { UPLOAD_BASE } from './routes';

export const uploadFile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    setUrl: React.Dispatch<React.SetStateAction<string>>,
    dispatch: Dispatch,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    file?: File | null
) => {
    e.preventDefault();

    if (!file) {
        return;
    }

    let formData = new FormData();
    formData.append('file', file);

    const headers = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    await axios
        .post(UPLOAD_BASE, formData, headers)
        .then((res) => {
            setUrl(res.data.hash);
            dispatch(addNewFile(res.data.hash));
            dispatch(clearNotification());
            setFile(null);
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            if (!err.response.data) {
                return console.log(err);
            }

            console.log(err.response.data);
        });
};
