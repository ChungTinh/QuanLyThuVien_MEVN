import createApiClient from "./api.service";

class NhanVienService {
    constructor(baseUrl = "/api/nhanvien") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) { return (await this.api.post("/login", data)).data; }
    
    // THÊM 3 HÀM NÀY ĐỂ CRUD NHÂN VIÊN
    async getAll() { return (await this.api.get("/")).data; }
    async create(data) { return (await this.api.post("/", data)).data; }
    async update(id, data) { return (await this.api.put(`/${id}`, data)).data; }
    async delete(id) { return (await this.api.delete(`/${id}`)).data; }
    async updatePassword(id, data) { return (await this.api.put(`/${id}/password`, data)).data; }
}

export default new NhanVienService();