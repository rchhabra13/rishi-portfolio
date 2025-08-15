import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${theme === "dark" ? "bg-slate-900/60 border-slate-700" : "bg-white/70 backdrop-blur border-slate-200"}`}>
              <h1
                onClick={() => router.push("/")}
                className="font-semibold tracking-tight link"
              >
                {name}
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <img
                      className="h-6"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                    ></img>
                  </Button>
                )}

                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  ></img>
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              {(
                <div className="grid grid-cols-1">
                  <Button onClick={handleWorkScroll}>Work</Button>
                  <Button onClick={handleAboutScroll}>About</Button>
                  {showResume && (
                    <Button
                      onClick={() => router.push("/resume")}>
                      Experience
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      window.open(
                        (data.socials.find((s) => s.title === "Email") || {}).link ||
                          "mailto:Rishi.chhabra@outlook.com"
                      )
                    }
                  >
                    Contact
                  </Button>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`sticky top-0 z-20 hidden tablet:flex items-center justify-between mt-6 px-6 py-3 rounded-xl border ${
          theme === "dark" ? "bg-slate-900/60 border-slate-700 text-white" : "bg-white/70 backdrop-blur border-slate-200"
        }`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-semibold cursor-pointer tracking-tight"
        >
          {name}.
        </h1>
        <nav className="flex items-center gap-2">
          <Button classes="px-3 py-1" onClick={handleWorkScroll}>Work</Button>
          <Button classes="px-3 py-1" onClick={handleAboutScroll}>About</Button>
          {showResume && (
            <Button classes="px-3 py-1" onClick={() => router.push("/resume")}>Experience</Button>
          )}
          <Button
            classes="px-3 py-1"
            onClick={() =>
              window.open(
                (data.socials.find((s) => s.title === "Email") || {}).link ||
                  "mailto:Rishi.chhabra@outlook.com"
              )
            }
          >
            Contact
          </Button>
          {mounted && theme && data.darkMode && (
            <Button classes="px-3 py-1" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <img className="h-6" src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`} />
            </Button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;