export type SortOption = "score" | "pass_rate" | "date" | "agent" | "provider" | "model";
export type FilterType = "all" | "verified" | "community";
export type McpFilter = "all" | "yes" | "no";

export class FilterStore {
  // Core State
  filterType = $state<FilterType>("verified");
  sortBy = $state<SortOption>("score");
  searchQuery = $state("");
  selectedProviders = $state<string[]>([]);
  selectedModels = $state<string[]>([]);
  mcpFilter = $state<McpFilter>("all");

  setFilter(type: FilterType) {
    this.filterType = type;
  }
  
  toggleProvider(provider: string) {
    if (this.selectedProviders.includes(provider)) {
        this.selectedProviders = this.selectedProviders.filter(p => p !== provider);
    } else {
        this.selectedProviders.push(provider);
    }
  }

  toggleModel(model: string) {
    if (this.selectedModels.includes(model)) {
        this.selectedModels = this.selectedModels.filter(m => m !== model);
    } else {
        this.selectedModels.push(model);
    }
  }
  
  resetFilters() {
    this.searchQuery = "";
    this.selectedProviders = [];
    this.selectedModels = [];
    this.mcpFilter = "all";
    this.filterType = "all";
  }
}

export const filters = new FilterStore();
