import instance from "./instance";
export default {
    getAllMovies(page, payload) {
        return instance.get(`v2.2/films?page=${page}`, payload);
    },
    getMovie(id, payload) {
        return instance.get(`v2.2/films/${id}`, payload);
    },
}