// Institutional Roll Number validation format: NNNNANANNN (e.g. 2025A7R025)
// 4 digits, 1 uppercase letter, 1 digit, 1 uppercase letter, 3 digits
export function validateRollNumber(rollNumber) {
  if (!rollNumber) return false;
  const pattern = /^(\d{4})([A-Z])(\d)([A-Z])(\d{3})$/;
  return pattern.test(rollNumber.trim().toUpperCase());
}

export const GRADIENTS = [
  '#2563EB',
  '#7C3AED',
  '#0D9488',
  '#EA580C',
  '#DB2777',
  '#4F46E5',
];

export function getRandomGradient() {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
}

export function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDate(date = new Date()) {
  return date.toLocaleDateString();
}

export function loadFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving to localStorage key "${key}":`, err);
  }
}
