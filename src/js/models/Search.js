export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.json();
            return this.result;
        }
        catch (e) {
            alert(e);
        }
    }
}

