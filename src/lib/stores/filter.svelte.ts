export type SortOption =
  | "score"
  | "pass_rate"
  | "date"
  | "agent"
  | "provider"
  | "model";
export type SortDirection = "asc" | "desc";
export type FilterType = "all" | "verified" | "community";
export type McpFilter = "all" | "yes" | "no";
export type OpenSourceFilter = "all" | "open" | "proprietary";

export class FilterStore {
  // Core State
  filterType = $state<FilterType>("verified");
  sortBy = $state<SortOption>("score");
  sortDirection = $state<SortDirection>("desc");
  searchQuery = $state("");
  selectedProviders = $state<string[]>([]);
  selectedModels = $state<string[]>([]);
  selectedAgents = $state<string[]>([]);
  mcpFilter = $state<McpFilter>("all");
  agentTypeFilter = $state<OpenSourceFilter>("all");
  modelTypeFilter = $state<OpenSourceFilter>("all");
  dateRangeMin = $state<string | null>(null);
  dateRangeMax = $state<string | null>(null);

  setFilter(type: FilterType) {
    this.filterType = type;
  }

  toggleSort(option: SortOption) {
    if (this.sortBy === option) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = option;
      // Default sort directions for different column types
      if (option === "agent" || option === "provider" || option === "model") {
        this.sortDirection = "asc";
      } else {
        this.sortDirection = "desc";
      }
    }
  }

  toggleProvider(provider: string) {
    if (this.selectedProviders.includes(provider)) {
      this.selectedProviders = this.selectedProviders.filter(
        (p) => p !== provider,
      );
    } else {
      this.selectedProviders.push(provider);
    }
  }

  toggleModel(model: string) {
    if (this.selectedModels.includes(model)) {
      this.selectedModels = this.selectedModels.filter((m) => m !== model);
    } else {
      this.selectedModels.push(model);
    }
  }

  toggleAgent(agent: string) {
    if (this.selectedAgents.includes(agent)) {
      this.selectedAgents = this.selectedAgents.filter((a) => a !== agent);
    } else {
      this.selectedAgents.push(agent);
    }
  }

  resetFilters() {
    this.searchQuery = "";
    this.selectedProviders = [];
    this.selectedModels = [];
    this.selectedAgents = [];
    this.mcpFilter = "all";
    this.agentTypeFilter = "all";
    this.modelTypeFilter = "all";
    this.dateRangeMin = null;
    this.dateRangeMax = null;
    this.filterType = "all";
    this.sortBy = "score";
    this.sortDirection = "desc";
  }
}

export const filters = new FilterStore();
