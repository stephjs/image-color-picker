import * as Vibrant from 'node-vibrant';

export const palettePicker = async (imagePath) =>
  await Vibrant.from(imagePath).getPalette();
