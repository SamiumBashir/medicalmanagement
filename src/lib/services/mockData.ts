export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  testCount: number;
}

export interface MockTestParameter {
  name: string;
  code: string;
  unit: string;
  parameterType: "NUMERIC" | "TEXT" | "SELECT" | "BOOLEAN" | "CALCULATED";
  referenceRanges: {
    gender: "MALE" | "FEMALE" | "BOTH";
    minAge?: number;
    maxAge?: number;
    low?: number;
    high?: number;
    textRange?: string;
  }[];
  criticalLow?: number;
  criticalHigh?: number;
}

export interface MockTest {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  sampleType: string;
  turnaroundTime: string;
  price: number;
  preparationInstructions: string;
  parameters: MockTestParameter[];
  frequentlyAskedQuestions?: { question: string; answer: string }[];
  isPopular?: boolean;
}

export interface MockDoctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  bmdcRegNo: string;
  branch: string;
  branchSlug: string;
  availableDays: string[];
  timing: string;
  consultationFee: number;
  image: string;
  biography: string;
}

export interface MockBranch {
  id: string;
  slug: string;
  name: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  openingHours: string;
  image: string;
  facilities: string[];
  availableTestsCount: number;
  doctorsCount: number;
}

export interface MockArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  publishedDate: string;
  readTime: string;
  image: string;
}

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "cat-1",
    name: "Pathology & Hematology",
    slug: "pathology-hematology",
    description: "Automated hematology profiling, coagulation studies, and cell morphology analysis.",
    icon: "Activity",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    testCount: 38,
  },
  {
    id: "cat-2",
    name: "Clinical Biochemistry",
    slug: "clinical-biochemistry",
    description: "Comprehensive metabolic panels, liver enzymes, renal profiles, and lipid analytics.",
    icon: "FlaskConical",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    testCount: 45,
  },
  {
    id: "cat-3",
    name: "Radiology & Imaging",
    slug: "radiology-imaging",
    description: "Low-dose digital radiography, high-frequency fluoroscopy, and diagnostic reporting.",
    icon: "Scan",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    testCount: 22,
  },
  {
    id: "cat-4",
    name: "Ultrasonography (USG)",
    slug: "ultrasonography",
    description: "High-definition 4D color Doppler ultrasound for abdominal, pelvic, and vascular studies.",
    icon: "Radio",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    testCount: 19,
  },
  {
    id: "cat-5",
    name: "Cardiology Diagnostics",
    slug: "cardiology",
    description: "Digital 12-lead ECG, 2D echocardiography, and Holter cardiac telemetry monitoring.",
    icon: "HeartPulse",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80",
    testCount: 14,
  },
  {
    id: "cat-6",
    name: "Hormones & Endocrinology",
    slug: "endocrinology",
    description: "Chemiluminescence immunoassay (CLIA) for thyroid, reproductive, and adrenal hormones.",
    icon: "Dna",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    testCount: 26,
  },
  {
    id: "cat-7",
    name: "Executive Health Packages",
    slug: "health-checkups",
    description: "Structured multi-specialty wellness packages tailored for preventive longevity.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    testCount: 8,
  },
  {
    id: "cat-8",
    name: "Microbiology & Serology",
    slug: "microbiology",
    description: "Bacterial culture, antimicrobial sensitivity testing, and infectious disease markers.",
    icon: "Microscope",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
    testCount: 28,
  },
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: "test-cbc",
    slug: "complete-blood-count-cbc",
    code: "HEM-001",
    name: "Complete Blood Count (CBC) with ESR",
    category: "Pathology & Hematology",
    categorySlug: "pathology-hematology",
    description: "Measures vital red blood cells, white blood cell differentials, hemoglobin concentration, and platelets for anemia and infection screening.",
    sampleType: "Whole Blood (EDTA)",
    turnaroundTime: "Same Day (4 Hours)",
    price: 550,
    preparationInstructions: "No fasting required. Maintain routine hydration prior to sample collection.",
    isPopular: true,
    parameters: [
      {
        name: "Hemoglobin (Hb)",
        code: "HB",
        unit: "g/dL",
        parameterType: "NUMERIC",
        referenceRanges: [
          { gender: "MALE", low: 13.5, high: 17.5 },
          { gender: "FEMALE", low: 12.0, high: 15.5 },
        ],
        criticalLow: 7.0,
        criticalHigh: 20.0,
      },
      {
        name: "Total RBC Count",
        code: "RBC",
        unit: "mil/µL",
        parameterType: "NUMERIC",
        referenceRanges: [
          { gender: "MALE", low: 4.5, high: 5.9 },
          { gender: "FEMALE", low: 4.0, high: 5.2 },
        ],
      },
      {
        name: "Total WBC Count (TLC)",
        code: "WBC",
        unit: "/µL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 4000, high: 11000 }],
        criticalLow: 2000,
        criticalHigh: 30000,
      },
      {
        name: "Platelet Count",
        code: "PLT",
        unit: "lac/µL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 1.5, high: 4.5 }],
        criticalLow: 0.5,
        criticalHigh: 8.0,
      },
      {
        name: "ESR (Westergren)",
        code: "ESR",
        unit: "mm/1st hr",
        parameterType: "NUMERIC",
        referenceRanges: [
          { gender: "MALE", low: 0, high: 15 },
          { gender: "FEMALE", low: 0, high: 20 },
        ],
      },
    ],
    frequentlyAskedQuestions: [
      {
        question: "Is fasting needed for CBC?",
        answer: "No, fasting is not required for a Complete Blood Count. You may eat and drink as normal.",
      },
      {
        question: "How soon are the results ready?",
        answer: "Standard turnaround time is within 3 to 4 hours from sample reception at our laboratory.",
      },
    ],
  },
  {
    id: "test-lipid",
    slug: "lipid-profile",
    code: "BIO-004",
    name: "Comprehensive Lipid Profile",
    category: "Clinical Biochemistry",
    categorySlug: "clinical-biochemistry",
    description: "Evaluates total cholesterol, high-density lipoprotein (HDL), LDL, VLDL, and triglycerides to determine cardiovascular risk.",
    sampleType: "Serum (Plain Tube)",
    turnaroundTime: "Same Day (6 Hours)",
    price: 1200,
    preparationInstructions: "Overnight fasting of 10 to 12 hours is mandatory. Plain water is permitted.",
    isPopular: true,
    parameters: [
      {
        name: "Total Cholesterol",
        code: "CHOL",
        unit: "mg/dL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 125, high: 200 }],
        criticalHigh: 300,
      },
      {
        name: "HDL Cholesterol (Good)",
        code: "HDL",
        unit: "mg/dL",
        parameterType: "NUMERIC",
        referenceRanges: [
          { gender: "MALE", low: 40, high: 60 },
          { gender: "FEMALE", low: 50, high: 70 },
        ],
      },
      {
        name: "LDL Cholesterol (Bad)",
        code: "LDL",
        unit: "mg/dL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 0, high: 100 }],
        criticalHigh: 190,
      },
      {
        name: "Triglycerides",
        code: "TRIG",
        unit: "mg/dL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 50, high: 150 }],
        criticalHigh: 500,
      },
    ],
    frequentlyAskedQuestions: [
      {
        question: "Why is fasting strictly required?",
        answer: "Fat intake directly affects serum triglycerides and calculated LDL values, making fasting essential for clinical accuracy.",
      },
    ],
  },
  {
    id: "test-hba1c",
    slug: "glycated-hemoglobin-hba1c",
    code: "BIO-008",
    name: "Glycated Hemoglobin (HbA1c) HPLC",
    category: "Clinical Biochemistry",
    categorySlug: "clinical-biochemistry",
    description: "Gold-standard HPLC methodology measuring average glycemic control over the preceding 90 days for diabetes management.",
    sampleType: "Whole Blood (EDTA)",
    turnaroundTime: "Same Day (3 Hours)",
    price: 900,
    preparationInstructions: "No fasting required. Test can be drawn at any hour of the day.",
    isPopular: true,
    parameters: [
      {
        name: "HbA1c Concentration",
        code: "HBA1C",
        unit: "%",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 4.0, high: 5.6 }],
        criticalHigh: 10.0,
      },
      {
        name: "Estimated Average Glucose (eAG)",
        code: "EAG",
        unit: "mg/dL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 70, high: 115 }],
      },
    ],
  },
  {
    id: "test-lft",
    slug: "liver-function-test-lft",
    code: "BIO-012",
    name: "Liver Function Test (LFT) Panel",
    category: "Clinical Biochemistry",
    categorySlug: "clinical-biochemistry",
    description: "Evaluates hepatic enzymes (SGPT/ALT, SGOT/AST), Bilirubin, and Alkaline Phosphatase to assess liver parenchymal integrity.",
    sampleType: "Serum",
    turnaroundTime: "Same Day (5 Hours)",
    price: 1400,
    preparationInstructions: "Preferably 8 hours fasting before specimen collection.",
    isPopular: true,
    parameters: [
      {
        name: "Serum Bilirubin (Total)",
        code: "TBIL",
        unit: "mg/dL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 0.2, high: 1.2 }],
        criticalHigh: 5.0,
      },
      {
        name: "SGPT / ALT",
        code: "ALT",
        unit: "U/L",
        parameterType: "NUMERIC",
        referenceRanges: [
          { gender: "MALE", low: 10, high: 50 },
          { gender: "FEMALE", low: 10, high: 35 },
        ],
        criticalHigh: 250,
      },
      {
        name: "SGOT / AST",
        code: "AST",
        unit: "U/L",
        parameterType: "NUMERIC",
        referenceRanges: [
          { gender: "MALE", low: 15, high: 45 },
          { gender: "FEMALE", low: 15, high: 35 },
        ],
        criticalHigh: 200,
      },
      {
        name: "Alkaline Phosphatase (ALP)",
        code: "ALP",
        unit: "U/L",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 44, high: 147 }],
      },
    ],
  },
  {
    id: "test-creatinine",
    slug: "serum-creatinine-with-egfr",
    code: "BIO-019",
    name: "Serum Creatinine with eGFR",
    category: "Clinical Biochemistry",
    categorySlug: "clinical-biochemistry",
    description: "Evaluates renal filtration efficacy and glomerular filtration rate (eGFR) utilizing enzymatic dry chemistry.",
    sampleType: "Serum",
    turnaroundTime: "Same Day (3 Hours)",
    price: 450,
    preparationInstructions: "Refrain from heavy red meat intake or intense bodybuilding exercises 24 hours prior.",
    isPopular: true,
    parameters: [
      {
        name: "Serum Creatinine",
        code: "CREAT",
        unit: "mg/dL",
        parameterType: "NUMERIC",
        referenceRanges: [
          { gender: "MALE", low: 0.7, high: 1.3 },
          { gender: "FEMALE", low: 0.5, high: 1.1 },
        ],
        criticalHigh: 4.0,
      },
      {
        name: "eGFR (CKD-EPI Formula)",
        code: "EGFR",
        unit: "mL/min/1.73m²",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 90, high: 120 }],
        criticalLow: 15,
      },
    ],
  },
  {
    id: "test-tsh",
    slug: "thyroid-stimulating-hormone-tsh",
    code: "HOR-002",
    name: "Ultrasensitive TSH (3rd Generation)",
    category: "Hormones & Endocrinology",
    categorySlug: "endocrinology",
    description: "Third-generation CLIA assay diagnosing primary hypothyroidism, thyrotoxicosis, and pituitary-thyroid feedback balance.",
    sampleType: "Serum",
    turnaroundTime: "Same Day (6 Hours)",
    price: 750,
    preparationInstructions: "Early morning sample recommended before taking thyroid prescription medications.",
    isPopular: true,
    parameters: [
      {
        name: "TSH Concentration",
        code: "TSH",
        unit: "µIU/mL",
        parameterType: "NUMERIC",
        referenceRanges: [{ gender: "BOTH", low: 0.35, high: 4.94 }],
        criticalLow: 0.01,
        criticalHigh: 20.0,
      },
    ],
  },
  {
    id: "test-xray-chest",
    slug: "digital-x-ray-chest-pa-view",
    code: "RAD-001",
    name: "Digital X-Ray Chest (P/A View)",
    category: "Radiology & Imaging",
    categorySlug: "radiology-imaging",
    description: "High-resolution digital radiography of lungs, mediastinum, pleural spaces, and cardiac silhouette.",
    sampleType: "Imaging Radiograph",
    turnaroundTime: "Within 2 Hours",
    price: 800,
    preparationInstructions: "Remove metallic items, necklaces, and bra with underwire before positioning.",
    isPopular: true,
    parameters: [
      {
        name: "Radiological Findings",
        code: "XRAY_FINDINGS",
        unit: "text",
        parameterType: "TEXT",
        referenceRanges: [{ gender: "BOTH", textRange: "Lungs clear, cardiothoracic ratio normal" }],
      },
    ],
  },
  {
    id: "test-usg-abdomen",
    slug: "usg-whole-abdomen-with-pvr",
    code: "USG-002",
    name: "USG Whole Abdomen with Post-Void Residual",
    category: "Ultrasonography (USG)",
    categorySlug: "ultrasonography",
    description: "Precision 4D color ultrasound assessing liver, gallbladder, pancreas, kidneys, spleen, bladder, and prostate.",
    sampleType: "Sonographic Scan",
    turnaroundTime: "Same Day (Report in 2 Hours)",
    price: 2200,
    preparationInstructions: "6 hours fasting for upper abdomen, full bladder required for pelvic evaluation.",
    isPopular: true,
    parameters: [
      {
        name: "Sonographic Impression",
        code: "USG_IMPRESSION",
        unit: "text",
        parameterType: "TEXT",
        referenceRanges: [{ gender: "BOTH", textRange: "Normal abdominal sonogram" }],
      },
    ],
  },
];

