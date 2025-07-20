# 함수와 일급 객체
## 목차
- [](#)


### 일급 객체
- 다음과 같은 조건을 만족하는 객체를 `일급 객체`라고 한다
    1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다
    2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
    3. 함수의 매개변수에 전달할 수 있다.
    4. 함수의 반환값으로 사용할 수 있다.
    ```javascript
    // 1. 무명의 리터럴로 생성할 수 있다.
    // 2. 함수는 변수에 저장할 수 있다.
    // 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
    const increase = function(num){
        return ++num;
    };
    const decrease = function(num){
        return --num;
    };
    // 2. 함수는 객체에 저장할 수 있다.
    const auxs = {increase, decrease};
    // 3. 함수의 매개변수에 전달할 수 있다.
    // 4. 함수의 반환값으로 사용할 수 있다.
    function makeCounter(aux){
        let num = 0;

        return function(){
            num = aux(num);
            return num;
        };
    }

    // 3. 함수는 매개변수에 함수를 전달할 수 있다.
    const increaser = makeCounter(auxs.increase);
    console.log(increaser()); // 1
    console.log(increaser()); // 2

    // 3. 함수는 매개변수에 함수를 전달할 수 있다.
    const decreaser = makeCounter(auxs.decrease);
    console.log(decreaser()); // -1
    console.log(decreaser()); // -2
    ```
    - 함수는 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문)이라면 어디서든지 리터럴로 정의할 수 있으며, 런타임에 함수 객체로 평가된다.
    - 이는 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점 중 하나다.
### 함수 객체의 프로퍼티
- 함수는 객체이므로 함수도 프로퍼티를 가질 수 있다. 브라우저에서 `console.dir()`을 활용하면 객체 내부를 알 수 있음.
    ![브라우저 콘솔](#../image/image1.jpg)