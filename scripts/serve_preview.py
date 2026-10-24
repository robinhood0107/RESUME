from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE_PATH = "/RESUME"


class PreviewHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = urlsplit(path).path
        if path == BASE_PATH or path.startswith(BASE_PATH + "/"):
            path = path.removeprefix(BASE_PATH) or "/"
        else:
            path = "/__not_found__"
        return super().translate_path(path)


if __name__ == "__main__":
    handler = partial(PreviewHandler, directory=str(ROOT / "out"))
    print("Preview: http://127.0.0.1:18766/RESUME/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 18766), handler).serve_forever()
