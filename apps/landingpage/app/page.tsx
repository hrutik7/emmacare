import Here from "./components/here";
import Hero from "./components/herosection";
import Navbar from "./components/nav-bar";
import WhatIs from "./components/whatis";
import Footer from "./components/footer";
export default function Page(): JSX.Element {
  return (
    <div className="md:mr-[2%] md:ml-[2%]">
      <Navbar />
      <Hero />
      <WhatIs />
      <Here />
      <Footer />
    </div>
  );
}
