/*
 * @Description: 测试
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-20 17:26:57
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-29 13:38:26
 */
import UtilsFn from "./utils/utils";
import $ from "jquery";

const utilsFn = new UtilsFn();

let testModel: any = {
  randomNumberArray: []
};

export default class TestFn {

  init() {
    this.utils.getSimpleRandomNumber();
  }

  utils = {
    getSimpleRandomNumber(): void {
      test('随机数', () => {
        const number = utilsFn.getSimpleRandomNumber(100, -100, 10, false, false);
        let count = 0;
        $.each(testModel.randomNumberArray, (i, item) => {
          if (item.number === number) {
            item.count++;
            count++;
          }
        });
        if (count === 0) {
          testModel.randomNumberArray.push({
            number: number,
            count: 1
          });
        }
        
        return number;
      });
      testModel.randomNumberArray.sort((a: any, b: any) => {
        return a.number - b.number;
      });
      console.table(testModel.randomNumberArray);
    }
  }
};

function test(name: string, fn: any) {
  console.time(name);
  for (let i = 0; i < 1000000; i++) {
    typeof fn === 'function' && fn();
  }
  console.timeEnd(name);
}