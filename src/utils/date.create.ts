export function dateCreate() {
  const newDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return newDate;
}
