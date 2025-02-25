import NextImage, { ImageProps } from "next/image";
import { ReactElement } from "react";


const imageLoader = ({ src, width, height, quality = 80 }) => {
    const params = Object.entries({ width, height, quality }).reduce(
        (acc, [key, value]) => {
            if (!value) return acc;
            return { ...acc, [key]: value };
        },
        {}
    );
    return `${src}&${new URLSearchParams(params).toString()}`;
};

export const Image = ({ ...props }) => {
    if (!props.src) return null;
    return <NextImage {...props} loader={imageLoader} />;
};
