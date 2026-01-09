"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6 rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          ролевые острова 
        </h1>

        {isLoading && (
          <p className="text-zinc-500">Проверка вашей сессии...</p>
        )}

        {!isLoading && !session && (
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
              Войдите через Гугл-аккаунт, чтобы создавать ролевых персонажей и участвовать в анонимной беседе.
              Проект в разработке.
            </p>
            <button
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              onClick={() => signIn("google")}
            >
              Войти через Google
            </button>
          </div>
        )}

        {!isLoading && session && (
          <div className="flex flex-col gap-4">
            <div className="rounded-md bg-zinc-100 p-4 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
              <p className="font-medium">Вы вошли</p>
              <p className="text-xs text-zinc-400">Email: {session.user?.email}</p>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => signOut()}
            >
              Выйти
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
