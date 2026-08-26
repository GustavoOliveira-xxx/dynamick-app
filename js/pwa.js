if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', { scope: './', updateViaCache: 'none' }).catch(() => {});
  });
}

let installPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  window.dispatchEvent(new CustomEvent('dynamick:install-ready'));
});

window.dynamickInstall = async () => {
  if (!installPrompt) return false;
  await installPrompt.prompt();
  const accepted = (await installPrompt.userChoice).outcome === 'accepted';
  installPrompt = null;
  return accepted;
};
