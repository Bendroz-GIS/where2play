const VITE_API_URL = import.meta.env.VITE_API_URL;

async function getDomain(domain) {
  const response = await fetch(`${VITE_API_URL}/api/domain/${domain.id}`);
  return await response.json();
}

export { getDomain }