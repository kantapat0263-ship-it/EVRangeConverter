import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
  title?: string;
  /** Car brand this accessory fits, or "Universal" for any EV. */
  brand?: string;
  /** Specific models this accessory fits (optional, for finer matching). */
  models?: string[];
  /** Accessory category, e.g. interior | exterior | safety | charging. */
  category?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
