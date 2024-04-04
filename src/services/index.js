import instance from "./instance";
export default {
    fetchMovies(page, payload) {
        return instance.get(`v2.2/films?page=${page}`, payload);
    },
    fetchMovieById(id, payload) {
        return instance.get(`v2.2/films/${id}`, payload);
    },
}
