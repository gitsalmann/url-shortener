const BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function encodeBase62(num){
    let str = ""
    while (num > 0){
        str = BASE62[num % 62] + str;
        num = Math.floor(num / 62)
    }
    return str;
}