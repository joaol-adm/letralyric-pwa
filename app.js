async function fetchLyrics() {
  const artist = document.getElementById("artist").value.trim();
  const title = document.getElementById("title").value.trim();
  const lyricsEl = document.getElementById("lyrics");

  if (!artist || !title) {
    lyricsEl.textContent = "Digite o nome do artista e da música.";
    return;
  }

  lyricsEl.textContent = "🔍 Buscando letra...";

  try {
    const proxyURL = `https://letrasync-proxy.vercel.app/api?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;
    const res = await fetch(proxyURL);
    const data = await res.json();

    if (data && data.lyrics) {
      lyricsEl.textContent = data.lyrics;
    } else {
      lyricsEl.textContent = "❌ Letra não encontrada.";
    }
  } catch (e) {
    console.error("Erro ao buscar letra:", e);
    lyricsEl.textContent = "❌ Erro ao buscar letra. Verifique o nome do artista/música.";
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(() => {
      console.log('✅ Service Worker registrado!');
    });
  });
}
