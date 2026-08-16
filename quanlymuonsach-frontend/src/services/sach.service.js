import createApiClient from "./api.service";

class SachService {
    constructor(baseUrl = "/api/sach") {
        this.api = createApiClient("http://localhost:3000" + baseUrl);
    }
    
    async getAll(params) {
        return (await this.api.get("/", { params })).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async create(data) {
        return (await this.api.post("/", data, {
            headers: { "Content-Type": "multipart/form-data" }
        })).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })).data;
    }
}

export default new SachService();