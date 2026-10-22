# 로컬 미리보기 서버 — 캐시 끔 (수정 사항이 바로 보이도록)
import http.server, functools, os

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

root = os.path.dirname(os.path.abspath(__file__))
http.server.ThreadingHTTPServer(('', 5173), functools.partial(NoCache, directory=root)).serve_forever()
