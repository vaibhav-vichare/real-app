import axios from 'axios';

export default class ImageService {
    async getImage() {
        let url;
        await axios({
            url: 'http://localhost:3000/api/v1/image',
            method: 'GET',
            responseType: 'blob'
        }).then(response => {
            url = window.URL.createObjectURL(new Blob([response.data]));
        });
        return url;
    }
}
