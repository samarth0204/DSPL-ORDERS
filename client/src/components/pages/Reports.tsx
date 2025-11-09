"use client";

import { useState } from "react";
import { Plus, Sun, Moon, CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DailyReportForm } from "../common/DailyReportForm";
import { useFetchReports } from "@/hooks/reportHooks";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

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
          <div className="space-y-6">
            {data.map((entry: any) => (
              <Card key={entry.date} className="shadow-sm border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-lg font-semibold">
                      {new Date(entry.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </Badge>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* MORNING Report */}
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <h3 className="font-semibold text-sm uppercase">
                        Morning Report
                      </h3>
                    </div>
                    {entry.MORNING ? (
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>HQ:</strong> {entry.MORNING.hq}
                        </p>
                        <p>
                          <strong>DB:</strong> {entry.MORNING.dbName}
                        </p>
                        <p>
                          <strong>Town:</strong> {entry.MORNING.town}
                        </p>
                        <p>
                          <strong>Beat:</strong> {entry.MORNING.beat || "—"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No morning report submitted.
                      </p>
                    )}
                  </div>

                  {/* EVENING Report */}
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="h-4 w-4 text-blue-500" />
                      <h3 className="font-semibold text-sm uppercase">
                        Evening Report
                      </h3>
                    </div>
                    {entry.EVENING ? (
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>HQ:</strong> {entry.EVENING.hq}
                        </p>
                        <p>
                          <strong>Town:</strong> {entry.EVENING.town}
                        </p>
                        <p>
                          <strong>CTC Value:</strong>{" "}
                          {entry.EVENING.ctcValue || "—"}
                        </p>
                        <p>
                          <strong>Total Value:</strong>{" "}
                          {entry.EVENING.totalValue || "—"}
                        </p>
                        <p>
                          <strong>Remarks:</strong>{" "}
                          {entry.EVENING.remarks || "—"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No evening report submitted.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
