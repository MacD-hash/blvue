import Axios from "axios";

const state = {
    user: { // email:"admin@me.com" 
    },
    color: "red"
};
const getters = {};
const actions = {
    getUser({commit}) {
        Axios.get('/api/v1/user/current')
            .then(response => {
                commit('setUser', response.data)
            })
    },
    loginUser({},user) {
        Axios.post('/api/v1/user/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            // console.log(response.data)
            if(response.data.access_token) {
                //save token
                localStorage.setItem(
                    "blog_token",
                    response.data.access_token
                 )

                 window.location.replace("/home")
            }
        })
    }
};
const mutations = {
    setUser(state, data) {
        state.user = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
