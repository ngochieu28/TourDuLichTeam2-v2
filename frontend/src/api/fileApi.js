import axiosClient from './axiosClient';
import FormData from 'form-data';

const baseUrl = '/files';

const uploadImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axiosClient.post(`${baseUrl}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const getImage = async (fileName) => {
    try {
        const response = await axiosClient.get(`${baseUrl}/image/${fileName}`, {
            responseType: 'arraybuffer',
        });

        const imageData = Buffer.from(response.data, 'binary').toString('base64');
        return `data:image/jpeg;base64,${imageData}`;
    } catch (error) {
        console.error('Error getting image:', error);
        throw error;
    }
};

// export
const api = { uploadImage, getImage }
export default api;