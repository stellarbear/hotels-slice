import {Image} from "@app/ui-web-kit";

// const isFile = (src: any): src is File => src ? ("name" in src) : false;
// const isBlob = (src: string) => src.startsWith("data:image");

const extractSrcFromFile = (file: File) => {
    const src = new Promise<Image["Shape"]>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({
                url: reader.result as string,
                fileName: file.name,
                mimeType: file.type,
                fileSize: file.size,
                timeStamp: new Date().toDateString(),

                width: 0,
                height: 0,
            });
        };

        //  TODO: error report
        reader.readAsDataURL(file);
    });

    return src;
};

const extractSrcFromImage = (url: string) => (value: Image["Shape"]) => {
    if (value.url.startsWith("data") || value.url.startsWith("http")) {
        return value;
    } else {
        return ({
            ...value,
            url: `${url}/${value?.url}`,
        });
    }
};

export const extract = {
    srcFromFile: extractSrcFromFile,
    srcFromImage: extractSrcFromImage,
};
