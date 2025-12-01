"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { BarChart } from "./ui/bar-chart";
import { DonutChart } from "./ui/pie-chart";
import { SearchResults } from "./generative-ui/SearchResults";
import { agencyClients } from "../data/agency-data";

export function Dashboard() {
  const [selectedClientId, setSelectedClientId] = useState<string>(agencyClients[0].id);

  const selectedClient = agencyClients.find((c) => c.id === selectedClientId) || agencyClients[0];

  // Calculate Agency Metrics
  const totalSpend = selectedClient.campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = selectedClient.campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalImpressions = selectedClient.campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = selectedClient.campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = selectedClient.campaigns.reduce((sum, c) => sum + c.conversions, 0);

  const roas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) + "x" : "0x";
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + "%" : "0%";
  const cpc = totalClicks > 0 ? "$" + (totalSpend / totalClicks).toFixed(2) : "$0.00";
  const cpa = totalConversions > 0 ? "$" + (totalSpend / totalConversions).toFixed(2) : "$0.00";

  // Prepare Chart Data
  const campaignPerformance = selectedClient.campaigns.map((c) => ({
    name: c.name,
    spend: c.spend,
    revenue: c.revenue,
  }));

  const platformSpend = selectedClient.campaigns.reduce((acc, c) => {
    const existing = acc.find((p) => p.name === c.platform);
    if (existing) {
      existing.value += c.spend;
    } else {
      acc.push({ name: c.platform, value: c.spend });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Make data available to the Copilot
  useCopilotReadable({
    description: "Marketing Agency Client Data. Use this to answer questions about campaign performance, spend, and ROI.",
    value: {
      clientName: selectedClient.name,
      industry: selectedClient.industry,
      metrics: {
        totalSpend,
        totalRevenue,
        roas,
        ctr,
        cpc,
        cpa,
      },
      campaigns: selectedClient.campaigns,
    },
  });

  // Action: Generate Report
  useCopilotAction({
    name: "generateClientReport",
    description: "Generate a text summary report for the client based on current metrics.",
    parameters: [
      {
        name: "tone",
        type: "string",
        description: "The tone of the report (e.g., 'professional', 'exciting', 'concise').",
        required: false,
      },
    ],
    handler: async ({ tone }) => {
      // In a real app, this might call an API to send an email.
      // Here, we'll just return the data for the chat to render.
      return {
        message: `Report generated for ${selectedClient.name}.`,
        metrics: { totalSpend, roas, conversions: totalConversions },
        tone: tone || "professional",
      };
    },
  });

  // Define render only search action
  useCopilotAction({
    name: "searchInternet",
    available: "disabled",
    description: "Searches the internet for information.",
    parameters: [
      {
        name: "query",
        type: "string",
        description: "The query to search the internet for.",
        required: true,
      }
    ],
    render: ({args, status}) => {
      return <SearchResults query={args.query || 'No query provided'} status={status} />;
    }
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header & Client Selector */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agency Portal</h1>
          <p className="text-sm text-gray-500">Welcome back, Agent.</p>
        </div>
        <div>
            {/* Simple HTML Select for robustness if UI components are missing/complex */}
            <select
                className="p-2 border rounded-md"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
            >
                {agencyClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
        </div>
      </div>

      {/* Key Metrics Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard label="Total Spend" value={`$${totalSpend.toLocaleString()}`} />
        <MetricCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
        <MetricCard label="ROAS" value={roas} highlight={parseFloat(roas) > 2} />
        <MetricCard label="Conversions" value={totalConversions.toLocaleString()} />
        <MetricCard label="CPC" value={cpc} />
        <MetricCard label="CTR" value={ctr} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Spend vs Revenue by Campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={campaignPerformance}
              index="name"
              categories={["spend", "revenue"]}
              colors={["#3b82f6", "#10b981"]}
              valueFormatter={(value) => `$${value.toLocaleString()}`}
              showLegend={true}
              showGrid={true}
              layout="horizontal"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend by Platform</CardTitle>
            <CardDescription>Where is the budget going?</CardDescription>
          </CardHeader>
          <CardContent>
             <DonutChart
              data={platformSpend}
              category="value"
              index="name"
              valueFormatter={(value) => `$${value.toLocaleString()}`}
              colors={["#3b82f6", "#8b5cf6", "#f43f5e", "#10b981"]}
              centerText="Spend"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`bg-white p-3 rounded-lg border shadow-sm ${highlight ? 'border-green-200 bg-green-50' : 'border-gray-100'}`}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xl font-semibold ${highlight ? 'text-green-700' : 'text-gray-900'}`}>{value}</p>
        </div>
    )
}
