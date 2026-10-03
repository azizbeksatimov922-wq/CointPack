export default function StartScreen({ onStart, onLogin }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-blue-600 to-indigo-950 p-8 text-center text-white">
      <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
      <h1 className="text-5xl font-bold">StartApp</h1>
      <p>Katta maqsadlar,<br />kichik qadamlar bilan boshlanadi!</p>
      <button onClick={onStart} className="mt-12 w-full max-w-sm rounded-xl bg-white py-3.5 font-semibold text-blue-700">Boshlash</button>
      <button onClick={onLogin} className="text-sm underline">Hisobim bor</button>
    </div>
  );
}