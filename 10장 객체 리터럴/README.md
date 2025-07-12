# 객체 리터럴
## 목차
- [객체 리터럴](#객체-리터럴)
  - [목차](#목차)
    - [객체란?](#객체란)
    - [객체 리터럴에 의한 객체 생성](#객체-리터럴에-의한-객체-생성)
    - [프로퍼티](#프로퍼티)
    - [메서드](#메서드)
    - [프로퍼티 접근](#프로퍼티-접근)
    - [프로퍼티 값 갱신](#프로퍼티-값-갱신)
    - [프로퍼티 동적 생성](#프로퍼티-동적-생성)
    - [프로퍼티 삭제](#프로퍼티-삭제)
    - [ES6에서 추가된 객체 리터럴의 확장 기능](#es6에서-추가된-객체-리터럴의-확장-기능)

### 객체란?
- 자바스크립트는 객체 기반 프로그래밍 언어
- 원시 값을 제외한 모든 값(함수, 배열, 정규 표현식 등)이 객체이다
- 변경 가능한 값이다.
- 객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 key, value 로 구성된다.
- 함수가 프로퍼티 값으로 사용된 경우 일반 함수와 구분하기 위해 메서드라 부른다.
- 함수로 객체를 생성하기도 하고 함수가 객체이기도 하다.

### 객체 리터럴에 의한 객체 생성
- C++이나 Java 는 클래스를 사전에 정의하고 필요한 시점에 new 연산자와 함께 생성자를 호출하여 인스턴스를 생성하는 방식.
- 자바스크립트는 프로토타입 기반 객체지향 언어로서 다양한 방법을 지원한다.
  - 객체 리터럴
  - Object 생성자 함수
  - 생성자 함수
  - Object.create 메서드
  - 클래스(ES6)

```javascript
// 객체 리터럴에 의한 객체 생성
var person = {
    name:'Lee',
    sayHello: function(){
        console.log("hello");
    }
};
console.log(typeof person) // object
console.log(person) // {name : 'Lee', sayHello : f}
```
### 프로퍼티
- 객체는 프로퍼티의 집합으로 프로퍼티는 키와 값으로 구성된다.
- 프로퍼티 키로 사용할 수 있는 값
  - 빈 문자열을 포함하는 모든 문자열(식별자 네이밍을 준수하는 경우 따옴표를 생략해도 된다)
  - 문자열이 아닌 경우 내부적으로 문자열로 변환된다.
  - 심벌값
- 프로퍼티 값
  - 자바스크립트에서 사용할 수 있는 모든 값
- 프로퍼티 키 중복 선언 시, 나중에 선언한 프로퍼티가 덮어씀.
```javascript
var person = {
    firstName:'Jaemoo', // 식별자 네이밍 규칙을 준수함
    'last-name':'Hwang' // 식별자 제이밍 규칙을 준수하지 않음 따옴표가 없으면 산술연산자로 작동함 '-'가.
}
```
```javascript
// 프로퍼티 키 동적 생성
// 문자열 또는 문자열로 평가할 수 있는 표현식을 사용.
var obj = {};
var key = 'hello';

obj[key] = 'world';
```

### 메서드
- 12장 에서 자세히...
```javascript
var circle = {
    radius: 5,
    getDiameter: function(){
        return 2*this.radius;
    }
};
console.log(circle.getDiameter()); // 10
```
### 프로퍼티 접근
- 프로퍼티에 접근하는 방법
    1. 마침표 프로퍼티 접근 연산자(.)를 사용하는 마침표 표기법(dot notation)
    2. 대괄호 프로퍼티 접근 연산자([...])를 사용하는 대괄호 표기법(bracket notaion)
```javascript
var person = {
    name:'Lee'
};
console.log(person.name); // dot notation
console.log(person['name']); // bracket notaion
// bracket notaion 사용시 대괄호 안에 무조건 따옴표로 감싸진 문자열이 있어야 함. 아니면 식별자로 해석함.(숫자인 경우 예외)
```
- 존재하지 않는 프로퍼티에 접근하면 ReferenceError 가 아닌 undefined를 반환한다.
```javascript
var person = {
    name:'Lee'
};
console.log(person.age); // undefined
```
### 프로퍼티 값 갱신
- 그냥 기존 키에 값을 할당하면 바뀜
### 프로퍼티 동적 생성
- 존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가됨.
```javascript
var person = {
    name:'Lee'
};
person.age = 20;
console.log(person); // {name:'Lee',age:20}
```
### 프로퍼티 삭제
- delete 연산자는 객체의 프로퍼티를 삭제함.
- delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 함.
- 존재하지 않는 프로퍼티 삭제시 에러 없이 무시
```javascript
var person = {
    name: 'Lee'
}
person.age = 20;
delete person.age;
delete person.address;
console.log(person) // {name:"Lee"}
```
### ES6에서 추가된 객체 리터럴의 확장 기능
- ES6에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다.(유용한가?)
- 이때 프로퍼티 키는 변수 이름으로 자동 생성된다.
```javascript
let x = 1, y = 2;
const obj = {x,y};
console.log(obj); // {x:1,y:2}
```
- 계산된 프로퍼티 이름
  - ES5에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 [] 사용하여야 함.
    ```javascript
    var prefix = 'prop';
    var i = 0;
    var obj = {};

    obj[prefix + '-' + ++i] = i;
    obj[prefix + '-' + ++i] = i;
    obj[prefix + '-' + ++i] = i;

    console.log(obj); // {prop-1:1,prop-2:2,prop-3:3}
    ```
  - ES6에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 때에는 객체 리터럴 내부에서도 가능함
    ```javascript
    const prefix = 'prop';
    let i = 0;

    const obj = {
        [`${prefix}-${++i}`]:i,
        [`${prefix}-${++i}`]:i,
        [`${prefix}-${++i}`]:i
    };
    console.log(obj); // {prop-1:1,prop-2:2,prop-3:3}
    ```
- 메서드 축약 표현
  - ES5 에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당하는 식이었는데
  - ES6 에서는 function 키워드를 생략한 축약 표현을 사용할 수 있다.(**동작 방식도 다름**)
    ```javascript
    // ES5
    var obj = {
        name:'Lee',
        sayHi: function(){
            console.log('Hi! ' + this.name);
        }
    };
    obj.sayHi(); // "Hi! Lee"

    // ES6
    const obj2 = {
        name: 'Lee',
        sayHi(){
            console.log('Hi! ' + this.name);
        }
    };
    obj.sayHi(); // "Hi! Lee"
    ```