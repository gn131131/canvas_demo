/*
 * @Description: cursor model
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 14:52:33
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 19:15:02
 */
import img1 from '../../../assets/image/peach/1.png';
import img2 from '../../../assets/image/peach/2.png';
import img3 from '../../../assets/image/peach/3.png';
import img4 from '../../../assets/image/peach/4.png';
import img5 from '../../../assets/image/peach/5.png';
import img6 from '../../../assets/image/peach/6.png';

const cursorModel: any = {
  axisX: '',
  axisY: '',
  isClicked: false,
  isMoving: false,
  animation: {
    mode: 'picture', // 'picture' 'rect'
    offsetXScope: [30, -30],
    offsetYScope: [30, -30],
    widthScope: [20, 3],
    borderWidth: 1,
    speed: 59, // 最大59
    showNumber: 20,
    picArray: [img1, img2, img3, img4, img5, img6]
  }
}

export default cursorModel;