export default class ObjectUtils {
    public static isEmpty(object: Object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
}