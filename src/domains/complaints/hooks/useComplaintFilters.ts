
import { useState } from "react";
import { ComplaintFilters } from "@/common/types";

export const useComplaintFilters = () => {
  const [filters, setFilters] = useState<ComplaintFilters>({
    searchTerm: "",
    statusFilter: "all",
    categoryFilter: "all"
  });

  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const updateStatusFilter = (statusFilter: string) => {
    setFilters(prev => ({ ...prev, statusFilter }));
  };

  const updateCategoryFilter = (categoryFilter: string) => {
    setFilters(prev => ({ ...prev, categoryFilter }));
  };

  return {
    filters,
    updateSearchTerm,
    updateStatusFilter,
    updateCategoryFilter
  };
};