export const MOCK_DOCTORS: MockDoctor[] = [
  {
    id: "doc-1",
    slug: "prof-dr-mizanur-rahman",
    name: "Prof. Dr. Mizanur Rahman",
    title: "Head of Laboratory Medicine & Senior Pathologist",
    specialization: "Clinical Pathology & Hematology",
    qualification: "MBBS, FCPS (Pathology), FRCPath (London)",
    experienceYears: 24,
    bmdcRegNo: "A-18492",
    branch: "Dhanmondi Main Diagnostic Hub",
    branchSlug: "dhanmondi-main",
    availableDays: ["Sat", "Sun", "Mon", "Tue", "Wed"],
    timing: "09:00 AM – 02:00 PM",
    consultationFee: 1500,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    biography: "Prof. Dr. Mizanur Rahman is an internationally acclaimed pathologist with over two decades of clinical leadership in histopathology, flow cytometry, and hematologic malignancies.",
  },
  {
    id: "doc-2",
    slug: "dr-farzana-chowdhury",
    name: "Dr. Farzana Chowdhury",
    title: "Senior Consultant Radiologist",
    specialization: "Radiology, CT & High-Resolution USG",
    qualification: "MBBS, M.Phil (Radiology & Imaging), Fellow ECR",
    experienceYears: 16,
    bmdcRegNo: "A-29401",
    branch: "Gulshan Premium Center",
    branchSlug: "gulshan-premium",
    availableDays: ["Sun", "Mon", "Wed", "Thu"],
    timing: "10:00 AM – 04:00 PM",
    consultationFee: 1800,
    image: "https://images.unsplash.com/photo-1594824813579-9943f7f45209?auto=format&fit=crop&w=600&q=80",
    biography: "Dr. Farzana Chowdhury specializes in cross-sectional neuro-imaging, musculoskeletal ultrasonography, and non-invasive cardiovascular CT angiography.",
  },
  {
    id: "doc-3",
    slug: "dr-tariq-ahmed-khan",
    name: "Dr. Tariq Ahmed Khan",
    title: "Consultant Cardiologist & Electrophysiologist",
    specialization: "Preventive Cardiology & Echo Diagnostics",
    qualification: "MBBS, MD (Cardiology), MRCP (UK)",
    experienceYears: 18,
    bmdcRegNo: "A-22874",
    branch: "Dhanmondi Main Diagnostic Hub",
    branchSlug: "dhanmondi-main",
    availableDays: ["Sat", "Mon", "Tue", "Wed", "Thu"],
    timing: "04:00 PM – 09:00 PM",
    consultationFee: 2000,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    biography: "Expert in early detection of ischemic coronary disease, heart failure telemetry, and stress echocardiography protocols.",
  },
  {
    id: "doc-4",
    slug: "dr-nusrat-jahan",
    name: "Dr. Nusrat Jahan",
    title: "Consultant Biochemist & Molecular Diagnostics Lead",
    specialization: "Endocrinology & Metabolic Biomarkers",
    qualification: "MBBS, M.Phil (Biochemistry), PhD (Endocrine Biomarkers)",
    experienceYears: 14,
    bmdcRegNo: "A-34109",
    branch: "Uttara Diagnostic Wing",
    branchSlug: "uttara-wing",
    availableDays: ["Sat", "Sun", "Tue", "Wed"],
    timing: "09:30 AM – 03:30 PM",
    consultationFee: 1400,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    biography: "Specialist in hormone assays, gestational diabetes profiling, lipid genetics, and automated immunoassay validation.",
  },
];

