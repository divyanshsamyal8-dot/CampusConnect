// Institutional Roll Number validation format: NNNNANANNN (e.g. 2025A7R025)
// 4 digits, 1 uppercase letter, 1 digit, 1 uppercase letter, 3 digits
export function validateRollNumber(rollNumber) {
  if (!rollNumber) return false;
  const pattern = /^(\d{4})([A-Z])(\d)([A-Z])(\d{3})$/;
  return pattern.test(rollNumber.trim().toUpperCase());
}

export const GRADIENTS = [
  'linear-gradient(135deg, #4361ee, #3a0ca3)',
  'linear-gradient(135deg, #7209b7, #ef476f)',
  'linear-gradient(135deg, #ff9e00, #ff0054)',
  'linear-gradient(135deg, #00b4d8, #06d6a0)',
  'linear-gradient(135deg, #ef476f, #ff9e00)',
  'linear-gradient(135deg, #3a0ca3, #7209b7)',
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
