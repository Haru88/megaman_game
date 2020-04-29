class Loader {

    static Imagefile(tag, uri) {
        const lUri = uri.toLowerCase();
        return new Promise((resolve, reject) => {
            if (lUri.includes(".png" || ".jpg")) {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.src = lUri;
                img.addEventListener(`load`, () => resolve({ tag: tag, file: img }));
                img.addEventListener('error', () => reject(new Error(`Failed to load image's URL: ${lUri}`)));
            } else {
                return reject(`Format not supported: `, lUri);
            }
        });
    }

    static Audiofile(tag, uri) {
        const lUri = uri.toLowerCase();
        return new Promise((resolve, reject) => {
            if (lUri.includes(".wav" || ".mp3")) {
                const aud = new Audio();
                aud.crossOrigin = "Anonymous";
                aud.src = lUri;
                aud.load();
                aud.volume = 0.3;
                aud.addEventListener(`canplaythrough`, () => resolve({ tag: tag, file: aud }));
                aud.addEventListener('error', () => reject(new Error(`Failed to load Audio's URL: ${lUri}`)));
            } else {
                return reject(`Format not supported: `, lUri);
            }
        });
    }
}