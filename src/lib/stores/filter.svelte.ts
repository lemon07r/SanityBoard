export type SortOption = "score" | "pass_rate" | "date";

export class FilterStore {
  verifiedOnly = $state(true);
  sortBy = $state<SortOption>("score");

  showThirdParty = $derived(!this.verifiedOnly);

  toggleVerified() {
    this.verifiedOnly = !this.verifiedOnly;
  }
}

export const filters = new FilterStore();
