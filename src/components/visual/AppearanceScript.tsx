/**
 * Aplica tema, escala de texto, contraste, movimento e intensidade visual no
 * <html> antes da primeira pintura, evitando "flash" de tema errado.
 * Sem dependências e sem dados sensíveis — apenas preferências de interface.
 */
export function AppearanceScript({
  theme,
  textScale,
  highContrast,
  reducedMotion,
  visualIntensity,
}: {
  theme: string;
  textScale: string;
  highContrast: boolean;
  reducedMotion: string;
  visualIntensity: string;
}) {
  const payload = JSON.stringify({ theme, textScale, highContrast, reducedMotion, visualIntensity });
  const script = `(function(){try{var p=${payload};var r=document.documentElement;
r.dataset.theme=p.theme;r.dataset.textScale=p.textScale;
if(p.highContrast)r.dataset.contrast='high';else delete r.dataset.contrast;
if(p.reducedMotion==='always')r.dataset.motion='reduced';else delete r.dataset.motion;
if(p.visualIntensity==='reduced')r.dataset.visual='reduced';else delete r.dataset.visual;
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
