import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Link } from "react-router";
import { MetricsCard } from "./Dashboard/metrics-card";
import { StatsChart } from "./Dashboard/stats-chart";
import { VaultTable } from "./Dashboard/vault-table";
import { useState, useEffect } from "react";
import {
  BarChart3,
  ChevronDown,
  Globe,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Circle,
} from "lucide-react";

export default function Dashboard() {
  const [difficulty, setdifficulty] = useState("Total");
  const [solved, setSolved] = useState(0);
  const [acceptanceRate, setAcceptanceRate] = useState(0);
  const [recentProblems, setRecentProblems] = useState([]);
  const [ranking, setRanking] = useState(0);
  const username = "dellis2";

  const fetchLeetcodeStats = async () => {
    const response = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`
    );
    const data = await response.json();
    console.log(data);
    setSolved(data.totalSolved);
    setRanking(data.ranking);
    setRecentProblems(data.recentSubmissions);
    const accept =
      Math.round(
        (data.matchedUserStats.totalSubmissionNum[0].submissions /
          data.matchedUserStats.acSubmissionNum[0].submissions) *
          100
      ) / 10;

    setAcceptanceRate(`${accept}%`);
  };

  useEffect(() => {
    fetchLeetcodeStats();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r bg-background/50 backdrop-blur">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Circle className="h-6 w-6" />
            <Link to="/dashboard">
              <span className="font-bold">Orbit</span>
            </Link>
          </div>
          <div className="px-4 py-4">
            <Input placeholder="Search" className="bg-background/50" />
          </div>
          <nav className="space-y-2 px-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Link to="/contacts">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                Contacts
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Globe className="h-4 w-4" />
              Calender
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Solutions
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Circle className="h-4 w-4" />
              Notes
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LifeBuoy className="h-4 w-4" />
              Support
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Overview</h1>
              <div className="text-sm text-muted-foreground"></div>
            </div>
            <Button variant="outline" className="gap-2">
              {difficulty}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricsCard
              title="Solved"
              value={solved}
              change={{
                value: "$1,340",
                percentage: "-2.1%",
                isPositive: false,
              }}
            />
            <MetricsCard
              title="Ranking"
              value={ranking}
              change={{
                value: "$1,340",
                percentage: "+13.2%",
                isPositive: true,
              }}
            />
            <MetricsCard
              title="Acceptance Rate"
              value={acceptanceRate}
              change={{
                value: "$1,340",
                percentage: "+1.2%",
                isPositive: true,
              }}
            />
          </div>
          <Card className="mt-6 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  Today
                </Button>
                <Button size="sm" variant="ghost">
                  Last week
                </Button>
                <Button size="sm" variant="ghost">
                  Last month
                </Button>
                <Button size="sm" variant="ghost">
                  Last 6 month
                </Button>
                <Button size="sm" variant="ghost">
                  Year
                </Button>
              </div>
            </div>
            <StatsChart />
          </Card>
          <div className="mt-6">
            <h1 className="text-2xl font-bold">Recent Solutions</h1>
            <VaultTable recents={recentProblems} />
          </div>
        </main>
      </div>
    </div>
  );
}
