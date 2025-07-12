# 타입 변환과 단축 평가
## 목차
- [타입 변환과 단축 평가](#타입-변환과-단축-평가)
  - [목차](#목차)
    - [타입 변환이란?](#타입-변환이란)
    - [암묵적 타입 변환](#암묵적-타입-변환)
    - [명시적 타입 변환](#명시적-타입-변환)
    - [단축 평가](#단축-평가)

### 타입 변환이란?
**자바스크립트 엔진은 표현식을 에러 없이 평가하기 위해 피연산자의 값을 암묵적 타입 변환해 새로운 타입의 값을 만들어 단 한번 사용하고 버린다
즉, 타입 변경 시에는 기존 값을 참조해 새로운 값을 만들어 재할당 하는 것이다.**
### 암묵적 타입 변환
  <details>
  <summary>문자열 변환</summary>

  ```javascript
  0 + ''  // "0"
  -0 + '' // "0"
  1 + '' // "1"
  -1 + '' // "-1"
  NaN + '' // "NaN"
  Infinity + '' // "Infinity"
  -Infinity + '' // "-Infinity"

  true + '' // "true"
  false + '' // "false"

  null + '' // "null"

  undefined + '' // "undefined"

  (Symbol()) + '' // TypeError: Cannot convert a Symbol value to a string

  ({}) + '' // "[object] [object]"
  Math + '' // "[object] [Math]"
  [] + '' // ""
  [10, 20] + '' // "10,20"
  (function(){}) + '' // "function(){}"
  Array + '' // "function Array() { [native code] }"
  ```
  </details>
  <details>

  <summary>숫자 변환</summary>
  
  - 산술 연산자의 역할은 숫자 값을 만드는 것. 문맥상 피연산자는 모두 숫자 타입이어야 한다. 따라서 엔진은 산술연산자의 피연산자 중 숫자 타입이 아닌 값을 암묵적 타입 변환 한다.
  ```javascript
  +'' // 0
  +'0' // 0
  +'1' // 1
  +'string' // NaN

  +true // 1
  +false // 0

  +null // 0
  
  +undefined // NaN

  +Symbol() // TypeError

  +{} // NaN
  +[] // 0
  +[10, 20] // NaN
  +(function(){}) // NaN
  ```
  </details>

  <details>

  <summary>불리언 변환</summary>

    - 자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값과 Falsy 값으로 구분함
    - Falsy 값 : false, undefined, null, 0, -0, NaN, ''
    - Truthy 값 : Falsy 값을 제외한 모든 값.
    - isTruthy(), isFalsy() 함수로 구분 가능
    ```javascript
    if('') console.log('1');
    if(true) console.log('2');
    if(0) console.log('3');
    if('str') console.log('4');
    if(null) console.log('5');

    // -> 2 4
    ```
  </details>

### 명시적 타입 변환

<details>
      
<summary>문자열 변환</summary>

1. String 생성자 함수를 new 연산자 없이 호출
2. Object.prototype.toString 메서드 사용
3. 문자열 연결 연산자 이용
  ```javascript
  // 방법 1.
  String(1); // "1"
  String(NaN); // "NaN"
  String(Infinity); // "Infinity"
  String(true); // "true"
  String(false); // "false"
  // 방법 2.
  (1).toString(); // "1"
  (NaN).toString(); // "NaN"
  (Infinity).toString(); // "Infinity"
  (true).toString(); // "true"
  (false).toString(); // "false"
  // 방법 3.
  1 + '' // "1"
  NaN + '' // "NaN"
  Infinity + '' // "Infinity"
  true + '' // "true"
  false + '' // "false"
  ```
  </details>
  <details>
  <summary>숫자 변환</summary>

  1. Number 생성자 함수를 new 연산자 없이 호출
  2. parseInt, parseFloat 함수 사용
  3. '+' 단항 산술 연산자 이용
  4. '*' 산술 연산자 이용
  ```javascript
  // 방법 1.
  Number('0'); // 0
  Number('-1'); // -1
  Number('10.53'); // 10.53
  Number(true); // 1
  Number(false); // 0
  // 방법 2.
  parseInt('0'); // 0
  parseInt('-1'); // -1
  parseFloat('10.53'); // 10.53
  
  // 방법 3.
  +'0'; // 0
  +'-1'; // -1
  +'10.53'; // 10.53
  +true; // 1
  +false; // 0
  // 방법 4.
  '0' * 1; // 0
  '-1' * 1; // -1
  '10.53' * 1; // 10.53
  true * 1; // 1
  false * 1; // 0
  ```
</details>
<details>
<summary>불리언 변환</summary>

  8. Boolean 생성자 함수를 new 연산자 없이 호출
  9. ! 부정 논리 연산자를 두번 사용
  ```javascript
  // 방법 1.
  Boolean('x'); // true
  Boolean(''); // false
  Boolean('false'); // true
  Boolean(0); // false
  Boolean(1); // true
  Boolean(NaN); // false
  Boolean(Infinity); // true
  Boolean(null); // false
  Boolean(undefined); // false
  Boolean({}); // true
  Boolean([]); // true
  // 방법 2.
  !!'x'; // true
  !!''; // false
  !!'false' // true
  !!0; // false
  !!1; // true
  !!NaN; // false
  !!Infinity; // true
  !!null; // false
  !!undefined; // false
  !!{}; // true
  !![]; // true
  ```
</details>

### 단축 평가
- 논리곱(&&) 논리합(||) 연산자는 연산 결과가 항상 불리언 값은 아니다.
- 논리곱, 논리합 연산자는 **논리 연산의 결과를 결정하는** 피연산자를 타입 변환하지 않고 그대로 반환한다
    ```javascript
    'Cat' || 'Dog' // "Cat"
    false || 'Dog' // "Dog"
    'Cat' || false // "Cat"

    'Cat' && 'Dog' // "Dog"
    false && 'Dog' // false
    'Cat' && false // false
    ```
- 참조 에러 방지
    ```javascript
    var elem = null;
    var value = elem.value; // TypeError
    ```
    ```javascript
    var elem = null;
    var value = elem && elem.value; // 단축평가로 에러 방지
    ```
- 옵셔널 체이닝 연산자
  - 좌항의 피연산자가 null이나 undefined 인 경우 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
  - 다만 좌항이 해당 두개가 아닌 다른 Falsy 값인 경우라도 프로퍼티 참조를 이어간다.
  - (이러면 단축평가가 더 좋은 거 아닌가?)
    ```javascript
    var elem = null;
    var value = elem?.value;
    console.log(vaule) // undefined
    ```
- null 병합 연산자
  - 좌항의 피연산자가 null 또는 undefined 인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
  - 옵셔널 체이닝 연산자와 동일하게 해당 두개의 값이 아닌 Falsy 값인 경우 Falsy 값을 그대로 반환함.
    ```javascript
    var foo = null ?? 'default string';
    console.log(foo); // "default string"
    var foo2 = "" ?? 'default string';
    console.log(foo2); // ""
    ```