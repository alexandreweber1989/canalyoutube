// Language of everything the viewer sees or hears: scripts, narration,
// titles, descriptions, tags, captions and comment replies.
// Set CONTENT_LANGUAGE=en to restore the upstream English behavior.

const LANGUAGES = {
  'pt-BR': {
    code: 'pt-BR',
    // YouTube lists Brazilian Portuguese as "pt" (and European as "pt-PT").
    youtubeCode: 'pt',
    region: 'BR',
    timezone: 'America/Sao_Paulo',
    captionsName: 'Português (Brasil)',
    promptRule: 'Write every viewer-facing word (titles, hooks, narration, descriptions, tags, calls to action, on-screen text) in Brazilian Portuguese (pt-BR). Keep JSON keys and the listed enum values exactly as specified, in English.'
  },
  en: {
    code: 'en',
    youtubeCode: 'en',
    region: 'US',
    timezone: 'America/Chicago',
    captionsName: 'English Captions',
    promptRule: 'Write every viewer-facing word in English.'
  }
};

function getContentLanguage() {
  const requested = String(process.env.CONTENT_LANGUAGE || 'pt-BR').trim();
  return LANGUAGES[requested] || LANGUAGES[requested.split('-')[0]] || LANGUAGES['pt-BR'];
}

module.exports = { getContentLanguage, LANGUAGES };
