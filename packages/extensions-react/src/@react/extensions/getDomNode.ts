export const getDomNode = (src = "root") => {
    const exists = document.getElementById(src);
    if (exists) {
        return exists;
    }

    const container = document.createElement("div");
    container.id = src;
    document.body.appendChild(container);
    return container;
};
