"use client";

import { useState } from "react";
import { Plus, Sun, Moon, CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DailyReportForm } from "../common/DailyReportForm";
import { useFetchReports } from "@/hooks/reportHooks";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import ReportCard from "../common/ReportCard";

const Reports = () => {
  const [showDailyReportForm, setShowDailyReportForm] = useState(false);
  const salesmanId = localStorage.getItem("id") || "";
  const { data = [], isLoading, error } = useFetchReports({ salesmanId });

  if (error)
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load reports. Please try again.
      </div>
    );

  if (isLoading)
    return (
      <div className="text-center mt-4">
        <span>Loading reports...</span>
      </div>
    );

  return (
    <>
      {showDailyReportForm && (
        <DailyReportForm
          open={showDailyReportForm}
          setOpen={setShowDailyReportForm}
        />
      )}

      <div className="pt-4 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Daily Reports</h1>
          <Button onClick={() => setShowDailyReportForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Report
          </Button>
        </div>

        {/* Reports List */}
        {data.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No reports available yet.
          </div>
        ) : (
          <div className="space-y-6 md:grid md:grid-cols-2 md:gap-4">
            {data.map((entry: any) => (
              <ReportCard key={entry.date} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
