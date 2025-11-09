import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, CalendarIcon } from "lucide-react";
import type React from "react";

type ReportCardProps = {
  entry: any;
};

const ReportCard: React.FC<ReportCardProps> = ({ entry }) => {
  return (
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

      <CardContent className="grid grid-cols-1 gap-4">
        {/* MORNING Report */}
        <div className="p-4 border rounded-md bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <h3 className="font-semibold text-sm uppercase">Morning Report</h3>
          </div>
          {entry.MORNING ? (
            <div className="text-sm space-y-1">
              <div className="grid grid-cols-2">
                <p>
                  <strong>HQ:</strong> {entry.MORNING.hq}
                </p>
                <p>
                  <strong>DB:</strong> {entry.MORNING.dbName}
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-2">
                <p>
                  <strong>Town:</strong> {entry.MORNING.town}
                </p>
                <p>
                  <strong>Beat:</strong> {entry.MORNING.beat || "—"}
                </p>
              </div>
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
            <h3 className="font-semibold text-sm uppercase">Evening Report</h3>
          </div>

          {entry.EVENING ? (
            <div className="text-sm space-y-2">
              <div className="grid grid-cols-2">
                <p>
                  <strong>HQ:</strong> {entry.EVENING.hq}
                </p>
                <p>
                  <strong>Town:</strong> {entry.EVENING.town}
                </p>
              </div>
              <Separator />
              {/* TC and PC */}
              <div className="grid grid-cols-2">
                <p>
                  <strong>TC:</strong> {entry.EVENING.tc ?? "—"}
                </p>
                <p>
                  <strong>PC:</strong> {entry.EVENING.pc ?? "—"}
                </p>
              </div>
              <Separator />
              {/* CTC / ATC */}
              <div className="grid grid-cols-2">
                <p>
                  <strong>CTC Weight:</strong> {entry.EVENING.ctcWeight ?? "—"}
                </p>
                <p>
                  <strong>CTC Value:</strong> {entry.EVENING.ctcValue ?? "—"}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>
                  <strong>ATC Weight:</strong> {entry.EVENING.atcWeight ?? "—"}
                </p>
                <p>
                  <strong>ATC Value:</strong> {entry.EVENING.atcValue ?? "—"}
                </p>
              </div>
              <Separator />
              {/* VAP */}
              <div className="grid grid-cols-2">
                <p>
                  <strong>VAP Packet:</strong> {entry.EVENING.vapPacket ?? "—"}
                </p>
                <p>
                  <strong>VAP Value:</strong> {entry.EVENING.vapValue ?? "—"}
                </p>
              </div>

              {/* Total */}
              <div className="grid grid-cols-2">
                <p>
                  <strong>Total Weight:</strong>{" "}
                  {entry.EVENING.totalWeight ?? "—"}
                </p>
                <p>
                  <strong>Total Value:</strong>{" "}
                  {entry.EVENING.totalValue ?? "—"}
                </p>
              </div>
              <Separator />
              {/* Remarks */}
              <div>
                <p>
                  <strong>Remarks:</strong> {entry.EVENING.remarks ?? "—"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No evening report submitted.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
