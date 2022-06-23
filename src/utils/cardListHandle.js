//  test
import img1 from '../images/test_img1.png';
import img2 from '../images/test_img2.png';
import img3 from '../images/test_img3.png';
import img4 from '../images/test_img4.png';
import img5 from '../images/test_img5.png';
import img6 from '../images/test_img6.png';
import img7 from '../images/test_img7.png';
import img8 from '../images/test_img8.png';
import img9 from '../images/test_img9.png';
import img10 from '../images/test_img10.png';
import img11 from '../images/test_img11.png';
import img12 from '../images/test_img12.png';
//

function cardListHandle(ARR_LENGTH) {
  function getRandImg() {
    const arr = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
    return arr[Math.floor((Math.random() * arr.length))];
  }

  function getImgArr() {
    const arr = [];
    for (let i = 0; i < ARR_LENGTH; i += 1) {
      arr.push({
        title: 'В погоне за Бенкси',
        image: getRandImg(),
      });
    }
    return arr;
  }
  return getImgArr(ARR_LENGTH);
}

export default cardListHandle;
