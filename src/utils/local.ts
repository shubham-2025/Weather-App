export function getSearches() {
  const previousSearches = localStorage.getItem("searches");
  return previousSearches ? JSON.parse(previousSearches) : [];
}
