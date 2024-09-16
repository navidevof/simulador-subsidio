export const getImageUrl = (path: string, name: string, extension: string) => {
	return new URL(`${path}/${name}.${extension}`, import.meta.url).href;
};
