const generateDefaultPosterUrl = (width: number, height: number, title: string): string => {
    return `https://dummyimage.com/${width}x${height}/fff.gif&text=${title}`;
};


export default generateDefaultPosterUrl;
