export default async function imgToBase64(image:File):Promise<Base64URLString> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
    });
};