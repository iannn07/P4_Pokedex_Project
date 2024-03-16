const getColorForType = (type: string) => {
  // Generate a consistent color based on the type
  const hash = type
    .split('')
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = hash % 400;

  return `hsl(${hue}, 70%, 30%)`; // Adjust saturation and lightness as needed
};

export default getColorForType;
