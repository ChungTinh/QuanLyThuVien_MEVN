import createApiClient from "./api.service";

class DocGiaService {
    constructor(baseUrl = "/api/docgia") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(params) { return (await this.api.get("/", { params })).data; }
    async login(data) { return (await this.api.post("/login", data)).data; }
    async create(data) { return (await this.api.post("/", data)).data; }
    async update(id, data) { return (await this.api.put(`/${id}`, data)).data; }
    async delete(id) { return (await this.api.delete(`/${id}`)).data; }
}
export default new DocGiaService();