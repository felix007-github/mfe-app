
import {
    CHANGE_LOADING,
} from './mutation-types.js';
export default {
    [CHANGE_LOADING](state, info) {
        state.isLoading = info;
    },
}