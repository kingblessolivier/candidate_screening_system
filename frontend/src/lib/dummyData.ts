import { Candidate } from "@/types";

// 25 realistic candidates following the Umurava Talent Profile Schema exactly
const DUMMY_CANDIDATES: Partial<Candidate>[] = [
  {
    firstName: "Amara", lastName: "Nkosi",
    email: "amara.nkosi@example.com",
    headline: "Senior Backend Engineer – Node.js & AI Systems",
    bio: "5+ years building scalable APIs and AI-integrated backends. Passionate about developer tooling and distributed systems.",
    location: "Kigali, Rwanda",
    skills: [
      { name: "Node.js", level: "Expert", yearsOfExperience: 5 },
      { name: "TypeScript", level: "Advanced", yearsOfExperience: 4 },
      { name: "PostgreSQL", level: "Advanced", yearsOfExperience: 4 },
      { name: "MongoDB", level: "Intermediate", yearsOfExperience: 3 },
      { name: "Docker", level: "Advanced", yearsOfExperience: 3 },
      { name: "AWS", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "Kinyarwanda", proficiency: "Native" }],
    experience: [
      {
        company: "Andela", role: "Senior Software Engineer", startDate: "2021-03", endDate: "Present", isCurrent: true,
        description: "Lead backend engineer for a team of 6, building microservices architecture serving 500k+ users. Reduced API latency by 40% through caching and query optimization.",
        technologies: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kubernetes"],
      },
      {
        company: "Irembo", role: "Software Engineer", startDate: "2019-06", endDate: "2021-02", isCurrent: false,
        description: "Built REST APIs for Rwandan e-government platform. Implemented payment gateway integration and SMS notifications.",
        technologies: ["Node.js", "MongoDB", "Express", "Docker"],
      },
    ],
    education: [{ institution: "University of Rwanda", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2015, endYear: 2019 }],
    certifications: [
      { name: "AWS Certified Developer – Associate", issuer: "Amazon", issueDate: "2022-05" },
      { name: "MongoDB Certified Developer", issuer: "MongoDB", issueDate: "2021-09" },
    ],
    projects: [
      {
        name: "AI Resume Parser", description: "Built an LLM-powered resume parsing API that extracts structured data from PDFs with 94% accuracy", role: "Lead Developer",
        technologies: ["Node.js", "Gemini API", "PostgreSQL", "Docker"], startDate: "2023-06", endDate: "2023-11", link: "https://github.com/example",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
    socialLinks: { linkedin: "https://linkedin.com/in/amara-nkosi", github: "https://github.com/amara-nkosi" },
  },
  {
    firstName: "Chiamaka", lastName: "Obi",
    email: "chiamaka.obi@example.com",
    headline: "Full Stack Engineer – React & Node.js",
    bio: "Building beautiful, performant web applications for 4 years. Obsessed with UX and clean code.",
    location: "Lagos, Nigeria",
    skills: [
      { name: "React", level: "Expert", yearsOfExperience: 4 },
      { name: "Next.js", level: "Advanced", yearsOfExperience: 3 },
      { name: "Node.js", level: "Advanced", yearsOfExperience: 3 },
      { name: "TypeScript", level: "Advanced", yearsOfExperience: 3 },
      { name: "GraphQL", level: "Intermediate", yearsOfExperience: 2 },
      { name: "Tailwind CSS", level: "Expert", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Igbo", proficiency: "Native" }],
    experience: [
      {
        company: "Flutterwave", role: "Frontend Engineer", startDate: "2022-01", endDate: "Present", isCurrent: true,
        description: "Developed merchant dashboard serving 100k+ businesses. Led migration from class components to React hooks, improving performance by 30%.",
        technologies: ["React", "Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      },
      {
        company: "Paystack", role: "Junior Frontend Engineer", startDate: "2020-04", endDate: "2021-12", isCurrent: false,
        description: "Built and maintained payment UI components used across multiple products.",
        technologies: ["React", "JavaScript", "CSS", "REST APIs"],
      },
    ],
    education: [{ institution: "University of Lagos", degree: "Bachelor's", fieldOfStudy: "Software Engineering", startYear: 2016, endYear: 2020 }],
    certifications: [{ name: "Meta Frontend Developer Certificate", issuer: "Meta", issueDate: "2022-03" }],
    projects: [
      {
        name: "Dashboard Component Library", description: "Open-source React component library with 200+ stars on GitHub, used in production by 5 companies",
        role: "Creator & Maintainer", technologies: ["React", "TypeScript", "Storybook", "Tailwind CSS"], startDate: "2023-01", endDate: "Present", link: "https://github.com/example/ui-lib",
      },
    ],
    availability: { status: "Available", type: "Full-time" },
    socialLinks: { github: "https://github.com/chiamaka-obi", portfolio: "https://chiamaka.dev" },
  },
  {
    firstName: "Kofi", lastName: "Mensah",
    email: "kofi.mensah@example.com",
    headline: "AI/ML Engineer – LLMs & Computer Vision",
    bio: "Machine learning engineer with deep expertise in NLP, LLMs, and production ML systems. PhD candidate.",
    location: "Accra, Ghana",
    skills: [
      { name: "Python", level: "Expert", yearsOfExperience: 6 },
      { name: "TensorFlow", level: "Advanced", yearsOfExperience: 4 },
      { name: "PyTorch", level: "Advanced", yearsOfExperience: 3 },
      { name: "LLM Fine-tuning", level: "Advanced", yearsOfExperience: 2 },
      { name: "FastAPI", level: "Intermediate", yearsOfExperience: 2 },
      { name: "OpenCV", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "Twi", proficiency: "Native" }],
    experience: [
      {
        company: "Google (via Andela)", role: "AI Engineer", startDate: "2022-09", endDate: "Present", isCurrent: true,
        description: "Developing NLP models for document understanding. Fine-tuned LLMs for domain-specific classification tasks achieving 92% accuracy.",
        technologies: ["Python", "PyTorch", "Gemini API", "GCP", "FastAPI"],
      },
      {
        company: "mPharma", role: "Data Scientist", startDate: "2020-03", endDate: "2022-08", isCurrent: false,
        description: "Built predictive models for medicine demand forecasting across 300+ pharmacies, reducing stockouts by 25%.",
        technologies: ["Python", "TensorFlow", "Pandas", "SQL"],
      },
    ],
    education: [
      { institution: "KNUST", degree: "Master's", fieldOfStudy: "Artificial Intelligence", startYear: 2020, endYear: 2022 },
      { institution: "University of Ghana", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2016, endYear: 2020 },
    ],
    certifications: [{ name: "TensorFlow Developer Certificate", issuer: "Google", issueDate: "2021-07" }],
    projects: [
      {
        name: "AfriNLP Toolkit", description: "Open-source NLP library for African languages with text classification, NER, and translation capabilities",
        role: "Lead Researcher & Developer", technologies: ["Python", "HuggingFace", "PyTorch"], startDate: "2022-01", endDate: "Present", link: "https://github.com/afrinlp",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Contract" },
    socialLinks: { github: "https://github.com/kofi-mensah", linkedin: "https://linkedin.com/in/kofi-mensah" },
  },
  {
    firstName: "Fatima", lastName: "Al-Hassan",
    email: "fatima.alhassan@example.com",
    headline: "DevOps Engineer – Kubernetes & Cloud Infrastructure",
    location: "Nairobi, Kenya",
    skills: [
      { name: "Kubernetes", level: "Expert", yearsOfExperience: 4 },
      { name: "Terraform", level: "Advanced", yearsOfExperience: 3 },
      { name: "AWS", level: "Expert", yearsOfExperience: 5 },
      { name: "Docker", level: "Expert", yearsOfExperience: 5 },
      { name: "CI/CD", level: "Advanced", yearsOfExperience: 4 },
      { name: "Python", level: "Intermediate", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "Swahili", proficiency: "Native" }],
    experience: [
      {
        company: "Safaricom", role: "Senior DevOps Engineer", startDate: "2020-05", endDate: "Present", isCurrent: true,
        description: "Managing Kubernetes clusters handling 2M+ daily transactions for M-Pesa platform. Achieved 99.99% uptime SLA.",
        technologies: ["Kubernetes", "AWS", "Terraform", "Prometheus", "Grafana"],
      },
      {
        company: "Cellulant", role: "Cloud Engineer", startDate: "2018-07", endDate: "2020-04", isCurrent: false,
        description: "Migrated monolithic application to microservices on AWS, reducing infrastructure costs by 35%.",
        technologies: ["AWS", "Docker", "Jenkins", "Python"],
      },
    ],
    education: [{ institution: "Jomo Kenyatta University", degree: "Bachelor's", fieldOfStudy: "Information Technology", startYear: 2014, endYear: 2018 }],
    certifications: [
      { name: "AWS Solutions Architect – Professional", issuer: "Amazon", issueDate: "2021-03" },
      { name: "Certified Kubernetes Administrator", issuer: "CNCF", issueDate: "2022-01" },
    ],
    projects: [
      {
        name: "Multi-Region Disaster Recovery System", description: "Designed and implemented DR system achieving RTO of 5 minutes across 3 AWS regions",
        role: "Lead Architect", technologies: ["AWS", "Terraform", "Kubernetes"], startDate: "2023-03", endDate: "2023-09",
      },
    ],
    availability: { status: "Available", type: "Full-time" },
  },
  {
    firstName: "Emeka", lastName: "Eze",
    email: "emeka.eze@example.com",
    headline: "Mobile Engineer – React Native & Flutter",
    location: "Abuja, Nigeria",
    skills: [
      { name: "React Native", level: "Expert", yearsOfExperience: 4 },
      { name: "Flutter", level: "Advanced", yearsOfExperience: 2 },
      { name: "TypeScript", level: "Advanced", yearsOfExperience: 3 },
      { name: "Node.js", level: "Intermediate", yearsOfExperience: 2 },
      { name: "Firebase", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Native" }],
    experience: [
      {
        company: "OPay", role: "Mobile Engineer", startDate: "2021-08", endDate: "Present", isCurrent: true,
        description: "Built and shipped fintech mobile app with 5M+ downloads. Implemented biometric authentication and real-time transaction tracking.",
        technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
      },
      {
        company: "Kuda Bank", role: "Junior Mobile Developer", startDate: "2019-11", endDate: "2021-07", isCurrent: false,
        description: "Developed core banking features for mobile app including transfers and card management.",
        technologies: ["React Native", "JavaScript", "REST APIs"],
      },
    ],
    education: [{ institution: "Federal University of Technology Minna", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2015, endYear: 2019 }],
    projects: [
      {
        name: "Offline-First Fintech App", description: "React Native app with full offline capability and background sync for low-connectivity markets",
        role: "Lead Developer", technologies: ["React Native", "SQLite", "Redux Toolkit", "TypeScript"], startDate: "2023-01", endDate: "2023-07",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
    socialLinks: { github: "https://github.com/emeka-eze" },
  },
  {
    firstName: "Grace", lastName: "Mutua",
    email: "grace.mutua@example.com",
    headline: "Data Engineer – Pipelines & Analytics",
    location: "Nairobi, Kenya",
    skills: [
      { name: "Apache Spark", level: "Advanced", yearsOfExperience: 3 },
      { name: "Python", level: "Expert", yearsOfExperience: 5 },
      { name: "SQL", level: "Expert", yearsOfExperience: 5 },
      { name: "dbt", level: "Advanced", yearsOfExperience: 2 },
      { name: "Airflow", level: "Advanced", yearsOfExperience: 3 },
      { name: "BigQuery", level: "Advanced", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "Swahili", proficiency: "Native" }],
    experience: [
      {
        company: "Jumia", role: "Senior Data Engineer", startDate: "2021-02", endDate: "Present", isCurrent: true,
        description: "Designed and maintained data pipelines processing 50GB+ daily. Built data warehouse serving analytics team of 20.",
        technologies: ["Apache Spark", "Airflow", "BigQuery", "dbt", "Python"],
      },
      {
        company: "Cellulant", role: "Data Analyst", startDate: "2019-05", endDate: "2021-01", isCurrent: false,
        description: "Built dashboards and automated reports for payments business intelligence.",
        technologies: ["SQL", "Python", "Tableau", "Postgres"],
      },
    ],
    education: [{ institution: "Strathmore University", degree: "Bachelor's", fieldOfStudy: "Mathematics & Computer Science", startYear: 2015, endYear: 2019 }],
    certifications: [{ name: "Google Professional Data Engineer", issuer: "Google", issueDate: "2022-06" }],
    projects: [
      {
        name: "Real-time Fraud Detection Pipeline", description: "Stream processing pipeline detecting fraudulent transactions in under 100ms using ML scoring",
        role: "Lead Engineer", technologies: ["Kafka", "Apache Flink", "Python", "Redis"], startDate: "2022-08", endDate: "2023-02",
      },
    ],
    availability: { status: "Not Available", type: "Full-time" },
  },
  {
    firstName: "Theo", lastName: "Kagabo",
    email: "theo.kagabo@example.com",
    headline: "Junior Backend Developer – Python & Django",
    location: "Kigali, Rwanda",
    skills: [
      { name: "Python", level: "Intermediate", yearsOfExperience: 2 },
      { name: "Django", level: "Intermediate", yearsOfExperience: 2 },
      { name: "PostgreSQL", level: "Beginner", yearsOfExperience: 1 },
      { name: "REST APIs", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Conversational" }, { name: "Kinyarwanda", proficiency: "Native" }, { name: "French", proficiency: "Fluent" }],
    experience: [
      {
        company: "Irembo", role: "Junior Backend Developer", startDate: "2023-01", endDate: "Present", isCurrent: true,
        description: "Developing API endpoints for government digital services platform. Fixed 50+ bugs and shipped 3 new features.",
        technologies: ["Python", "Django", "PostgreSQL", "Git"],
      },
    ],
    education: [{ institution: "Rwanda Coding Academy", degree: "Diploma", fieldOfStudy: "Software Development", startYear: 2021, endYear: 2022 }],
    projects: [
      {
        name: "Student Portal", description: "Django web app for managing student registrations and grades for a local school",
        role: "Sole Developer", technologies: ["Python", "Django", "SQLite"], startDate: "2022-06", endDate: "2022-11",
      },
    ],
    availability: { status: "Available", type: "Full-time" },
  },
  {
    firstName: "Yemi", lastName: "Adeyemi",
    email: "yemi.adeyemi@example.com",
    headline: "Product Engineer – Next.js & API Design",
    location: "Lagos, Nigeria",
    skills: [
      { name: "Next.js", level: "Expert", yearsOfExperience: 4 },
      { name: "Node.js", level: "Advanced", yearsOfExperience: 4 },
      { name: "TypeScript", level: "Expert", yearsOfExperience: 3 },
      { name: "PostgreSQL", level: "Advanced", yearsOfExperience: 3 },
      { name: "Redis", level: "Intermediate", yearsOfExperience: 2 },
      { name: "Stripe", level: "Advanced", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Yoruba", proficiency: "Fluent" }],
    experience: [
      {
        company: "Cowrywise", role: "Product Engineer", startDate: "2021-04", endDate: "Present", isCurrent: true,
        description: "Full-stack engineer building investment and savings features for 200k+ users. Led implementation of recurring investment automation.",
        technologies: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis"],
      },
      {
        company: "Freelance", role: "Full Stack Developer", startDate: "2019-06", endDate: "2021-03", isCurrent: false,
        description: "Delivered 12+ web applications for SMEs across Lagos. Specialized in e-commerce and dashboards.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      },
    ],
    education: [{ institution: "University of Ibadan", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2015, endYear: 2019 }],
    certifications: [{ name: "Stripe Certified Developer", issuer: "Stripe", issueDate: "2023-02" }],
    projects: [
      {
        name: "SaaS Billing Platform", description: "Multi-tenant billing system with Stripe integration handling $500k+ monthly transactions",
        role: "Lead Developer", technologies: ["Next.js", "Node.js", "Stripe", "PostgreSQL", "Prisma"], startDate: "2023-05", endDate: "2023-10",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
    socialLinks: { github: "https://github.com/yemi-adeyemi", portfolio: "https://yemi.dev" },
  },
  {
    firstName: "Aisha", lastName: "Diallo",
    email: "aisha.diallo@example.com",
    headline: "UX/Frontend Engineer – Design Systems",
    location: "Dakar, Senegal",
    skills: [
      { name: "React", level: "Advanced", yearsOfExperience: 3 },
      { name: "Figma", level: "Expert", yearsOfExperience: 4 },
      { name: "CSS/SCSS", level: "Expert", yearsOfExperience: 5 },
      { name: "Storybook", level: "Advanced", yearsOfExperience: 2 },
      { name: "TypeScript", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "French", proficiency: "Native" }, { name: "Wolof", proficiency: "Native" }],
    experience: [
      {
        company: "Wave Mobile Money", role: "Frontend Engineer", startDate: "2022-06", endDate: "Present", isCurrent: true,
        description: "Built design system used across 4 products. Improved accessibility scores from 60 to 96 across the platform.",
        technologies: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
      },
      {
        company: "Freelance", role: "UI/UX Designer & Developer", startDate: "2020-01", endDate: "2022-05", isCurrent: false,
        description: "Designed and developed 20+ websites and mobile apps for African startups.",
        technologies: ["Figma", "React", "HTML", "CSS"],
      },
    ],
    education: [{ institution: "Université Cheikh Anta Diop", degree: "Bachelor's", fieldOfStudy: "Information Systems", startYear: 2016, endYear: 2020 }],
    projects: [
      {
        name: "African UI Component Library", description: "Open-source React component library tailored for African market applications with RTL support and low-bandwidth optimization",
        role: "Creator", technologies: ["React", "TypeScript", "Storybook", "Radix UI"], startDate: "2023-03", endDate: "Present",
      },
    ],
    availability: { status: "Available", type: "Contract" },
  },
  {
    firstName: "Blessing", lastName: "Okonkwo",
    email: "blessing.okonkwo@example.com",
    headline: "Backend Engineer – Go & Microservices",
    location: "Port Harcourt, Nigeria",
    skills: [
      { name: "Go", level: "Advanced", yearsOfExperience: 3 },
      { name: "gRPC", level: "Advanced", yearsOfExperience: 2 },
      { name: "Kafka", level: "Intermediate", yearsOfExperience: 2 },
      { name: "PostgreSQL", level: "Expert", yearsOfExperience: 4 },
      { name: "Redis", level: "Advanced", yearsOfExperience: 3 },
      { name: "Docker", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Native" }],
    experience: [
      {
        company: "Interswitch", role: "Backend Engineer", startDate: "2021-07", endDate: "Present", isCurrent: true,
        description: "Architected high-throughput payment processing microservices handling 10k TPS. Reduced P99 latency from 800ms to 120ms.",
        technologies: ["Go", "gRPC", "Kafka", "PostgreSQL", "Redis"],
      },
      {
        company: "SystemSpecs", role: "Software Developer", startDate: "2019-09", endDate: "2021-06", isCurrent: false,
        description: "Maintained core banking system modules for Nigerian financial institutions.",
        technologies: ["Java", "PostgreSQL", "Spring Boot"],
      },
    ],
    education: [{ institution: "University of Port Harcourt", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2015, endYear: 2019 }],
    projects: [
      {
        name: "High-Performance Payment Router", description: "Go service routing 50k+ payment requests per second with intelligent failover and load balancing",
        role: "Architect & Developer", technologies: ["Go", "gRPC", "Redis", "Prometheus"], startDate: "2022-09", endDate: "2023-03",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
    socialLinks: { github: "https://github.com/blessing-okonkwo" },
  },
  {
    firstName: "Dalia", lastName: "Wanjiku",
    email: "dalia.wanjiku@example.com",
    headline: "Cloud Architect – Azure & GCP",
    location: "Nairobi, Kenya",
    skills: [
      { name: "Azure", level: "Expert", yearsOfExperience: 5 },
      { name: "GCP", level: "Advanced", yearsOfExperience: 3 },
      { name: "Terraform", level: "Expert", yearsOfExperience: 4 },
      { name: "Python", level: "Intermediate", yearsOfExperience: 3 },
      { name: "Security & IAM", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Swahili", proficiency: "Native" }],
    experience: [
      {
        company: "Microsoft (Contractor)", role: "Cloud Architect", startDate: "2020-10", endDate: "Present", isCurrent: true,
        description: "Designing cloud solutions for enterprise clients across East Africa. Led 4 large-scale Azure migrations.",
        technologies: ["Azure", "Terraform", "ARM Templates", "PowerShell"],
      },
    ],
    education: [{ institution: "University of Nairobi", degree: "Master's", fieldOfStudy: "Information Security", startYear: 2016, endYear: 2018 }],
    certifications: [
      { name: "Azure Solutions Architect Expert", issuer: "Microsoft", issueDate: "2021-04" },
      { name: "GCP Professional Cloud Architect", issuer: "Google", issueDate: "2022-11" },
    ],
    projects: [
      {
        name: "Zero-Trust Security Framework", description: "Implemented zero-trust architecture for banking client reducing security incidents by 80%",
        role: "Lead Architect", technologies: ["Azure AD", "Terraform", "Python", "Sentinel"], startDate: "2023-01", endDate: "2023-06",
      },
    ],
    availability: { status: "Available", type: "Contract" },
  },
  {
    firstName: "Samuel", lastName: "Asante",
    email: "samuel.asante@example.com",
    headline: "Frontend Developer – Vue.js & Nuxt",
    location: "Kumasi, Ghana",
    skills: [
      { name: "Vue.js", level: "Expert", yearsOfExperience: 4 },
      { name: "Nuxt.js", level: "Advanced", yearsOfExperience: 3 },
      { name: "JavaScript", level: "Expert", yearsOfExperience: 5 },
      { name: "CSS", level: "Advanced", yearsOfExperience: 5 },
      { name: "Node.js", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "Twi", proficiency: "Native" }],
    experience: [
      {
        company: "Hubtel", role: "Frontend Developer", startDate: "2020-11", endDate: "Present", isCurrent: true,
        description: "Building merchant-facing dashboards for Ghana's leading commerce platform. Shipped 15+ features with zero critical bugs.",
        technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS"],
      },
    ],
    education: [{ institution: "KNUST", degree: "Bachelor's", fieldOfStudy: "Computer Engineering", startYear: 2016, endYear: 2020 }],
    projects: [
      {
        name: "Ecommerce Analytics Dashboard", description: "Real-time analytics dashboard for 5k+ Ghanaian merchants tracking sales, inventory, and customer behavior",
        role: "Lead Frontend Developer", technologies: ["Vue.js", "D3.js", "Nuxt.js"], startDate: "2022-06", endDate: "2022-12",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
  },
  {
    firstName: "Zainab", lastName: "Ibrahim",
    email: "zainab.ibrahim@example.com",
    headline: "Prompt Engineer & AI Integration Specialist",
    location: "Abuja, Nigeria",
    skills: [
      { name: "LLM Prompt Engineering", level: "Expert", yearsOfExperience: 2 },
      { name: "Python", level: "Advanced", yearsOfExperience: 4 },
      { name: "Gemini API", level: "Advanced", yearsOfExperience: 1 },
      { name: "OpenAI API", level: "Expert", yearsOfExperience: 2 },
      { name: "LangChain", level: "Advanced", yearsOfExperience: 1 },
      { name: "FastAPI", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Hausa", proficiency: "Native" }],
    experience: [
      {
        company: "AI Startup (Stealth)", role: "AI Engineer", startDate: "2023-03", endDate: "Present", isCurrent: true,
        description: "Designed prompt pipelines for multi-step document analysis achieving 91% accuracy. Reduced hallucination rate by 60% through structured prompting.",
        technologies: ["OpenAI API", "LangChain", "Python", "FastAPI", "Pinecone"],
      },
      {
        company: "Deloitte Nigeria", role: "Data Analyst", startDate: "2021-06", endDate: "2023-02", isCurrent: false,
        description: "Built predictive models and reports for banking clients.",
        technologies: ["Python", "SQL", "Tableau"],
      },
    ],
    education: [{ institution: "Ahmadu Bello University", degree: "Bachelor's", fieldOfStudy: "Statistics", startYear: 2017, endYear: 2021 }],
    certifications: [{ name: "DeepLearning.AI Prompt Engineering", issuer: "DeepLearning.AI", issueDate: "2023-05" }],
    projects: [
      {
        name: "HR Screening AI", description: "Multi-stage LLM pipeline for automated candidate screening and ranking with structured reasoning",
        role: "AI Engineer", technologies: ["Gemini API", "LangChain", "FastAPI", "MongoDB"], startDate: "2023-09", endDate: "2024-01",
      },
    ],
    availability: { status: "Available", type: "Full-time" },
    socialLinks: { github: "https://github.com/zainab-ibrahim" },
  },
  {
    firstName: "Kwame", lastName: "Boateng",
    email: "kwame.boateng@example.com",
    headline: "Blockchain Developer – Solidity & Web3",
    location: "Accra, Ghana",
    skills: [
      { name: "Solidity", level: "Expert", yearsOfExperience: 3 },
      { name: "Ethereum", level: "Expert", yearsOfExperience: 3 },
      { name: "Web3.js", level: "Advanced", yearsOfExperience: 3 },
      { name: "React", level: "Advanced", yearsOfExperience: 4 },
      { name: "Node.js", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "Twi", proficiency: "Native" }],
    experience: [
      {
        company: "Cardano Africa", role: "Blockchain Developer", startDate: "2021-06", endDate: "Present", isCurrent: true,
        description: "Developed DeFi protocols and NFT marketplaces on Cardano and Ethereum. Smart contracts audited and managing $2M+ TVL.",
        technologies: ["Solidity", "Hardhat", "Web3.js", "React", "IPFS"],
      },
    ],
    education: [{ institution: "University of Ghana", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2016, endYear: 2020 }],
    projects: [
      {
        name: "Decentralized Remittance Protocol", description: "DeFi protocol enabling low-cost cross-border payments for African diaspora with $500k in transactions",
        role: "Lead Smart Contract Developer", technologies: ["Solidity", "Hardhat", "Chainlink"], startDate: "2022-11", endDate: "2023-05",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
  },
  {
    firstName: "Miriam", lastName: "Kamau",
    email: "miriam.kamau@example.com",
    headline: "Backend Engineer – Java & Spring Boot",
    location: "Nairobi, Kenya",
    skills: [
      { name: "Java", level: "Expert", yearsOfExperience: 6 },
      { name: "Spring Boot", level: "Expert", yearsOfExperience: 5 },
      { name: "Microservices", level: "Advanced", yearsOfExperience: 4 },
      { name: "Oracle DB", level: "Advanced", yearsOfExperience: 4 },
      { name: "Kafka", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Swahili", proficiency: "Native" }],
    experience: [
      {
        company: "KCB Bank", role: "Senior Software Engineer", startDate: "2019-04", endDate: "Present", isCurrent: true,
        description: "Core banking system engineer maintaining services for 8M+ customers. Led API integration with mobile money platforms.",
        technologies: ["Java", "Spring Boot", "Oracle", "Kafka", "REST APIs"],
      },
      {
        company: "Equity Bank", role: "Software Engineer", startDate: "2017-08", endDate: "2019-03", isCurrent: false,
        description: "Developed loan management modules and customer portal features.",
        technologies: ["Java", "Spring MVC", "Oracle"],
      },
    ],
    education: [{ institution: "University of Nairobi", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2013, endYear: 2017 }],
    certifications: [{ name: "Oracle Certified Professional Java Developer", issuer: "Oracle", issueDate: "2020-08" }],
    projects: [
      {
        name: "USSD Banking Platform", description: "Built USSD menu-driven banking system accessible to feature phones, serving 500k rural customers",
        role: "Backend Lead", technologies: ["Java", "Spring Boot", "Redis", "MySQL"], startDate: "2021-06", endDate: "2022-01",
      },
    ],
    availability: { status: "Not Available", type: "Full-time" },
  },
  {
    firstName: "Adaeze", lastName: "Okafor",
    email: "adaeze.okafor@example.com",
    headline: "Junior Full Stack Developer – MERN Stack",
    location: "Enugu, Nigeria",
    skills: [
      { name: "React", level: "Intermediate", yearsOfExperience: 1 },
      { name: "Node.js", level: "Intermediate", yearsOfExperience: 1 },
      { name: "MongoDB", level: "Beginner", yearsOfExperience: 1 },
      { name: "JavaScript", level: "Intermediate", yearsOfExperience: 2 },
      { name: "HTML/CSS", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "Igbo", proficiency: "Native" }],
    experience: [
      {
        company: "Tech4Dev", role: "Junior Developer (Bootcamp Graduate)", startDate: "2023-06", endDate: "Present", isCurrent: true,
        description: "Building full-stack features for social impact apps. Shipped authentication system and user dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
      },
    ],
    education: [{ institution: "University of Nigeria Nsukka", degree: "Bachelor's", fieldOfStudy: "Information Management Technology", startYear: 2018, endYear: 2022 }],
    projects: [
      {
        name: "Community Health Tracker", description: "MERN stack app helping rural health workers track patient visits and medicine stock",
        role: "Full Stack Developer", technologies: ["React", "Node.js", "MongoDB", "Express"], startDate: "2023-04", endDate: "2023-09",
      },
    ],
    availability: { status: "Available", type: "Full-time" },
  },
  {
    firstName: "Felix", lastName: "Oduya",
    email: "felix.oduya@example.com",
    headline: "Security Engineer – Penetration Testing & AppSec",
    location: "Kampala, Uganda",
    skills: [
      { name: "Penetration Testing", level: "Expert", yearsOfExperience: 5 },
      { name: "OWASP", level: "Expert", yearsOfExperience: 5 },
      { name: "Python", level: "Advanced", yearsOfExperience: 4 },
      { name: "Burp Suite", level: "Expert", yearsOfExperience: 4 },
      { name: "Cloud Security", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Luganda", proficiency: "Native" }],
    experience: [
      {
        company: "MTN Uganda", role: "Senior Security Engineer", startDate: "2020-03", endDate: "Present", isCurrent: true,
        description: "Leading application security program for 17M subscriber telecom. Identified and remediated 200+ critical vulnerabilities.",
        technologies: ["Burp Suite", "Metasploit", "Python", "AWS Security Hub"],
      },
    ],
    education: [{ institution: "Makerere University", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2012, endYear: 2016 }],
    certifications: [
      { name: "OSCP", issuer: "Offensive Security", issueDate: "2020-09" },
      { name: "CEH", issuer: "EC-Council", issueDate: "2019-05" },
    ],
    projects: [
      {
        name: "Bug Bounty Platform for Africa", description: "Coordinated disclosure platform connecting African companies with ethical hackers",
        role: "Founder & Developer", technologies: ["Node.js", "React", "PostgreSQL"], startDate: "2022-01", endDate: "2022-08",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Contract" },
  },
  {
    firstName: "Nadia", lastName: "Benali",
    email: "nadia.benali@example.com",
    headline: "Backend Engineer – Python & FastAPI",
    location: "Casablanca, Morocco",
    skills: [
      { name: "Python", level: "Expert", yearsOfExperience: 5 },
      { name: "FastAPI", level: "Expert", yearsOfExperience: 3 },
      { name: "PostgreSQL", level: "Advanced", yearsOfExperience: 4 },
      { name: "Redis", level: "Advanced", yearsOfExperience: 3 },
      { name: "Celery", level: "Advanced", yearsOfExperience: 3 },
      { name: "Docker", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "French", proficiency: "Native" }, { name: "Arabic", proficiency: "Native" }],
    experience: [
      {
        company: "OCP Group", role: "Backend Engineer", startDate: "2021-09", endDate: "Present", isCurrent: true,
        description: "Building APIs for industrial IoT data processing platform. Handles 1M+ sensor readings per day.",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
      },
      {
        company: "Sofrecom", role: "Python Developer", startDate: "2019-03", endDate: "2021-08", isCurrent: false,
        description: "Developed data processing pipelines for telecom analytics.",
        technologies: ["Python", "Django", "Pandas", "PostgreSQL"],
      },
    ],
    education: [{ institution: "ENSIAS", degree: "Master's", fieldOfStudy: "Software Engineering", startYear: 2017, endYear: 2019 }],
    certifications: [{ name: "Python Institute PCEP", issuer: "Python Institute", issueDate: "2020-03" }],
    projects: [
      {
        name: "Industrial IoT Dashboard", description: "Real-time monitoring dashboard processing sensor data from 500+ factory machines with anomaly detection",
        role: "Backend Developer", technologies: ["FastAPI", "WebSockets", "TimescaleDB", "Redis"], startDate: "2022-04", endDate: "2022-10",
      },
    ],
    availability: { status: "Available", type: "Full-time" },
  },
  {
    firstName: "Ibrahim", lastName: "Toure",
    email: "ibrahim.toure@example.com",
    headline: "Mobile & Backend Engineer – React Native & Node",
    location: "Abidjan, Côte d'Ivoire",
    skills: [
      { name: "React Native", level: "Advanced", yearsOfExperience: 3 },
      { name: "Node.js", level: "Advanced", yearsOfExperience: 4 },
      { name: "MongoDB", level: "Advanced", yearsOfExperience: 3 },
      { name: "TypeScript", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Conversational" }, { name: "French", proficiency: "Native" }, { name: "Dioula", proficiency: "Native" }],
    experience: [
      {
        company: "CinetPay", role: "Software Engineer", startDate: "2021-03", endDate: "Present", isCurrent: true,
        description: "Building mobile payment app and APIs for West Africa's leading payment aggregator.",
        technologies: ["React Native", "Node.js", "MongoDB", "TypeScript"],
      },
    ],
    education: [{ institution: "INPHB", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2016, endYear: 2020 }],
    projects: [
      {
        name: "Mobile Money Super App", description: "Aggregator app supporting 15+ West African mobile money networks in a single interface",
        role: "Lead Developer", technologies: ["React Native", "Node.js", "MongoDB", "Redis"], startDate: "2023-01", endDate: "2023-08",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
  },
  {
    firstName: "Sharon", lastName: "Chege",
    email: "sharon.chege@example.com",
    headline: "QA Engineer – Automated Testing & Selenium",
    location: "Nairobi, Kenya",
    skills: [
      { name: "Selenium", level: "Expert", yearsOfExperience: 5 },
      { name: "Cypress", level: "Advanced", yearsOfExperience: 3 },
      { name: "Python", level: "Intermediate", yearsOfExperience: 3 },
      { name: "Jest", level: "Advanced", yearsOfExperience: 3 },
      { name: "Playwright", level: "Intermediate", yearsOfExperience: 1 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Swahili", proficiency: "Native" }],
    experience: [
      {
        company: "Tala", role: "Senior QA Engineer", startDate: "2020-06", endDate: "Present", isCurrent: true,
        description: "Automated 85% of regression tests, reducing release cycle from 2 weeks to 3 days. Led quality across 4 squads.",
        technologies: ["Cypress", "Selenium", "Python", "Postman", "Jest"],
      },
    ],
    education: [{ institution: "Daystar University", degree: "Bachelor's", fieldOfStudy: "Information Technology", startYear: 2013, endYear: 2017 }],
    certifications: [{ name: "ISTQB Foundation Level", issuer: "ISTQB", issueDate: "2019-11" }],
    projects: [
      {
        name: "QA Framework from Scratch", description: "Built end-to-end testing framework covering API, mobile, and web with parallel execution reducing test runtime by 70%",
        role: "QA Lead", technologies: ["Playwright", "Cypress", "Python", "GitHub Actions"], startDate: "2022-07", endDate: "2023-01",
      },
    ],
    availability: { status: "Not Available", type: "Full-time" },
  },
  {
    firstName: "Mustapha", lastName: "Drame",
    email: "mustapha.drame@example.com",
    headline: "Full Stack Developer – PHP & Laravel",
    location: "Dakar, Senegal",
    skills: [
      { name: "PHP", level: "Expert", yearsOfExperience: 6 },
      { name: "Laravel", level: "Expert", yearsOfExperience: 5 },
      { name: "Vue.js", level: "Advanced", yearsOfExperience: 3 },
      { name: "MySQL", level: "Advanced", yearsOfExperience: 6 },
      { name: "React", level: "Beginner", yearsOfExperience: 1 },
    ],
    languages: [{ name: "English", proficiency: "Conversational" }, { name: "French", proficiency: "Native" }, { name: "Wolof", proficiency: "Native" }],
    experience: [
      {
        company: "Gainde 2000", role: "Senior Developer", startDate: "2019-01", endDate: "Present", isCurrent: true,
        description: "Developing customs and trade facilitation systems used by Senegalese port authority.",
        technologies: ["PHP", "Laravel", "Vue.js", "MySQL", "Redis"],
      },
    ],
    education: [{ institution: "Université Gaston Berger", degree: "Bachelor's", fieldOfStudy: "Mathematics and Computer Science", startYear: 2013, endYear: 2017 }],
    projects: [
      {
        name: "National Trade Portal", description: "Laravel-based e-government portal streamlining trade documentation for 2,000+ importers/exporters",
        role: "Lead Developer", technologies: ["Laravel", "Vue.js", "MySQL", "Redis"], startDate: "2021-06", endDate: "2022-06",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
  },
  {
    firstName: "Lilian", lastName: "Odhiambo",
    email: "lilian.odhiambo@example.com",
    headline: "Data Scientist – Machine Learning & NLP",
    location: "Kisumu, Kenya",
    skills: [
      { name: "Python", level: "Expert", yearsOfExperience: 5 },
      { name: "Scikit-learn", level: "Expert", yearsOfExperience: 4 },
      { name: "NLP", level: "Advanced", yearsOfExperience: 3 },
      { name: "SQL", level: "Advanced", yearsOfExperience: 4 },
      { name: "TensorFlow", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Swahili", proficiency: "Fluent" }, { name: "Dholuo", proficiency: "Native" }],
    experience: [
      {
        company: "GSMA", role: "Data Scientist", startDate: "2021-04", endDate: "Present", isCurrent: true,
        description: "Building ML models analyzing mobile money trends across 30+ African markets. Published 2 research papers.",
        technologies: ["Python", "TensorFlow", "SQL", "Tableau", "GCP"],
      },
      {
        company: "M-KOPA", role: "Data Analyst", startDate: "2019-07", endDate: "2021-03", isCurrent: false,
        description: "Built credit scoring models for pay-as-you-go solar customers, improving approval rate by 15%.",
        technologies: ["Python", "SQL", "Scikit-learn"],
      },
    ],
    education: [
      { institution: "University of Nairobi", degree: "Master's", fieldOfStudy: "Data Science", startYear: 2019, endYear: 2021 },
      { institution: "Egerton University", degree: "Bachelor's", fieldOfStudy: "Mathematics", startYear: 2015, endYear: 2019 },
    ],
    certifications: [{ name: "Google Data Analytics Certificate", issuer: "Google", issueDate: "2020-12" }],
    projects: [
      {
        name: "Credit Scoring for the Unbanked", description: "ML model using alternative data (mobile usage, utility payments) for credit scoring with 78% accuracy",
        role: "Lead Data Scientist", technologies: ["Python", "Scikit-learn", "XGBoost", "SQL"], startDate: "2022-09", endDate: "2023-03",
      },
    ],
    availability: { status: "Available", type: "Full-time" },
    socialLinks: { linkedin: "https://linkedin.com/in/lilian-odhiambo" },
  },
  {
    firstName: "Cedric", lastName: "Ndayishimiye",
    email: "cedric.ndayishimiye@example.com",
    headline: "Embedded Systems Engineer – IoT & Firmware",
    location: "Kigali, Rwanda",
    skills: [
      { name: "C/C++", level: "Expert", yearsOfExperience: 6 },
      { name: "Embedded Linux", level: "Advanced", yearsOfExperience: 4 },
      { name: "RTOS", level: "Advanced", yearsOfExperience: 3 },
      { name: "IoT Protocols", level: "Expert", yearsOfExperience: 4 },
      { name: "Python", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: [{ name: "English", proficiency: "Fluent" }, { name: "French", proficiency: "Native" }, { name: "Kinyarwanda", proficiency: "Native" }],
    experience: [
      {
        company: "Zipline", role: "Embedded Systems Engineer", startDate: "2020-08", endDate: "Present", isCurrent: true,
        description: "Firmware engineer for autonomous drone delivery system. Developed real-time flight control algorithms handling 500+ daily deliveries.",
        technologies: ["C++", "RTOS", "MAVLink", "Embedded Linux", "Python"],
      },
    ],
    education: [{ institution: "University of Rwanda", degree: "Bachelor's", fieldOfStudy: "Electrical Engineering", startYear: 2014, endYear: 2018 }],
    projects: [
      {
        name: "Smart Agriculture Sensor Network", description: "IoT network of 200+ sensors monitoring soil, humidity, and weather for Rwanda's agriculture ministry",
        role: "Lead Engineer", technologies: ["C++", "LoRaWAN", "MQTT", "Raspberry Pi"], startDate: "2022-03", endDate: "2022-12",
      },
    ],
    availability: { status: "Not Available", type: "Full-time" },
  },
  {
    firstName: "Patience", lastName: "Agyemang",
    email: "patience.agyemang@example.com",
    headline: "Tech Lead – Full Stack & Team Management",
    bio: "Engineering leader with 7 years of experience building and leading high-performing teams across West Africa.",
    location: "Accra, Ghana",
    skills: [
      { name: "Node.js", level: "Expert", yearsOfExperience: 7 },
      { name: "React", level: "Expert", yearsOfExperience: 6 },
      { name: "TypeScript", level: "Expert", yearsOfExperience: 5 },
      { name: "PostgreSQL", level: "Expert", yearsOfExperience: 6 },
      { name: "System Design", level: "Expert", yearsOfExperience: 4 },
      { name: "AWS", level: "Advanced", yearsOfExperience: 4 },
    ],
    languages: [{ name: "English", proficiency: "Native" }, { name: "Twi", proficiency: "Native" }],
    experience: [
      {
        company: "ExpressPay Ghana", role: "Engineering Lead", startDate: "2020-01", endDate: "Present", isCurrent: true,
        description: "Leading team of 12 engineers. Architected multi-tenant payment platform processing GHS 50M+ monthly. Shipped 30+ products in 4 years.",
        technologies: ["Node.js", "React", "TypeScript", "PostgreSQL", "AWS", "Kubernetes"],
      },
      {
        company: "Hubtel", role: "Senior Software Engineer", startDate: "2017-04", endDate: "2019-12", isCurrent: false,
        description: "Built core commerce APIs and SMS gateway integrations.",
        technologies: ["Node.js", "React", "MongoDB", "Redis"],
      },
    ],
    education: [
      { institution: "KNUST", degree: "Master's", fieldOfStudy: "Computer Science", startYear: 2017, endYear: 2019 },
      { institution: "University of Ghana", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2013, endYear: 2017 },
    ],
    certifications: [
      { name: "AWS Solutions Architect – Associate", issuer: "Amazon", issueDate: "2021-06" },
      { name: "Certified Scrum Master", issuer: "Scrum Alliance", issueDate: "2020-03" },
    ],
    projects: [
      {
        name: "Pan-African Payments Infrastructure", description: "Designed and shipped payment infrastructure supporting 12 African currencies with 99.95% uptime",
        role: "Architect & Lead", technologies: ["Node.js", "PostgreSQL", "Kafka", "AWS", "Terraform"], startDate: "2022-04", endDate: "2023-04",
      },
    ],
    availability: { status: "Open to Opportunities", type: "Full-time" },
    socialLinks: { linkedin: "https://linkedin.com/in/patience-agyemang", github: "https://github.com/patience-agyemang" },
  },
];

export default DUMMY_CANDIDATES;
