"use client";

import { useEffect, useState, type ReactNode } from "react";

type WindowName =
  | "projects"
  | "terminal"
  | "about"
  | "skills"
  | "education"
  | "contact";

type ProjectData = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const projects: ProjectData[] = [
  {
    name: "EuroSAT — Land Use & Land Cover Classification",
    description:
      "An image classification project for identifying different land-use and land-cover categories from satellite imagery.",
    tech: ["Python", "TensorFlow", "ResNet50", "NumPy", "Matplotlib"],
  },
  {
    name: "ParaDetect",
    description:
      "A computer vision application for detecting malaria-infected cells from microscopic blood cell images.",
    tech: ["Python", "TensorFlow", "OpenCV", "Streamlit", "NumPy"],
    github: "https://github.com/manaswi-7/ParaDetect",
  },
  {
    name: "Violence Detection",
    description:
      "A computer vision system that analyzes video or webcam input and detects potentially violent activity.",
    tech: ["Python", "OpenCV", "TensorFlow", "Computer Vision"],
    github: "https://github.com/Usharani3112/Violence-Detection",
  },
];

const skills = {
  Languages: ["C", "Java", "Python", "SQL"],
  "AI / ML": ["TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib"],
  Web: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "Computer Networks"],
  Tools: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  Other: ["Streamlit", "Blockchain"],
};

