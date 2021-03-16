import { ChevronRightOutline } from "heroicons-react";
import React from "react";
import { Button } from "../components/Button";
import Image from "next/image";
import { Navbar } from "../components/Navbar";

export const LandingPage: React.FC = () => {
  return (
    <main style={{ backgroundColor: "#F8FAFF" }}>
      <div className="h-screen max-w-6xl mx-auto">
        <Navbar />
        <header className="flex flex-col-reverse md:flex-row items-center px-5 mx-auto">
          <div className="flex flex-col space-y-5 md:space-y-6 mt-10 md:mt-0 max-w-lg md:max-w-xl">
            <div className="space-y-3">
              <h1
                className="text-navy font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{ letterSpacing: "-2px" }}
              >
                Host Competitions
              </h1>
              <h1
                className="text-primary-500 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{ letterSpacing: "-2px" }}
              >
                Without the Hassle
              </h1>
            </div>
            <p className="text-slate-dark">
              It’s just the smarter way to host online competitions. Create, publish, and grade 10x
              faster with Contest Pug.
            </p>
            <div className="flex space-x-2">
              <Button suffix={<ChevronRightOutline size={16} />} spacing={4} rounded>
                Start Creating
              </Button>
              <Button colors="text-primary-500 bg-white shadow" rounded secondary>
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              width={503 * 1.25}
              height={404 * 1.25}
              quality={100}
              src="/working.png"
              alt="Working Illustration"
            />
          </div>
        </header>
      </div>
    </main>
  );
};
