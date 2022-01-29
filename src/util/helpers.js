export const limitChars = (string, count) => {
    if(string){
        return string.substr(0, count) + "\u2026";
    }
}