import { BusDataModel } from "@/models";
class Bus {
  eventList: unknown;
  constructor() {
    // 收集订阅信息,调度中心 
    // 事件列表，这项是必须的
    this.eventList = {}
  }

  // 订阅
  $on(name: string, fn) {
    this.eventList[name] = this.eventList[name] || []
    this.eventList[name].push(fn)
  }

  // 发布
  $emit(name: string, data: BusDataModel) {
    if (this.eventList[name]) {
      this.eventList[name].forEach((fn) => {
        fn(data)
      });
    }
  }

  // 取消订阅
  $off(name: string) {
    if (this.eventList[name]) {
      delete this.eventList[name]
    }
  }
}

export default new Bus()