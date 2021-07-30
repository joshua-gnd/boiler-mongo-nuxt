import axios from 'axios';

const url = 'http://localhost:3001/api/posts/';

class PostService {
    // get posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                )
            } catch (error) {
                resolve(error)
            }

        })
    }

    // create posts
    static insertPost(text) {
        return axios.post(url, { text })
    }

    // delete posts
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PostService;