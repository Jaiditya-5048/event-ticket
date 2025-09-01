export function formatName(name) {
  return name
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with one
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize
    .join(' ');
}
