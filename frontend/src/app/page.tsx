
import Link from "next/link";
import Image from "next/image";
import { relative } from "path";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 bg-white overflow-hidden scroll-smooth">
      <div id="hero" className="min-h-screen w-full bg-orange-500 relative flex flex-col items-center justify-center" style={{backgroundImage: 'url(/images/nature.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <nav className=" flex justify-between w-[80%] mx-auto my-8 text-xl absolute top-5" >
          <h2>ORUNOS</h2>
          <ul className="hidden md:flex gap-4">
            <li><Link  href="" >HOME</Link></li>
            <li><Link  href="" >FAQs</Link></li>
            <li><Link  href="" >ABOUT</Link></li>
            <li><Link  href="" >CONTACT</Link></li>
          </ul>
          <Link href="" className="h-8 w-16">LOGIN</Link>
        </nav>
        <div id="call-to-action" className="flex flex-col gap-6 items-center justify-center">
          <h1 className="text-2xl text-white">Your AI Study Buddy</h1>
          <h2 className="text-4xl text-black font-crimson-text motion-preset-focus motion-duration-1000 text-center">WRITE CITE LEARN</h2>
          <p className="text-white text-center">Designed to to help students complete Coursework,to focus on learning.</p>

          <Link href="/dashboard" className="h-10 w-32 bg-amber-600 hover:bg-amber-700 flex justify-center items-center rounded-sm text-white">GET STARTED</Link>
        </div>
      </div>
      <div className="grid grid-rows-2  px-4">
        <blockquote className=" text-3xl row-span-1">
          Tech Is Changing ∴ <br />
          So should your Learning Flow.
        </blockquote>
        <p className="">
        Lorem ipsum amet exercitation est aliquip sed ut dolor sit anim elit officia sunt. Duis adipiscing laborum pariatur ex veniam cupidatat magna. Ea nulla culpa minim do ad aliqua laboris deserunt quis mollit labore. Esse eiusmod tempor. Ullamco non excepteur do cupidatat.
        </p>
      </div>

      <div id="features" className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-1">
        <div className="h-[70vh] bg-black" style={{backgroundImage: 'url(/images/globe_ft.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className="h-[70vh] bg-black" style={{backgroundImage: 'url(/images/globe_ft.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className="h-[70vh] bg-black" style={{backgroundImage: 'url(/images/globe_ft.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
      </div>
      <div className="h-screen w-ful">
        <Image src={"/images/civilization.jpg"} height={1657} width={3000} alt="civilization" className=" h-[50vh] w-auto"/>
        <Image src={"/images/growth.png"} height={1657} width={3000} alt="civilization" style={{height : "50vh"}} className="absolute z-50 -mt-[50%]"/>
      </div>
        
    </div>
  );
}

