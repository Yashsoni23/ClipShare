"use client";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Button from "./Components/Button";

const socket = io("http://172.20.10.3:3000/");

export default function Home() {
  const generateClipboardID = () => uuidv4().toString();
  const router = useRouter();
  return (
    <>
      <Button
        title="New Clipboard"
        onClick={() => router.push("/Clipboard/" + generateClipboardID())}
      />
    </>
  );
}
