# Gamified Math Worksheet – Rounding Off to Nearest 10

A modern, gamified math worksheet app built with **Vue 3**, **Vite**, and **Tailwind CSS**. Practice rounding numbers to the nearest 10, track your progress, and compete for the top spot on the scoreboard!

## Features

- **Gamified UI:** Clean, responsive design with avatars, levels, streaks, and stars.
- **Question Flow:** Answer multiple-choice rounding questions with instant feedback and confetti for correct answers.
- **Progress Tracking:** Visual progress bar, daily streaks, and star rewards.
- **Scoreboard:** View and compare your scores with others (saved in localStorage).
- **Modular Components:** All UI split into reusable Vue components for maintainability.
- **Navigation:** Easily switch between worksheet and scoreboard.
- **Accessible:** Keyboard and screen reader friendly, with clear button states.

## Tech Stack
- [Vue 3](https://vuejs.org/) + `<script setup>` SFCs
- [Vite](https://vitejs.dev/) for fast development
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide Icons](https://lucide.dev/icons/) for modern SVG icons

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `src/components/` – All Vue components (worksheet, header, scoreboard, etc.)
- `src/style.css` – Tailwind CSS directives and custom styles
- `tailwind.config.js` – Tailwind configuration
- `postcss.config.js` – PostCSS plugins

## Customization
- **Questions:** Edit the `questions` array in `GamifiedMathWorksheet.vue` to add or change rounding questions.
- **Styling:** Adjust Tailwind classes or extend the theme in `tailwind.config.js`.

## Credits
- Math questions from [mathinenglish.com](https://www.mathinenglish.com)
- Icons by [Lucide](https://lucide.dev/)

---

© 2025 Math in English. Front End Assessment for Bridge International.