export default function Home() {
  const [openWindows, setOpenWindows] = useState<WindowName[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowName | null>(null);
  const [time, setTime] = useState("");

  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to manaswi.dev terminal.",
    'Type "help" to see available commands.',
  ]);

  const [terminalInput, setTerminalInput] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const openWindow = (windowName: WindowName) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows((prev) => [...prev, windowName]);
    }

    setActiveWindow(windowName);
  };

  const closeWindow = (windowName: WindowName) => {
    setOpenWindows((prev) => prev.filter((item) => item !== windowName));

    if (activeWindow === windowName) {
      setActiveWindow(null);
    }
  };

  const runCommand = () => {
    const command = terminalInput.trim().toLowerCase();

    if (!command) return;

    let output: string[] = [];

    switch (command) {
      case "help":
        output = [
          "Available commands:",
          "about      → about me",
          "projects   → view projects",
          "skills     → view skills",
          "education  → view education",
          "github     → open GitHub",
          "resume     → open resume",
          "contact    → contact information",
          "clear      → clear terminal",
        ];
        break;

      case "about":
        output = [
          "Manaswi",
          "4th Year CSE Student",
          "Interested in software development, AI/ML and computer vision.",
        ];
        break;

      case "projects":
        output = projects.map((project) => `• ${project.name}`);
        break;

      case "skills":
        output = [
          "C, Java, Python, SQL",
          "TensorFlow, Keras, OpenCV, NumPy",
          "React, Next.js, JavaScript",
          "DSA, OOP, DBMS, OS, Computer Networks",
        ];
        break;

      case "education":
        output = [
          "B.Tech CSE",
          "G. Narayanamma Institute of Technology and Science",
          "2023 — 2027",
          "",
          "Intermediate",
          "Sri Chaitanya Junior College",
          "2021 — 2023",
        ];
        break;

      case "github":
        window.open("https://github.com/manaswi-7", "_blank");
        output = ["Opening GitHub..."];
        break;

      case "resume":
        window.open("/resume.pdf", "_blank");
        output = ["Opening resume..."];
        break;

      case "contact":
        output = [
          "Email: Add your email",
          "LinkedIn: Add your LinkedIn",
        ];
        break;

      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;

      default:
        output = [
          `Command not found: ${command}`,
          'Type "help" to see available commands.',
        ];
    }

    setTerminalHistory((prev) => [
      ...prev,
      `$ ${command}`,
      ...output,
    ]);

    setTerminalInput("");
  };

  const handleTerminalKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      runCommand();
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* TOP BAR */}
      <header className="relative z-20 flex h-12 items-center justify-between border-b border-emerald-500/20 bg-black/70 px-5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <span className="ml-3 font-mono text-sm text-emerald-400">
            manaswi.dev
          </span>
        </div>

        <div className="flex items-center gap-5 font-mono text-xs text-gray-400">
          <span>DEVELOPER WORKSPACE</span>

          <span className="text-emerald-400">{time}</span>
        </div>
      </header>

      {/* MAIN DESKTOP */}
      <section className="relative min-h-[calc(100vh-48px)]">
        {/* HERO */}
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-16">
          <div className="max-w-3xl">
            <p className="font-mono text-sm text-emerald-400">
              $ whoami
            </p>

            <h1 className="mt-3 text-6xl font-bold tracking-tight">
              Manaswi<span className="text-emerald-400">.</span>
            </h1>

            <p className="mt-4 font-mono text-lg text-gray-400">
              4th Year CSE Student
            </p>

            <p className="mt-5 max-w-2xl text-gray-400 leading-7">
              I build software projects across computer science,
              artificial intelligence, machine learning and computer
              vision, while continuously exploring new technologies.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => openWindow("projects")}
                className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 font-mono text-sm text-emerald-300 transition hover:bg-emerald-400/20"
              >
                Explore Projects
              </button>

              <button
                onClick={() => openWindow("terminal")}
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-mono text-sm text-gray-300 transition hover:bg-white/10"
              >
                Open Terminal
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-mono text-sm text-cyan-300 transition hover:bg-cyan-400/20"
              >
                Resume ↗
              </a>

              <a
                href="https://github.com/manaswi-7"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-mono text-sm text-gray-300 transition hover:bg-white/10"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP ICONS */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 pb-32 sm:grid-cols-3 md:grid-cols-6">
          <DesktopIcon
            icon="📁"
            label="Projects"
            onClick={() => openWindow("projects")}
          />

          <DesktopIcon
            icon="⌨"
            label="Terminal"
            onClick={() => openWindow("terminal")}
          />

          <DesktopIcon
            icon="👤"
            label="About"
            onClick={() => openWindow("about")}
          />

          <DesktopIcon
            icon="⚙"
            label="Skills"
            onClick={() => openWindow("skills")}
          />

          <DesktopIcon
            icon="🎓"
            label="Education"
            onClick={() => openWindow("education")}
          />

          <DesktopIcon
            icon="✉"
            label="Contact"
            onClick={() => openWindow("contact")}
          />
        </div>

        {/* WINDOWS */}
        {openWindows.map((windowName) => (
          <Window
            key={windowName}
            title={windowName}
            active={activeWindow === windowName}
            onFocus={() => setActiveWindow(windowName)}
            onClose={() => closeWindow(windowName)}
          >
            {windowName === "projects" && (
              <ProjectsContent />
            )}

            {windowName === "terminal" && (
              <TerminalContent
                history={terminalHistory}
                input={terminalInput}
                setInput={setTerminalInput}
                onKeyDown={handleTerminalKeyDown}
              />
            )}

            {windowName === "about" && <AboutContent />}

            {windowName === "skills" && <SkillsContent />}

            {windowName === "education" && <EducationContent />}

            {windowName === "contact" && <ContactContent />}
          </Window>
        ))}

        {/* TASKBAR */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-emerald-500/20 bg-black/80 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => openWindow("terminal")}
                className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 font-mono text-xs text-emerald-300"
              >
                ⌘ Terminal
              </button>

              {openWindows.map((windowName) => (
                <button
                  key={windowName}
                  onClick={() => setActiveWindow(windowName)}
                  className={`hidden rounded-lg border px-3 py-2 font-mono text-xs sm:block ${
                    activeWindow === windowName
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-white/10 bg-white/5 text-gray-400"
                  }`}
                >
                  {windowName}
                </button>
              ))}
            </div>

            <div className="font-mono text-xs text-gray-500">
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================
   DESKTOP ICON
========================= */

function DesktopIcon({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center rounded-xl border border-transparent p-5 transition hover:border-emerald-400/20 hover:bg-emerald-400/5"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl shadow-lg transition group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10">
        {icon}
      </div>

      <span className="mt-3 font-mono text-xs text-gray-400 group-hover:text-emerald-300">
        {label}
      </span>
    </button>
  );
}

/* =========================
   WINDOW
========================= */

