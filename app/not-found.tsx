import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">页面未找到</p>
      <p className="mt-2 text-gray-500">很抱歉，您请求的页面不存在。</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-violet-600 px-6 py-2 text-white hover:bg-violet-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}