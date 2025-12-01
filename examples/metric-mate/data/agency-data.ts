// Mock Data for "MetricMate" - Agency Client Portal

export type Campaign = {
  id: string;
  name: string;
  platform: "Google Ads" | "Facebook Ads" | "LinkedIn Ads" | "TikTok Ads";
  status: "Active" | "Paused" | "Completed";
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number; // Conversion Value
};

export type ClientData = {
  id: string;
  name: string;
  industry: string;
  campaigns: Campaign[];
};

export const agencyClients: ClientData[] = [
  {
    id: "client_1",
    name: "TechFlow SaaS",
    industry: "B2B Software",
    campaigns: [
      {
        id: "c1",
        name: "Q1 Lead Gen - Search",
        platform: "Google Ads",
        status: "Active",
        spend: 4500,
        impressions: 12000,
        clicks: 850,
        conversions: 45,
        revenue: 0, // Lead gen often has 0 direct revenue tracked in ad platforms
      },
      {
        id: "c2",
        name: "Retargeting - Webinar",
        platform: "LinkedIn Ads",
        status: "Active",
        spend: 1200,
        impressions: 5000,
        clicks: 120,
        conversions: 15,
        revenue: 0,
      },
    ],
  },
  {
    id: "client_2",
    name: "Urban Kicks",
    industry: "E-commerce",
    campaigns: [
      {
        id: "c3",
        name: "Summer Sale - Feed",
        platform: "Facebook Ads",
        status: "Active",
        spend: 8500,
        impressions: 450000,
        clicks: 12000,
        conversions: 350,
        revenue: 28000,
      },
      {
        id: "c4",
        name: "Brand Awareness - Gen Z",
        platform: "TikTok Ads",
        status: "Paused",
        spend: 2000,
        impressions: 800000,
        clicks: 4000,
        conversions: 10,
        revenue: 500,
      },
      {
        id: "c5",
        name: "Google Shopping - Sneakers",
        platform: "Google Ads",
        status: "Active",
        spend: 3200,
        impressions: 45000,
        clicks: 2100,
        conversions: 95,
        revenue: 9500,
      },
    ],
  },
];
