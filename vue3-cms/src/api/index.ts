
import axios from "axios";
import service from "@/utils/service";
export function getActApi(params) {
  return service({
    method: "get",
    url: "/act",
    params,
  });
}

export function getTableData() {
  return axios.get('/mock/table-data.json')
}