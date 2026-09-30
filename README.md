# Apex Diagnostics — Precision Diagnostic Center & Healthcare Management System

[![Next.js](https://img.shields.io/badge/Next.js-15.0+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An enterprise-grade, full-stack Hospital & Diagnostic Center Management System built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. 

Inspired by the clean, minimalist aesthetic of the **Klaas Medical Template**, the platform features a tailored 8-color clinical palette, full-width fluid layouts, and Google Font **Gilda Display** serif typography.

---

## 🎨 Curated Design Palette

| Color | HEX | Usage |
| :--- | :--- | :--- |
| 🟢 **Primary Green** | `#A8D5BA` | Main Accent / Primary Action CTAs |
| 🟢 **Soft Green** | `#DDEDE3` | Subtle Badges, Active States & Card Highlights |
| ⚫ **Deep Charcoal** | `#171717` | Premium Headings, Dark Sections & Sidebar |
| ⚪ **Off White** | `#F7F7F3` | Global Canvas Background |
| ⚪ **Pure White** | `#FFFFFF` | Card Surfaces & Main Navigation |
| 🩶 **Soft Gray** | `#E8E8E3` | Dividers & Elegant Borders |
| 🩶 **Text Gray** | `#70706B` | Secondary Text & Micro-copy |
| 🟢 **Dark Green** | `#315C4A` | Interactive Hover States & Dark Accent |

---

## 🌟 Key Features

### 1. 🏥 Multi-Page Public Healthcare Portal
- **Fluid Full-Width Navbar**: Edge-to-edge header with 24/7 emergency hotline, sample collection notice, and portal access.
- **Hero & Emergency Hub**: Panoramic diagnostic lab imagery, ISO 15189 accreditation badge, and quick diagnostic links.
- **Clinical Service Categories**: Asymmetric bento grid covering Pathology, 3.0T MRI, 128-Slice CT, 4D Ultrasound, and Cardiology.
- **Diagnostic Tests & Pricing Directory**: Searchable catalog with preparation instructions, turnaround times, and pricing.
- **Doctor Consultation Booking**: Real-time slot selection and doctor profiles across specialties.
- **Home Specimen Collection**: Direct booking for home phlebotomy pickup.
- **QR Report Authenticity Verification**: Cryptographically verifiable online report lookup (`/verify/[reportId]`).
- **Branch Locator**: Multi-branch information (Dhanmondi, Gulshan, Uttara) with GPS maps and contact details.

---

### 2. 🛡️ Role-Based Access Control (RBAC) & 5 Isolated Portals

Every staff role and patient operates within a dedicated, isolated portal environment. Only **Super Admin** holds unrestricted master access across all modules.

| Role | Portal Name | Scope & Accessible Modules |
| :--- | :--- | :--- |
| 👑 **Super Admin** | **Master Administrative Suite** | **100% Unrestricted Access**: Hospital financials, staff roles, branch network, lab workbench, patient directories, audit logs, and settings. |
| 🩺 **Doctor** | **Doctor Clinical Portal** | Appointments calendar, patient medical records, diagnostic test directory, and laboratory report digital sign-off. |
| 🔬 **Technician** | **Laboratory Workbench** | Phlebotomy sample intake, barcoded tube queues, automated Roche analyzer workbench, and result entry. |
| 💼 **Receptionist** | **Front Desk & Reception** | Token queue management, patient registration, doctor appointments, test orders, cash counter, and invoice issuance. |
| 👤 **Patient** | **Patient Health Portal** | Personal test history, certified QR report downloads, appointment tracking, and payment receipts. |

#### 🔒 Strict 403 Route Guard
Unauthorized direct URL access by non-admin roles (e.g. a Doctor attempting to visit `/dashboard/billing` or a Technician visiting `/dashboard/users`) is intercepted by an **Access Restricted** barrier with instant return navigation.

---

## 🔑 Demo Access Credentials

The login page (`/login`) includes **1-Click Instant Demo Credentials** for testing all roles:

| Role | Email | Password | Landing Route |
| :--- | :--- | :--- | :--- |
| 👑 **Super Admin** | `admin@diagnoaid.com` | `demo123456` | `/dashboard` |
| 🩺 **Doctor** | `doctor@diagnoaid.com` | `demo123456` | `/dashboard` |
| 🔬 **Lab Technologist** | `tech@diagnoaid.com` | `demo123456` | `/dashboard` |
| 💼 **Receptionist** | `receptionist@diagnoaid.com` | `demo123456` | `/dashboard` |
| 👤 **Patient** | `patient@diagnoaid.com` | `demo123456` | `/patient/dashboard` |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Vanilla CSS variables
- **Typography**: [Google Fonts Gilda Display](https://fonts.google.com/specimen/Gilda+Display) (Serif) & Inter (Sans-serif)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Telemetry**: [Recharts](https://recharts.org/)
- **Authentication**: JWT (JSON Web Tokens) with secure HTTP-only cookies & Bcrypt hashing
- **Containerization**: Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.18+ or v20+
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SamiumBashir/medicalmanagement.git
   cd medicalmanagement
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open the Application**:
   Navigate to [http://localhost:3000](http://localhost:3000) (or the active local port).

---

## 🐳 Docker Deployment

Run the complete diagnostic suite using Docker:

```bash
# Build and run containers
docker-compose up -d --build

# View container logs
docker-compose logs -f
```

---

## 📁 Project Structure

```
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router multi-page routes
│   │   ├── (public)/       # Landing, about, services, doctors, branches, tests
│   │   ├── api/            # Authentication, orders, appointments, reports APIs
│   │   ├── book-*/         # Online test & appointment booking engines
│   │   ├── dashboard/      # Master operations center & role-guarded portals
│   │   ├── login/          # 1-Click demo role login portal
│   │   ├── patient/        # Dedicated patient self-service portal
│   │   └── verify/         # Cryptographic report QR verification
│   ├── components/
│   │   ├── public/         # Klaas-inspired public sections (Navbar, Hero, Footer, etc.)
│   │   └── ui/             # Reusable UI primitives (Button, Card, Input, Badge)
│   ├── lib/
│   │   ├── auth/           # JWT token generation & verification
│   │   ├── permissions/    # RBAC matrix & route access rules
│   │   └── services/       # Clinical data store & mock data generators
│   ├── models/             # Schema definitions for Patients, Tests, Reports, Invoices
│   └── types/              # TypeScript interfaces and UserRole enums
├── Dockerfile              # Production container build definition
├── docker-compose.yml      # Multi-service composition
├── tailwind.config.ts      # Custom clinical palette & typography configuration
└── package.json            # Scripts & project dependencies
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