function Window({
  title,
  children,
  active,
  onFocus,
  onClose,
}: {
  title: string;
  children: ReactNode;
  active: boolean;
  onFocus: () => void;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onFocus}
      className={`fixed left-1/2 top-1/2 z-40 w-[92%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border bg-[#090d0b]/95 shadow-2xl backdrop-blur-xl ${
        active
          ? "border-emerald-400/30 shadow-emerald-500/10"
          : "border-white/10"
      }`}
    >
      <div className="flex h-11 items-center justify-between border-b border-white/10 bg-black/40 px-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>

          <span className="font-mono text-xs text-gray-400">
            {title}
          </span>
        </div>

        <button
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="font-mono text-xs text-gray-500 transition hover:text-red-400"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
}

/* =========================
   PROJECTS
========================= */

function ProjectsContent() {
  return (
    <div>
      <p className="font-mono text-sm text-emerald-400">
        ~/projects
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        Selected Projects
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-400/20 hover:bg-white/[0.05]"
          >
            <h3 className="font-semibold text-white">
              {project.name}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-emerald-400/10 bg-emerald-400/5 px-2 py-1 font-mono text-xs text-emerald-300"
                >
                  {technology}
                </span>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block font-mono text-xs text-gray-400 transition hover:text-emerald-300"
              >
                GitHub ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   TERMINAL
========================= */

function TerminalContent({
  history,
  input,
  setInput,
  onKeyDown,
}: {
  history: string[];
  input: string;
  setInput: (value: string) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div className="font-mono text-sm">
      <div className="space-y-2 text-gray-400">
        {history.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className={
              line.startsWith("$")
                ? "text-emerald-400"
                : ""
            }
          >
            {line || "\u00A0"}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-emerald-400">$</span>

        <input
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent text-white outline-none"
          placeholder="type a command..."
        />
      </div>
    </div>
  );
}

/* =========================
   ABOUT
========================= */

function AboutContent() {
  return (
    <div>
      <p className="font-mono text-sm text-emerald-400">
        ~/about
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        About Me
      </h2>

      <p className="mt-5 max-w-2xl leading-7 text-gray-400">
        I&apos;m Manaswi, a 4th-year Computer Science and
        Engineering student at G. Narayanamma Institute of
        Technology and Science.
      </p>

      <p className="mt-4 max-w-2xl leading-7 text-gray-400">
        I enjoy building practical software projects and
        exploring areas such as artificial intelligence,
        machine learning, computer vision and web development.
      </p>

      <p className="mt-4 font-mono text-sm text-emerald-300">
        Current focus → Software Development + AI/ML
      </p>
    </div>
  );
}

/* =========================
   SKILLS
========================= */

function SkillsContent() {
  return (
    <div>
      <p className="font-mono text-sm text-emerald-400">
        ~/skills
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        Technical Skills
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h3 className="font-mono text-sm text-emerald-300">
              {category}
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   EDUCATION
========================= */

function EducationContent() {
  return (
    <div>
      <p className="font-mono text-sm text-emerald-400">
        ~/education
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        Education
      </h2>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-sm text-emerald-300">
            2023 — 2027
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            B.Tech — Computer Science & Engineering
          </h3>

          <p className="mt-2 text-gray-400">
            G. Narayanamma Institute of Technology and Science
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Hyderabad, Telangana
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-sm text-emerald-300">
            2021 — 2023
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            Intermediate
          </h3>

          <p className="mt-2 text-gray-400">
            Sri Chaitanya Junior College
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================
   CONTACT
========================= */

function ContactContent() {
  return (
    <div>
      <p className="font-mono text-sm text-emerald-400">
        ~/contact
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        Let&apos;s Connect
      </h2>

      <div className="mt-6 space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <span className="font-mono text-xs text-gray-500">
            EMAIL
          </span>

          <p className="mt-1 text-gray-300">
            Add your email here
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <span className="font-mono text-xs text-gray-500">
            LINKEDIN
          </span>

          <p className="mt-1 text-gray-300">
            Add your LinkedIn here
          </p>
        </div>

        <a
          href="https://github.com/manaswi-7"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-400/20"
        >
          <span className="font-mono text-xs text-gray-500">
            GITHUB
          </span>

          <p className="mt-1 text-emerald-300">
            github.com/manaswi-7 ↗
          </p>
        </a>
      </div>
    </div>
  );
}