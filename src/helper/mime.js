const path = require('path');
const mimeTypes = {
    ".css": "text/css",
    ".gif": "image/gif",
    ".html": "text/html",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "application/x-javascript",
    ".movie": "video/x-sgi-movie",
    ".mp2": "video/mpeg",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".nokia-op-logo": "image/vnd.nok-oplogo-color",
    ".npx": "application/x-netfpx",
    ".nsnd": "audio/nsnd",
    ".png": "image/png",
    ".pqf": "application/x-cprplayer",
    ".svg": "image/svg+xml",
    ".txt": "text/plain",
    ".xhtm": "application/xhtml+xml",
    ".xhtml": "application/xhtml+xml",
    ".zip": "application/zip",
    ".json": "application/json"
}

module.exports = (filePath) => {
    let ext = path.extname(filePath).split('-').pop().toLowerCase();

    if (!ext) {
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['.txt'];
}