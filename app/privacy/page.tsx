export default function Privacy() {
    return (
      <main className="min-h-screen p-8 max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Privacy</h1>
        <p className="opacity-80">
          This site does not require login and does not store your message on a server.
          The message can appear in the URL if you use custom text, so be mindful when sharing links.
        </p>
        <p className="opacity-80">
          이 사이트는 로그인 없이 동작하며 서버에 메시지를 저장하지 않습니다.
          다만 직접 입력 문구를 사용하면 URL에 포함될 수 있으니 링크 공유 시 주의하세요.
        </p>
        <a className="underline" href="/">Back</a>
      </main>
    );
  }
  