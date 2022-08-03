export default function getStorageItems() {
  const saved = localStorage.getItem('items');
  return JSON.parse(saved) || [];
}
