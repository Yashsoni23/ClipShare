"use client";
import Button from "@/app/Components/Button";
import clipboard from "clipboardy";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import QRCode from "qrcode.react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clipboard() {
  const socket = io("http://172.20.10.3:3000/");
  const path = usePathname();
  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  const [clipboardText, setClipboardText] = useState("");

  useEffect(() => {
    console.log({ baseUrl, path });
    socket.on("clipboardData", (data: any) => {
      setClipboardText(data);
    });

    return () => {
      socket.off("clipboardData");
    };
  }, [clipboardText, socket]);

  const handleChange = (event: any) => {
    const text = event.target.value;
    setClipboardText(text);
    socket.emit("clipboardData", text);
  };
  const shareData = {
    title: "MDN",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  };

  const handlePaste = async () => {
    try {
      const text = navigator.canShare(shareData);
      console.log(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex sm:gap-[2vw] max-sm:gap-[2rem]  sm:justify-center sm:items-center  max-sm:flex-col">
      <QRCode size={250} value={baseUrl + path} />
      <div className="flex  flex-col justify-center items-center gap-4">
        <textarea
          className="outline-none max-sm:rounded-2xl sm:w-[60vw] max-sm:h-[30vh]  sm:h-[70vh]  border-slate-500/20 focus:border-slate-500/50 border-2 sm:p-[2vw] max-sm:p-10 bg-white shadow-xl rounded-[1.5vw]"
          value={clipboardText}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <div className="flex w-full gap-2">
          <Button title="Delete" onClick={handlePaste} />
          <Button title="Copy" onClick={handlePaste} />
        </div>
      </div>
    </div>
  );
}
