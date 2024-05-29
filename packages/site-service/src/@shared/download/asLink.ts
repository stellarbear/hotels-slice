export const downloadAsLink = (url: string, name: string) => {
    const extension = url.slice(url.lastIndexOf("."));
    const link = `${url}?response-content-disposition=attachment%3B%20filename%3D${name}${extension}`;

    const container = document.createElement("a");
    container.rel = "noreferrer";
    container.href = link;
    container.target = "self";

    document.body.appendChild(container);
    container.click();
    document.body.removeChild(container);
};
