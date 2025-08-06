# 빌트인 객체

## 목차
- [빌트인 객체](#빌트인-객체)
  - [목차](#목차)
    - [자바스크립트 객체의 분류](#자바스크립트-객체의-분류)
    - [표준 빌트인 객체](#표준-빌트인-객체)
    - [원시값과 래퍼 객체](#원시값과-래퍼-객체)
    - [전역 객체](#전역-객체)
      - [`Infinity`](#infinity)
      - [`NaN`](#nan)
      - [`undefined`](#undefined)
      - [`eval` -(사용금지)](#eval--사용금지)
      - [`isFinite`](#isfinite)
      - [`isNaN`](#isnan)
      - [`parseFloat`](#parsefloat)
      - [`parseInt`](#parseint)
      - [`encodeURI` / `decodeURI`](#encodeuri--decodeuri)
      - [`encodeURIComponent` / `decodeURIComponent`](#encodeuricomponent--decodeuricomponent)

### 자바스크립트 객체의 분류
- 자바스크립트 객체는 다음과 같이 크게 3개의 객체로 분류할 수 있다.
    1. 표준 빌트인 객체 : ECMAScript 사양에 정의된 객체를 말함. 자바스크립트 실행 환경(브라우저 or node)에 상관없이 언제나 사용할 수 있다. 전역 객체의 프로퍼티로서 제공됨.
    2. 호스트 객체 : 호스트 객체는 ECMAScript 사양에 정의되어 있지 않고 브라우저나 node 환경에서 추가로 제공됨. 브라우저 (ex dom, bom, Canvas 등), node 는 고유의 api를 호스트 객체로 제공
    3. 사용자 정의 객체 : 사용자가 직접 정의한 객체
### 표준 빌트인 객체
- 자바스크립트는 `Object`, `String`, `Number`, `Boolean`, `Symbol`, `Date`, `Math` ... 등 40여 개의 표준 빌트인 객체를 제공
- 생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공한다.
```javascript
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee');

// String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype이다.
console.log(Object.getPrototype(strObj) === String.prototype); // true
```
- 표준 빌트인 객체의 `prototype` 프로퍼티에 바인딩된 객체(예를 들어 `String.prototype`)는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다. 그리고 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공한다.
    ```javascript
    const numObj = new Number(1.5); // Number {1.5}
    console.log(numObj.toFixed()); // 2
    // isInteget 는 Number 의 정적 메서드
    console.log(Number.isInteger(0.5)); // false
    ```
### 원시값과 래퍼 객체
- 원시 값이 있는데 String, Math, Boolean 등의 표준 빌트인 생성자 함수가 존재하는 이유는 뭘까.
- 프로토타입 메서드를 활용하기 위해 ㅋ
```javascript
const str = 'hello';
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI

console.log(typeof str); // string
```
- 위의 코드를 보면 원시 값에 마침표 표기법(혹은 대괄호 표기법)으로 접근하면 js엔진이 일시적으로 원시 값을 연관된 객체로 변환해 주는 것을 알 수 있다.(바로 다시 원시값으로 되돌림).
- 이처럼 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 <span style = "color:#ff6666">래퍼 객체</span>라고 한다.
- 래퍼 객체의 처리가 종료되면 가비지 컬렉션의 대상이 된다.
```javascript
const str = 'hello';
str.name = 'lee';
console.log(str.name); // undefined
console.log(typeof str, str); // string hello
```
- 324p 의 이미지를 보면 래퍼 객체의 프로토타입에 해당 자료형의 프로토타입이 체인에 존재하는 것을 알 수 있다.
- 이처럼 문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며, 표준 빌트인 객체인 `String`, `Numberm`, `Boolean`, `Symbol` 의 프로토타입 메서드 또는 프로퍼티를 참조할 수 있다. 
- 따라서 `String`, `Number`, `Boolean` 생성자 함수를 `new` 연산자와 함께 호출하여 인스턴스를 생성할 필요가 없으며 권장하지도 않음.
- 이외의 원시값, null 과 undefined는 래퍼객체를 생성하지 않는다.(객체처럼 사용하면 에러)

### 전역 객체
- 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체(표준 빌트인 객체와 호스트 빌트인 객체)의 최상위 객체다. 전역 객체가 최상위 객체라는 것은 프로토타입 상속 관계상에서 최상위 객체라는 의미가 아니다. 전역 객체 자신은 어떤 객체의 프로퍼티도 아니며, 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 것을 말한다.
<details>
<summary>전역 객체의 특징</summary>

- 전역 객체는 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다.
- 전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략할 수 있다.(`globalThis` 는 모든 환경에서 전역을 가리킴)
- 전역 객체는 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
- 자바스크립트 실행 환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다(브라우저, node)
- `var` 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.
    ```javascript
    var foo = 1;
    console.log(window.foo); // 1
    bar = 2; // window.bar = 2
    console.log(window.bar); // 2
    function baz(){return 3;}
    console.log(window.baz()); // 3
    ```
- let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉, window.foo 와 같이 접근할 수 없다. (전역 렉시컬 환경의 선언적 환경 레코드 내에 존재 23장에서 자세히...).
- 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유한다. `<script>`로 코드를 분리해도 소용 없다. 분리되어 있는 자바스크립트 코드가 하나의 전역을 공유하기 때문.
</details>

<details>
<summary>빌트인 전역 프로퍼티</summary>

- 빌트인 전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 주로 애플리케이션 전역에서 사용하는 값을 제공.
#### `Infinity`
- `Infinity` 프로퍼티는 무한대를 나타내는 숫자값 `Infinity`를 갖는다.
    ```javascript
    console.log(window.Infinity === Infinity); // true
    console.log(3/0); // Infinity
    console.log(-3/0); // -Infinity
    console.log(typeof Infinity); // number
    ```
#### `NaN`
- `NaN` 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값 `NaN`을 갖는다. `NaN` 프로퍼티는 `Number.NaN` 프로퍼티와 같다.
    ```javascript
    console.log(window.NaN); // NaN
    console.log(Number('xyz')); // NaN
    console.log(1 * 'string'); // NaN
    console.log(typeof NaN); // number
    ```
#### `undefined`
- `undefined` 프로퍼티는 원시 타입 `undefined`를 값으로 갖는다.
    ```javascript
    console.log(window.undefined); // undefined
    var foo;
    console.log(foo); // undefined
    console.log(typeof undefined); // undefined
    ```
</details>
<details>
<summary>빌트인 전역 함수</summary>

- 빌트인 전역 함수는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드다.
#### `eval` -(사용금지)
- `eval` 함수는 자바스크립트 코드를 나타내는 문자열을 인수로 전달 받는다. 전달받은 문자열 코드가 표현식이라면 `eval` 함수는 문자열 코드를 런타임에 평가하여 값을 생성하고, 전달받은 인수가 표현식이 아닌 문이라면 `eval` 함수는 문자열 코드를 런타임에 실행한다.
- `eval` 함수는 보안에 매우 취약하다. 또한 엔진에 의해 최적화가 수행되지 않으므로 처리속도도 느리다. 사용하는 일이 없도록 하자.
    ```javascript
    // 표현식인 문
    eval('1+2;'); // 3
    // 표현식이 아닌 문
    eval('var x = 5;'); // undefined

    // eval 함수에 의해 런타임에 변수 선언문이 실행되어 x 변수가 선언되었다.
    console.log(x); // 5
    // 객체 리터럴은 반드시 괄호로 둘러싼다
    const o = eval('({a : 1})');
    console.log(o); // {a: 1}
    // 함수 리터럴은 반드시 괄호로 둘러싼다
    const f = eval('(function(){return 1;})');
    console.log(f()); // 1
    ```
- 인수로 전달 받은 문자열 코드가 여러 개의 문으로 이루어져 있다면 모든 문을 실행한 다음 마지막 결과값을 반환한다.
    ```javascript
    eval('1+2; 3+4;'); // 7
    ```
- `eval` 함수는 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수정한다.
- (strict mode 는 건너 뛰었으니 일단 넘기자)
    ```javascript
    const x = 1;
    function foo(){
        eval('var x = 2;');
        console.log(x); // 2
    }
    foo();
    console.log(x); // 1
    ```

#### `isFinite`
- 전달 받은 인수가 정상적인 유한수인지 검사하여 유한수이면 true를 반환하고 무한수이면 false를 반환한다. 이때 인수가 `NaN` 으로 평가되는 값이라면 false를 반환한다.
    ```javascript
    isFinite(0); // true
    isFinite(2e64); // true
    isFinite('10'); // true
    isFinite(null); // true: null -> 0

    isFinite(Infinity); // false
    isFinite(-Infinity); // false

    isFinite(NaN); // false
    isFinite('hello'); // false
    isFinite('2002/12/12'); // false
    ```
#### `isNaN`
- 전달받은 인수가 `NaN`인지 검사하여 그 결과를 불리언 타입으로 반환한다. 인수가 숫자 타입이 아니면 타입 변환 후 검사한다.
    ```javascript
    isNaN(NaN); // true
    isNaN(10); // false

    isNaN('blabla'); // true: 'blabla' -> NaN
    isNaN('10'); // false: '10' -> 10
    isNaN(10.12); // false: '10.12' -> 10.12
    isNaN(''); // false: '' -> 0
    isNaN(' '); // false: ' ' -> 0

    isNaN(true); // false: true -> 1
    isNaN(null); // false: null -> 0

    isNaN(undefined); // true: undefined -> NaN

    isNaN({}); // true: {} -> NaN

    isNaN(new Date()); // false: new Date() -> Number
    isNaN(new Date().toString()); // true: String -> NaN
    ```
#### `parseFloat`
- 전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환함.
    ```javascript
    parseFloat('3.14'); // 3.14
    parseFloat('10.00'); // 10
    // 공백 구분 문자열은 첫 문자열만 반환
    parseFloat(`34 45 66`); // 34
    parseFloat('40 years'); // 40
    // 첫 문자열 못바꾸면 NaN 반환
    parseFloat('He was 40'); // NaN
    // 앞뒤 공백 무시
    parseFloat(' 60 '); // 60
    ```
#### `parseInt`
- 전달받은 문자열 인수를 정수로 해석하여 반환.
    ```javascript
    parseInt('10'); // 10
    parseInt('10.123'); // 10
    // 전달받은 인수가 문자열이 아니면 분자열로 변환 후 정수로 해석하여 반환
    parseInt(10); // 10
    parseInt(10.123); // 10
    // 두 번째 인수로 진법을 나타내는 기수(2~36)를 전달할 수 있다. 반환값은 언제나 10진수다.
    parseInt('10'); // 디폴트는 10진수
    parseInt('10',2); // 2
    parseInt('10',8); // 8
    parseInt('10',16); // 16
    // 참고로 10진수를 해당 기수로 바꾸고 싶으면 Number.prototype.toString(기수) 를 사용하면 됨.
    const x = 15;
    x.toString(8); // 17
    // 또 참고로 2진수 리터럴과 8진수 리터럴은 제대로 해석하지 못함
    // 0 이후가 무시
    parseInt('0b10'); // 0
    parseInt('0o10'); // 0
    // A는 10진수로 해석 불가
    parseInt('A0'); // NaN
    // 2는 2진수로 해석 불가
    parseInt('20',2); // NaN
    // 두번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 해석된 정수값만 반환한다.
    parseInt('1A0'); // 1
    parseInt('102',2); // 2
    parseInt('58', 8); // 5
    parseInt('FG',16); // 15
    // ...
    ```
#### `encodeURI` / `decodeURI`
- URI > URL,URN 337p 참고
- 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다.
- 이스케티프 처리는 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다.
    ```javascript
    const uri = 'http://example.com?name=황재무&job=student';
    const enc = encodeURI(uri);
    console.log(enc); // http://example.com?name=%ED%99%A9%EC%9E%AC%EB%AC%B4&job=student
    const dec = decodeURI(enc);
    console.log(dec);
    // http://example.com?name=황재무&job=student
    ```
#### `encodeURIComponent` / `decodeURIComponent`
- `encodeURIComponent` / `decodeURIComponent` 는 URI 구성요소를 인수로 전달받아 인코딩한다. 해당 함수들은 유의미한 URI 구성 문자도 인코딩해버리기 때문에 쿼리스트링의 값, path 일부에만 사용해야 함.
    ```javascript
    const uriComp = 'name=황재무&job=student';
    // 해당 함수는 전달받은 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주한다.
    // 따라서 쿼리 스트링 구분자로 사용되는 = ? & 까지 인코딩한다
    let enc = encodeURIComponent(uriComp);
    console.log(enc); 
    //name%3D%ED%99%A9%EC%9E%AC%EB%AC%B4%26job%3Dstudent
    let dec = decodeURIComponent(enc);
    console.log(dec);
    // name=황재무&job=student
    enc = encodeURI(uriComp);
    console.log(enc);
    // name=%ED%99%A9%EC%9E%AC%EB%AC%B4&job=student
    dec = decodeURI(enc);
    console.log(dec);
    // name=황재무&job=student
    ```
</details>
<details>
<summary>암묵적 전역</summary>

- 선언하지 않은 식별자에 값을 할당하면 해당 식별자가 전역 객체에 프로퍼티로 추가된다.
- 따라서 해당 식별자는 변수가 아니라 전역 객체의 프로퍼티로 들어간다.
- 즉 호이스팅도 발생하지 않는다.
- 변수가 아니라 단지 프로퍼티인 해당 식별자는 `delete` 연산자로 삭제할 수 있다. 전역 변수는 프로퍼티이지만 `delete` 연산자로 삭제할 수 없다.
    ```javascript
    var x = 10; // 전역 변수

    function foo(){
        y = 20; // window.y = 20
        console.log(x+y);
    }
    foo(); // 30
    console.log(window.x); // 10
    console.log(window.y); // 20

    delete x; // 전역 변수는 삭제되지 않는다
    delete y; // 프로퍼티는 삭제된다

    console.log(window.x); // 10
    console.log(window.y); // undefined
    ```
</details>