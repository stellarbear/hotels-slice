import {useMutation} from "@apollo/client";
import React from "react";

type AttachmentShape = {
    __typename?: any;

    url: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    timeStamp: string;

    width: number;
    height: number;
};

const isFile = (src: any): src is File => src ? ("name" in src) : false;

const getDimensions = (src: File): Promise<{width: number; height: number}> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({width: img.width, height: img.height});
        img.onerror = () => resolve({width: 0, height: 0});
        img.src = window.URL.createObjectURL(src);
    });
};

type Props<M, V> = {
    doc: any;
    getUrlAndName: (res: M) => {path: string; url: string};
    getVariables: (url: string) => V;
};

export const useBucketUpload = <M, V>(props: Props<M, V>) => {
    const {doc, getVariables, getUrlAndName} = props;

    const [putFileUrl] = useMutation<M, V>(doc);

    const uploadFile = React.useCallback(async (file: File) => {
        const size = await getDimensions(file);

        const responseMutation = await putFileUrl({variables: getVariables(file.name)});
        if (!responseMutation?.data) {
            throw new Error("Ошибка: файлу не предоставлен бакет");
        }

        const bucket = getUrlAndName(responseMutation.data);
        const responseFilePut = await fetch(bucket.path, {
            method: "PUT",
            credentials: "same-origin",
            body: file,
        });

        if (responseFilePut.status !== 200) {
            throw new Error("Ошибка: файл не был загружен");
        }

        const result = {
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            timeStamp: new Date(file.lastModified).toString(),
            ...size,
            url: bucket.url,
        };

        return result;
    }, [getVariables, getUrlAndName]);

    const upload = React.useCallback(async (entry: (AttachmentShape | File)):
        Promise<AttachmentShape> => {
        if (isFile(entry)) {
            return uploadFile(entry);
        } else if (!entry.url.startsWith("data")) {
            const {__typename, ...cleaned} = entry;
            return cleaned;
        } else {
            const response = await fetch(entry.url);
            const blob = await response.blob();
            const file = new File([blob], entry.fileName, {type: entry.mimeType});
            return uploadFile(file);
        }
    }, [uploadFile]);

    const uploadMultiple = React.useCallback(async (input: (AttachmentShape | File)[] = []):
        Promise<AttachmentShape[]> => {
        const result: AttachmentShape[] = [];

        for (const entry of input) {
            result.push(await upload(entry));
        }

        return result;
    }, [upload]);

    return ({upload, uploadMultiple});
};
