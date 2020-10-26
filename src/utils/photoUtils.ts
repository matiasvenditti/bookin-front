export default class PhotoUtils {
    static getPhotoFromBytearray = (data: string) => {
        return `data:image/jpeg;base64,${data}`;
    }
    static MAX_PHOTO_SIZE: number = 100000;
}