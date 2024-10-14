"use client"
import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const controllerRef = useRef(null);

  const url = 'https://deleteoldposts-b67h2kof7a-uc.a.run.app';
  const url2 = 'https://deleteoldusers-b67h2kof7a-uc.a.run.app';

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const sendRequest = async () => {
    if (isPaused) return;

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      const response = await fetch(url, { signal });
      if (response.ok) {
        const text = await response.text();
        addLog(`Request successful: ${text}`);
        sendRequest(); // Call the function again to send another request
      } else {
        addLog(`Request failed: ${response.statusText}`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        addLog('Request canceled');
      } else {
        addLog(`Error: ${error.message}`);
      }
    }
  };

  const startRequests = () => {
    setIsPaused(false);
    sendRequest();
  };

  const cancelRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  const pauseRequests = () => {
    setIsPaused(true);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex gap-4">
          <button onClick={startRequests} className="bg-blue-500 text-white px-4 py-2 rounded">Start Sending Requests</button>
          <button onClick={cancelRequest} className="bg-red-500 text-white px-4 py-2 rounded">Cancel Request</button>
          <button onClick={pauseRequests} className="bg-yellow-500 text-white px-4 py-2 rounded">Pause Requests</button>
        </div>
        <div className="mt-4 w-full">
          <h2 className="text-lg font-bold">Logs:</h2>
          <ul className="list-disc pl-5">
            {logs.map((log, index) => (
              <li key={index} className="text-sm">{log}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
