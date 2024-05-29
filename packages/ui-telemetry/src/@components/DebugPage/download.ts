type Config = {
    newline: string;
    extension: string;
    filename: string;
};

const defaultConfig = (): Config => {
    const now = Date.now();

    return ({
        newline: "\r\n",
        extension: "txt",
        filename: now.toString(),
    });
};

export const downloadAsFile = (text: string[], config?: Partial<Config>) => {
    const {newline, filename, extension} = {...config, ...defaultConfig()};

    const element = document.createElement("a");
    const file = new Blob([text.join(newline)], {type: "text/plain"});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};
