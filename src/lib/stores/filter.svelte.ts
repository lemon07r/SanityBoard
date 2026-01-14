export class FilterStore {
    verifiedOnly = $state(true);
    showThirdParty = $derived(!this.verifiedOnly);

    toggleVerified() {
        this.verifiedOnly = !this.verifiedOnly;
    }
}

export const filters = new FilterStore();
