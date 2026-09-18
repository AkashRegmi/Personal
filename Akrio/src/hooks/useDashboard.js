import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.services";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService,
  });
};