export const MOCK_BRANCHES: MockBranch[] = [
  {
    id: "branch-dhanmondi",
    slug: "dhanmondi-main",
    name: "Dhanmondi Main Diagnostic Hub",
    address: "House 42, Road 9/A, Dhanmondi R/A, Dhaka 1209",
    phone: "+880 2 966 8400",
    emergencyPhone: "+880 1819 000 111",
    email: "dhanmondi@diagnoaid.com",
    openingHours: "Open 24 Hours / 7 Days",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    facilities: [
      "24/7 Phlebotomy & Emergency Sampling",
      "Fully Automated Roche & Sysmex Lab",
      "128-Slice Low-Dose CT Scanner",
      "3.0 Tesla Silent MRI",
      "Priority VIP Patient Lounge",
      "Valet Parking & Ambulance Access",
    ],
    availableTestsCount: 145,
    doctorsCount: 18,
  },
  {
    id: "branch-gulshan",
    slug: "gulshan-premium",
    name: "Gulshan Premium Center",
    address: "Plot 14, Gulshan Avenue, Circle 1, Dhaka 1212",
    phone: "+880 2 883 4500",
    emergencyPhone: "+880 1819 000 222",
    email: "gulshan@diagnoaid.com",
    openingHours: "07:00 AM – 11:00 PM (Daily)",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    facilities: [
      "Executive Preventive Health Suites",
      "Digital Radiography & 4D Color Doppler",
      "Molecular PCR Virology Suite",
      "Dedicated Pediatric Sampling Room",
      "Same-Day Urgent Report Delivery",
    ],
    availableTestsCount: 130,
    doctorsCount: 14,
  },
  {
    id: "branch-uttara",
    slug: "uttara-wing",
    name: "Uttara Diagnostic Wing",
    address: "Sector 7, Jasimuddin Avenue, Uttara, Dhaka 1230",
    phone: "+880 2 895 2100",
    emergencyPhone: "+880 1819 000 333",
    email: "uttara@diagnoaid.com",
    openingHours: "07:30 AM – 10:30 PM (Daily)",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    facilities: [
      "Home Blood Collection Service",
      "Automated Hormone & Immuno Analyzers",
      "Digital Chest & Dental OPG X-Ray",
      "Online Report Kiosk with QR Scanner",
    ],
    availableTestsCount: 110,
    doctorsCount: 10,
  },
  {
    id: "branch-chattogram",
    slug: "chattogram-regional",
    name: "Chattogram Regional Center",
    address: "102 O.R. Nizam Road, GEC Circle, Chattogram",
    phone: "+880 31 654 321",
    emergencyPhone: "+880 1819 000 444",
    email: "ctg@diagnoaid.com",
    openingHours: "08:00 AM – 10:00 PM (Daily)",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    facilities: [
      "Regional Referral Clinical Laboratory",
      "Digital Radiology & Echocardiography",
      "Specialized Women's Imaging Center",
    ],
    availableTestsCount: 95,
    doctorsCount: 8,
  },
];

