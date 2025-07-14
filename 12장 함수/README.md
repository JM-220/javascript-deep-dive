# 함수
## 목차
- [](#)

### 함수란?
- 프로그래밍 언어의 함수는 일련의 과정을 문으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것.
```javascript
// 함수 정의
function add(x,y){
    return x+y;
}
```
### 함수를 사용하는 이유
1. 코드의 재사용
2. 유지보수의 편의성
3. 코드의 신뢰성
4. 코드의 가독성
   
### 함수 리터럴
- 자바스크립트의 함수는 객체 타입의 값이다. 따라서 숫자 값을 숫자 리터럴로 생성하고 객체를 객체 리터럴로 생성하는 것처럼 함수도 함수 리터럴로 생성할 수 있다.
- 함수는 객체지만 일반 객체와는 다르다. 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다. 또한 일반 객체에는 없는 함수 객체만의 고유한 프로퍼티를 갖는다.
- 함수 리터럴에서 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자임.
```javascript
// 당연히 할당도 가능
var f = function add(x,y){
    return x+y;
}
```
### 함수 정의
<details>
<summary>함수 선언문</summary>

- 함수 선언문은 함수 이름을 생략할 수 없다.
- 함수 선언문은 표현식이 아닌 문이다. 값을 생성하지 않음. 브라우저에서 선언문을 실행하면 undefined가 출력됨.
- {} 는 블록문으로 해석될 수도, 객체 리터럴로 해석될 수도 있다. {}가 단독으로 존재하면 블록문으로 해석하고, 값으로 평가되어야 할 문맥(할당 연산자의 우변에 피연산자)에서는 객체 리터럴로 해석한다. 따라서 선언문에서는 문으로 해석.
- 함수 리터럴과 다르게 선언문으로 쓰인 함수명은 자바스크립트 엔진에 의해 암묵적으로 생성된 식별자이다. 그 식별자에 함수 객체를 할당함. 사실 함수 이름으로 호출되는 것이 아니라 식별자로 호출되는 것.
```javascript
function add(x,y){
    return x+y;
}
// console.dir은 console.log와 다르게 함수 객체의 프로퍼티까지 출력한다. Node 환경에서는 log와 같은 결과가 출력됨.
console.dir(add); // f add(x,y)
```
</details>

<details>
<summary>함수 표현식</summary>

- js의 함수는 값처럼 변수에 할당, 프로퍼티의 값, 배열의 요소 다 될 수 있다. 값의 성질을 갖는 객체를 일급객체라고 한다. 자바스크립트의 함수는 일급 객체다.
```javascript
// 선언문이 아닌 표현식은 외부에서 이름을 참조할 수 없으므로 이름을 굳이 안써도 댄다. 써도 외부에서 함수 이름으로 참조 불가능.
var add = function (x,y){
    return x+y;
};
console.log(add(2,5)); // 7
```
</details>

- 함수 생성 시점과 함수 호이스팅
  - 함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다. 또한 함수명의 동일한 식별자를 생성해 암묵적으로 할당한다.(모든 과정이 런타임 이전에 진행) => **함수 호이스팅**
  - 변수 호이스팅과 다른 점은 함수 호이스팅은 할당까지 끝난다는 점.
  - 함수 표현식으로 함수를 정의하면 변수 호이스팅이 발생해서 undefined를 참조하게 된다.
  - 함수 표현식 사용을 권장함
    ```javascript
    // 함수 참조
    console.dir(add); // f add(x,y)
    console.dir(sub); // undefined

    // 함수 호출
    console.log(add(2,5)); // 7
    console.log(sub(2,5)); // TypeError: sub is not a function

    function add(x,y){
        return x+y;
    }
    var sub = function (x,y){
        return x-y;
    }
    ```
<details>
<summary>Function 생성자 함수</summary>

- 자바스크립트 기본 제공 빌트인 함수인 Function 생성자 함수를 사용해 함수 객체를 생성해서 반환할 수 있다. 함수도 객체라 이걸 만든 것 같다.
- 일반적이지 않고 사용하지도 않음. closer를 생성하지 않고 선언문이나 표현식으로 생성한 함수와 다르게 동작함.
```javascript
var add = new Function('x','y','return x+y');
console.log(add(2,5)); // 7
```
</details>
<details>
<summary>화살표 함수</summary>

- ES6에서 도입된 함수 선언 방법.
- 항상 익명함수로 정의함
- 표현만 간략한게 아니고 내부동작이 간략화 되어 있음.
  - 생성자 함수로 사용할 수 없으며.
  - 기존 함수와 this 바인딩 방식이 다르고,
  - prototype 프로퍼티가 없으며,
  - arguments 객체를 생성하지 않는다.
  - 26장에서 자세히 살펴보자...
```javascript
const add = (x,y) => x+y;
console.log(add(2,5)); // 7
```
</details>