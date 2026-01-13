"use client"
import CardNav from "@/components/react-bits/CardNav";
import { items } from "../lib/items_list";
import Link from "next/link";

const App = () => {
  return (
    <div className="h-screen w-screen bg-amber-700">
      <CardNav
        items={items}
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <div
        id="hero"
        className="min-h-screen w-full bg-orange-500 relative flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url(/images/tree.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          id="call-to-action"
          className="flex flex-col gap-6 items-center justify-center"
        >
          <h1 className="text-2xl text-white">Your Academic Documents Copilot</h1>
          <h2 className="text-4xl text-white font-crimson-text motion-preset-focus motion-duration-1000 text-center">
            WRITE CITE LEARN
          </h2>
          <p className="text-white text-center">
            Designed to to help students complete Coursework,to focus on
            learning.
          </p>

          <Link
            href="/dashboard"
            className="h-10 w-32 bg-amber-600 hover:bg-amber-700 flex justify-center items-center rounded-sm text-white"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
