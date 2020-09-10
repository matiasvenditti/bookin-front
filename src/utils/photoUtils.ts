export default class photoUtils {
    static getPhotoFromBytearray = (data: string) => {
        return `data:image/jpeg;base64,${data}`;
    }
    static MAX_PHOTO_SIZE: number = 100000;
}