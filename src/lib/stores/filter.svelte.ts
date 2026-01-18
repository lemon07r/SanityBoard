export type SortOption = "score" | "pass_rate" | "date";
export type FilterType = "all" | "verified" | "community";

export class FilterStore {
  filterType = $state<FilterType>("verified");
  sortBy = $state<SortOption>("score");

  setFilter(type: FilterType) {
    this.filterType = type;
  }
}

export const filters = new FilterStore();
