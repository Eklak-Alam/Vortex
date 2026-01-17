import Hero from "@/components/Hero";
import TaskDashboard from "@/components/TaskDashboard";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <TaskDashboard />
      {/* You can add Feature sections or Task Lists here later */}
    </div>
  );
}