# 🍋 Little Lemon Website

> **Meta Front-End Developer Capstone Project** — A complete redesign and implementation of the Little Lemon restaurant's table booking experience, built as the final capstone for the [Meta Front-End Development Professional Certificate](https://www.coursera.org/professional-certificates/meta-front-end-developer).

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://meta-capstone-project-three.vercel.app/)
[![Figma Wireframe](https://img.shields.io/badge/Wireframe-Figma-F24E1E?style=for-the-badge&logo=figma)](https://www.figma.com/design/MSpLKRZ9IqjZM6zgWDUUuI/Little-lemon-wireframe?node-id=58007-25&t=z9JmSXJBDlDHeqXC-1)
[![Figma Prototype](https://img.shields.io/badge/Prototype-Figma-F24E1E?style=for-the-badge&logo=figma)](https://www.figma.com/file/F57MNIYm7Wb30YVrEw2Byt/Capstone---Applying-Design-Fundamentals%2F-Prototype?type=design&node-id=339-609&mode=design&t=7ROLiOxixlKHa8LI-0)

---

## 📋 Table of Contents

- [Live Preview](#-live-preview)
- [Problem Statement](#-problem-statement)
- [UX & UI Planning](#-ux--ui-planning)
  - [Wireframe](#wireframe)
  - [Final Design](#final-design)
- [Tech Stack](#-tech-stack)
- [Features](#-features)

---

## 🌐 Live Preview

| | |
|---|---|
| **URL** | [https://meta-capstone-project-three.vercel.app/](https://meta-capstone-project-six.vercel.app/) |
| **Hosting** | Vercel |

---

## 🎯 Problem Statement

The Little Lemon restaurant had been receiving consistent negative feedback regarding the table reservation functionality on their website. Users found the booking flow confusing, visually unappealing, and difficult to navigate, leading to a poor overall experience.

This project set out to address those pain points by redesigning and rebuilding the entire reservation flow from scratch — prioritising clarity, accessibility, and a smooth end-to-end user journey.

### Booking Page Requirements

Users arriving at the booking page must be able to:

- Navigate to it directly from the homepage or the main navigation bar
- Select a preferred date for their visit
- Choose from a list of available time slots
- Specify the number of guests in their party
- Choose their preferred seating location

**Validation is enforced** to prevent incomplete or invalid submissions:
- A selected date that falls before today's date
- A guest count of fewer than one person
- Any form field left unanswered

### Contact Information Page Requirements

After completing the booking details, users must be able to:

- Provide their full name, phone number, and email address
- Indicate the occasion for their visit
- Add optional comments or special requests
- Receive a clear confirmation once their reservation is successfully submitted

**Validation is enforced** for the following scenarios:
- An improperly formatted name
- An invalid phone number
- An invalid or malformed email address
- Any required field left blank

---

## 🎨 UX & UI Planning

### Wireframe
<img width="1920" height="6417" alt="Little-lemon-wireframe" src="https://github.com/user-attachments/assets/43a92dc4-9366-4f83-ba10-dcebbd9d2822" />

The design process began with a low-fidelity wireframe covering all key pages and UI components. At this stage, the focus was placed entirely on layout, information hierarchy, and user flow — without any colours, imagery, or stylistic detail. This phase also served as an opportunity to map out the functional requirements identified during problem analysis and to incorporate insights drawn from real user feedback.

📐 **[View the full Wireframe on Figma →](https://www.figma.com/design/MSpLKRZ9IqjZM6zgWDUUuI/Little-lemon-wireframe?node-id=58007-25&t=z9JmSXJBDlDHeqXC-1)**

---

### Final Design

With the wireframe as a foundation, the final design phase introduced:

- A consistent **typography system** — carefully selected font families, weights, and sizes tailored for readability and brand alignment
- **Brand-accurate colour palette** — faithful to Little Lemon's official colour scheme, applied across all components
- **Responsive layouts** — fully adapted for mobile viewports, ensuring a seamless experience on smaller screens
- **Reusable component library** — modular, scalable UI components that reflect the final product's structure
- **Interactive prototype** — a clickable prototype simulating real page transitions and component interactions

🎨 **[View the Final Design & Prototype on Figma →](https://www.figma.com/design/4Z2MGIOkuFzYdwtegw9pTb/Little-lemon?node-id=2-1242&t=LFAi46lUFFEZ3nRp-1)**

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React** | Component-based UI architecture |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript (ES6+)** | Application logic and interactivity |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5** | Semantic markup structure |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3** | Styling, layout, and responsiveness |
| ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white) **Figma** | UX wireframing and UI prototyping |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) **Vercel** | Deployment and hosting |

---

## ✨ Features

- **Multi-step reservation flow** with intuitive navigation between booking stages
- **Real-time form validation** with meaningful, contextual error messages
- **Responsive design** that adapts gracefully from desktop to mobile
- **Accessible UI** built with semantic HTML and clear visual hierarchy
- **Booking confirmation** screen delivered upon successful form submission
- **Occasion tagging** — users can flag reservations for birthdays, anniversaries, and more

---

<p align="center">
  Built with ❤️ as part of the <a href="https://www.coursera.org/professional-certificates/meta-front-end-developer">Meta Front-End Developer Certificate</a>
</p>
