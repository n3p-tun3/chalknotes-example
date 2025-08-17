import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4">
      <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-center mb-2">Welcome to A Chalknotes Example Blog</h1>
        <p className="text-center  text-2xl mb-4">
          This is a simple web app demonstrating the <b>chalknotes</b> npm package. Easily create and display notes or blog posts in your Next.js app.
        </p>
        <Link
          className="p-2 rounded bg-gray-900 text-white text-lg w-full text-center"
          href="/blog"
        >
          Go to Blog
        </Link>
      </main>
      <footer className="mt-8 text-xs text-gray-500 text-center">
        Powered by Next.js & chalknotes
      </footer>
    </div>
  );
}