export const MOCK_ARTICLES: MockArticle[] = [
  {
    id: "art-1",
    slug: "understanding-lipid-profile-results",
    title: "De-coding Your Lipid Profile: Beyond Just Total Cholesterol",
    category: "Diagnostic Tests",
    excerpt: "Why the ratio of ApoB to HDL and particle density provides a far clearer assessment of cardiovascular risk than total cholesterol alone.",
    content: `Cardiovascular disease remains the leading health challenge worldwide. When interpreting a lipid profile, modern medicine looks beyond total numbers...`,
    author: "Dr. Tariq Ahmed Khan",
    authorTitle: "Senior Consultant Cardiologist",
    publishedDate: "September 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-2",
    slug: "role-of-hba1c-in-diabetes-longevity",
    title: "HbA1c & Glucose Variability: The Metric for Metabolic Health",
    category: "Prevention",
    excerpt: "Understanding how glycated hemoglobin measures 90-day systemic glucose exposure and why maintaining optimal levels protects organ micro-vasculature.",
    content: `The HbA1c test gives physicians a retrospective snapshot of blood sugar balance over the 90-day erythrocyte lifespan...`,
    author: "Dr. Nusrat Jahan",
    authorTitle: "Consultant Biochemist & Endocrinologist",
    publishedDate: "September 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-3",
    slug: "preventive-ultrasound-in-early-detection",
    title: "High-Resolution 4D Doppler Sonography in Preventive Screening",
    category: "Health Tips",
    excerpt: "Non-invasive abdominal imaging allows prompt detection of fatty liver infiltration, renal micro-calculi, and asymptomatic gallbladder anomalies.",
    content: `Routine abdominal ultrasound examination serves as a benign, non-radiating window into internal organ parenchymal integrity...`,
    author: "Dr. Farzana Chowdhury",
    authorTitle: "Senior Consultant Radiologist",
    publishedDate: "September 10, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  },
];

export const MOCK_REPORT_SAMPLE = {
  reportId: "RPT-2026-001245",
  orderId: "ORD-2026-000123",
  patientId: "PAT-2026-000001",
  patientName: "Tanvir Ahmed",
  age: 42,
  gender: "MALE",
  phone: "+880 1711 987654",
  testCode: "HEM-001",
  testName: "Complete Blood Count (CBC) with ESR",
  category: "Pathology & Hematology",
  sampleId: "SMP-2026-000451",
  sampleType: "Whole Blood (EDTA)",
  collectedAt: "2026-09-29T08:30:00Z",
  verifiedAt: "2026-09-29T11:45:00Z",
  verifiedBy: "Prof. Dr. Mizanur Rahman, FCPS, FRCPath",
  doctorReg: "BMDC Reg: A-18492",
  branchName: "Dhanmondi Main Diagnostic Hub",
  status: "VERIFIED",
  authenticityHash: "SHA256-e4d9f10a8b29c17e3f892a014d",
  results: [
    { parameter: "Hemoglobin (Hb)", value: "14.8", unit: "g/dL", refRange: "13.5 - 17.5", flag: "NORMAL" },
    { parameter: "Total RBC Count", value: "4.95", unit: "mil/µL", refRange: "4.5 - 5.9", flag: "NORMAL" },
    { parameter: "Total WBC Count (TLC)", value: "7,800", unit: "/µL", refRange: "4,000 - 11,000", flag: "NORMAL" },
    { parameter: "Neutrophils", value: "62", unit: "%", refRange: "40 - 75", flag: "NORMAL" },
    { parameter: "Lymphocytes", value: "30", unit: "%", refRange: "20 - 45", flag: "NORMAL" },
    { parameter: "Eosinophils", value: "05", unit: "%", refRange: "01 - 06", flag: "NORMAL" },
    { parameter: "Monocytes", value: "03", unit: "%", refRange: "02 - 08", flag: "NORMAL" },
    { parameter: "Platelet Count", value: "2.40", unit: "lac/µL", refRange: "1.5 - 4.5", flag: "NORMAL" },
    { parameter: "ESR (Westergren)", value: "12", unit: "mm/1st hr", refRange: "0 - 15", flag: "NORMAL" },
  ],
  clinicalRemarks: "Hematological indices are within physiological reference boundaries. Red cell morphology normocytic normochromic.",
};
