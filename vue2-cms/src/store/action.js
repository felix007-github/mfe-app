import {
    CHANGE_LOADING
} from './mutation-types.js';
export default {
    async changeLoading({
        commit,
        state
    }, params) {
       await commit(CHANGE_LOADING, params)
    }
}