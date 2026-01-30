import { getAllTaskForStudent } from "@/services/taskService";

export default async function MyTasksPage() {
  const res = await getAllTaskForStudent();
  console.log(res)
  return <div>MyTasks</div>;
}
