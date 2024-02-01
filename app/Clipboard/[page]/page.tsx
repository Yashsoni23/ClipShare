"use client";
import Button from "@/app/Components/Button";
import clipboard from "clipboardy";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import QRCode from "qrcode.react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Clipboard() {
  const [url, setURL] = useState("");
  const socket = io("https://socketend.onrender.com");
  // const socket = io("https://livechat23.adaptable.app");
  const path = usePathname();
  const [baseUrl, setBaseUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [clipboardText, setClipboardText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    socket.on("clipboardData", (data: any) => {
      setClipboardText(data);
    });

    return () => {
      socket.off("clipboardData");
    };
  }, [clipboardText, socket]);

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}` + path);
    setURL(`${window.location.protocol}//${window.location.host}`);
    setIsMobile(window.innerWidth < 500 ? true : false);
  }, []);

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

  const handleCopy = ({ text }: any) => {
    setCopied(true); // Set copied state to true when text is copied
    toast("😉: Text Copied !!");
    setTimeout(() => {
      setCopied(false); // Reset copied state after 2 seconds
    }, 2000);
  };

  return (
    <div className="flex sm:gap-[2vw] max-sm:gap-[2rem]  sm:justify-center sm:items-center  max-sm:flex-col">
      <div className="flex flex-col sm:gap-[2vw] max-sm:gap-[1rem] justify-center items-center">
        <QRCode size={isMobile ? 280 : 400} value={baseUrl} />
        <h1 className="max-sm:hidden text-center p-[.5vw] font-semibold max-sm:text-xl sm:text-[1.2vw] text-slate-700">
          Scan QR code for open clipboard on your mobile
        </h1>
        <Button
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?&text=Open%20this%20link%20to%20your%20browser:%20${baseUrl}`
            )
          }
          hoverColor="hover:bg-green-500/50"
          color="bg-green-500"
          title="Share Link via Whatsapp"
        />
      </div>

      <ToastContainer stacked />
      <div className="flex  flex-col justify-center items-center gap-4">
        <textarea
          className="outline-none max-sm:rounded-2xl max-sm:text-xl sm:text-[1vw] sm:w-[60vw] max-sm:h-[30vh]  sm:h-[70vh]  border-slate-500/20 focus:border-slate-500/50 border-2 sm:p-[2vw] max-sm:p-10 bg-white shadow-xl rounded-[1.5vw]"
          value={clipboardText}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <div className="flex w-full gap-2">
          <Button
            color="bg-red-500"
            hoverColor="hover:bg-red-500/50"
            title="Delete"
            onClick={() => setClipboardText("")}
          />
          <CopyToClipboard text={clipboardText} onCopy={handleCopy}>
            <Button title="Copy" />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
