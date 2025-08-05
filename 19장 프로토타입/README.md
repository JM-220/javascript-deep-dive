# 프로토타입
## 목차
- [프로토타입](#프로토타입)
  - [목차](#목차)
    - [객체지향 프로그래밍](#객체지향-프로그래밍)
    - [상속과 프로토타입](#상속과-프로토타입)
    - [프로토타입 객체](#프로토타입-객체)
    - [리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입](#리터럴-표기법에-의해-생성된-객체의-생성자-함수와-프로토타입)
    - [프로토타입의 생성 시점](#프로토타입의-생성-시점)
    - [객체 생성 방식과 프로토타입의 결정](#객체-생성-방식과-프로토타입의-결정)
    - [프로토타입 체인](#프로토타입-체인)
    - [오버라이딩과 프로퍼티 섀도잉](#오버라이딩과-프로퍼티-섀도잉)
    - [프로토타입의 교체](#프로토타입의-교체)
    - [instanceof 연산자](#instanceof-연산자)
    - [직접 상속](#직접-상속)

### 객체지향 프로그래밍
- <span style = "color:#ff6666">객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 여러 개의 독깁적 단위, 즉 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다</span>
- 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라 하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.
- 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조라고 할 수 있다. 이때 객체의 상태 데이터를 프로퍼티, 동작을 메서드라 부른다.
- 독립적인 부품으로 볼 수 있지만 자신의 고유한 기능을 수행하면서 다른 객체와 관계성을 가질 수 있다.
### 상속과 프로토타입
- 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.
- 상속은 코드의 재사용이란 관점에서 매우 유용하다.
```javascript
// 상속 미적용
// 생성자 함수
function Circle(radius){
    this.radius = radius;
    this.getArea = function () {
        // Math.PI는 원주율을 나타내는 상수다.
        return Math.PI * this.radius ** 2;
    };
}
// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다. getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea) // false
console.log(circle1.getArea()); // 3.14...
console.log(circle2.getArea()); // 12.5...
```
```javascript
// 상속 적용
// 생성자 함수
function Circle(radius){
    this.radius = radius;
}
// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가한다. 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function (){
    return Math.PI*this.radius**2;
};
// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다. 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다
console.log(circle1.getArea === circle2.getArea); // true
console.log(circle1.getArea()); // 3.14...
console.log(circle2.getArea()); // 12.5...
```
### <span style = "color:#ff6666">프로토타입 객체</span>
- 프로토타입 객체(또는 줄여서 프로토타입)란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용한다.
- 모든 객체(인스턴스)는 `[[Prototype]]` 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null 일 수도 있음)다.
- 내부 슬롯에는 직접 접근할 수 없지만, `__proto__ ` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 `[[prototype]]` 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있다.
- 프로토타입도 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있으며, 생성자 함수는 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있음.
<details>
<summary> __proto__ 접근자 프로퍼티</summary>

- <span style = "color:#ffff66">16장 내용이 조금 나오는데 그렇구나 하고 넘어가자</span>
- 모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.
- `__proto__`는 접근자 프로퍼티이다.
  - 자바스크립트는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않고 간접적으로 접근하도록 하는데, `__proto__` 접근자 프로퍼티를 통해 `[[prototpe]]` 내부 슬롯에도 직접 접근할 수 있음.
- `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.
  - `__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 `Object.prototype` 의 프로퍼티이다. 모든 객체는 상속을 통해 해당 접근자 프로퍼티를 사용할 수 있다.
    ```javascript
    const person = {name:'Lee'};
    // person 객체는 __proto__ 프로퍼티를 소유하지 않는다
    console.log(person.hasOwnProperty('__proto__')); // flase

    // __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype 의 접근자 프로퍼티이다.
    console.log(Object.getOwnPropertyDescriptor(Object.prototype,'__proto__'));
    // {get: f, set: f, enumerable: flase, configurable: true}

    // 모든 객체는 Object.prototype 의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
    console.log({}.__proto__ == Object.prototype); // true
    ```
- `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
    ```javascript
    const parent = {};
    const child = {};

    // child 의 프로토타입을 parent 로 설정
    child.__proto__ = parent;
    // parent 의 프로토타입을 child 로 설정
    parent.__proto__ = child; // TypeError: Cyclic __proto__ value 
    ```
    - 엔진이 프로토타입을 검색할 때 무한루프에 빠지기 때문.
    - 아무런 체크 없이 바로 접근하지 못하게 구현됨.
- `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
    ```javascript
    // 이렇게 만든 객체는 아무것도 상속받지 않은 빈 객체인데 __proto__ 도 가지고 있지 않음. 따라서 직접 사용시 undefined 발생
    const obj = Object.create(null); 
    console.log(obj.__proto__); // undefined
    console.log(Object.getPrototpyeOf(obj)); // null

    // 해결방안
    const obj = {};
    const parent = {x:1};

    Object.getPrototypeOf(obj); // obj.__proto__
    Object.setPrototypeOf(obj,parent); // obj.__proto__ = parent;
    console.log(obj.x); // 1
    ```
</details>
<details>
<summary>함수 객체의 prototpye 프로퍼티</summary>

- 함수 객체만이 소유하는 `prototpye` 프로퍼티
  - 함수 객체만이 소유하는 `prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
    ```javascript
    // 함수 객체는 prototype 프로퍼티를 소유한다
    (function(){}).hasOwnProperty('prototype'); // true
    // 일반 객체는 prototype 프로퍼티를 소유하지 않는다
    ({}).hasOwnProperty('prototype'); // false
    ```
  - `prototype` 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리키는데 `non-constructor` 함수는 `prototpye` 프로퍼티를 소유하지 않는다(화살표 함수, ES6 메서드 축약 표현으로 정의한 메서드)
  - 생성자 함수로 만들 목적이 아니었던 일반함수도 `prototype` 프로퍼티를 소유하기는 하나 의미가 없다.
  - 함수도 객체기 때문에 `__proto__`를 가지고 있는데 `prototype`을 추가로 가지는 거임.
    
| 구분 | 소유 | 값 | 사용 주체 | 사용 목적 |
|-|-|-|-|--------------------|
| `__proto__` 접근자 프로퍼티 | 모든 객체 | 프로토타입의 참조 | 모든 객체 | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용 |
| `prototype` 프로퍼티 | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

```javascript
const Person = name => {
    this.name = name;
};
console.log(Person.hasOwnProperty('prototype')); // false
console.log(Person.prototype); // undefined
const obj = {
    foo(){}
};
console.log(obj.foo.hasOwnProperty('prototype')); // false
console.log(obj.foo.prototype); // undefined
```
- 271p 이미지 참고
```javascript
function Person(name){
    this.name = name;
}
const me = new Person('Lee');
console.log(Person.prototype === me.__proto__); // true
```
</details>
<details>
<summary>프로토타입의 constructor 프로퍼티와 생성자 함수</summary>

- 모든 프로토타입은 `constructor` 프로퍼티를 갖는다.
- 이 프로퍼티는 `prototype` 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. -> 내부 메서드를 말하는게 아님.
    ```javascript
    function Person(name){
        this.name = name;
    }
    const me = new Person('Lee');
    console.log(me.constructor === Person); // true
    ```

</details>

### 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
- 위에서 봤듯이 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 `constructor` 프로퍼티에 의해 생성자 함수와 연결된다. (272 image 참고)
```javascript
// obj 객체를 생성한 생성자 함수는 Object 다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function('a','b','return a + b');
console.log(add.constructor === Function) // true

// 생성자 함수
function Person(name){
    this.name = name;
}
// me 객체를 생성한 생성자 함수는 Person 이다.
const me = new Person('Lee');
console.log(me.constructor === Person); // trueㅁ
```
- `new` 와 생성자 함수를 사용하지 않는 리터럴 표기법에 의해 생성된 객체도 당연히 프로토타입이 존재한다.
- 생성자 함수를 사용하지 않는 리터럴 표기법에 의해 생성된 객체의 프로토타입에 있는 `constuctor` 프로퍼티는 생성자 함수를 가리킬 수도, 아닐 수도 있음.
- `Object()` 생성자 함수에 인수를 전달하지 않거나, undefined 또는 null을 인수로 전달하면서 호출하면 내부적으로는 추상연산 `OrdinaryObjectCreate`를 호출하여 `Object.prototype`을 프로토타입으로 갖는 빈 객체를 생성한다.
```javascript
// 2. Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 1. new.target 이 undefined나 Object 가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String 객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}
```
- 객체 리터럴이 평가될 때는 추상연산 `OrdinaryObjectCreate`를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다.
- 생성하는 것에서는 동일하나 `new.target`의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다르다. 따라서 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.
- 생성자 함수의 경우 `new Function()` 으로 생성한 함수객체는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않는다.
- 생성자 함수로 만든 함수 객체의 경우 프로토타입의 `constructor` 가 생성자 함수를 가리킬 것으로 예상할 수 있지만 일반 함수의 경우 constructor 가 뭘 가리킬지가 애매하다.
- 즉, 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다.
- 다시 말해, 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.
- 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입은 다음과 같다.

    | 리터럴 표기법 | 생성자 함수 | 프로토타입 |
    |------|------|----------|
    | 객체 리터럴 | Object | Object.prototype |
    | 함수 리터럴 | Function | Function.prototype |
    | 배열 리터럴 | Array | Array.prototype |
    | 정규 표현식 리터럴 | RegExp | RegExp.prototype |

### 프로토타입의 생성 시점
- 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.
- 생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본 제공하는 빌트인 생성자 함수로 구분할 수 있다.
<details>
<summary>사용자 정의 생성자 함수와 프로토타입 생성 시점</summary>

- 생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
```javascript
console.log(Person.prototype); // {constructor : f}

// 생성자 함수. 참고로 함수 호이스팅은 할당까지 끝남.
function Person(name) {
    this.name = name;
}
```
```javascript
// 화살표 함수는 non-constructor 다.
const Person = name => {
    this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```
- 생성된 프로토타입은 Person 생성자 함수의 `prototype` 프로퍼티에 바인딩된다.
- 프로토타입도 객체이다. 프로토타입도 프로토타입을 가진다. 프로토타입의 프로토타입은 `Object.prototype`이다.
</details>
<details>
<summary>빌트인 생성자 함수와 프로토타입 생성 시점</summary>

- 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.
- 생성된 프로토타입은 빌트인 생성자 함수의 `prototype` 프로퍼티에 바인딩된다.
</details>

### 객체 생성 방식과 프로토타입의 결정
- 객체 생성 방식
  1. 객체 리터럴
  2. `Object` 생성자 함수
  3. 생성자 함수
  4. `Object.create`메서드
  5. 클래스(ES6)
1. 객체 리터럴에 의해 생성된 객체의 프로토타입
   -  객체 리터럴을 평가하여 객체를 생성할 때 추상연산 `OrdinaryObjectCreate` 호출한다고 하였다. 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이다.
   -  Object 생성자 함수의 프로토타입은 책(281p)에 자세히 그림으로 나와있다.
   -  만들어진 객체에서 여러 메서드를 사용할 수 있는 것은 프로토타입을 통해 상속받았기 때문.
2. Object 생성자 함수에 의해 생성된 객체의 프로토타입
   - Object 생성자를 인수 없이 호출하면 빈 객체가 생성된다. 이 때도 추상연산 `OrdinaryObjectCreate`를 호출한다고 하였다. 즉, `Object.prototype`을 프로토타입으로 가진다.
3. 생성자 함수에 의해 생성된 객체의 프로토타입
   - 표준 빌트인 객체인 `Object()` 생성자 함수와 함께 생성되는 `Object.prototype`은 다양한 빌트인 메서드를 갖고 있다.
   - 하지만 사용자 정의 생성자 함수 Person과 더불어 생성된 `Person.prototype`의 프로퍼티는 constructor 뿐이다.(하지만 Object.prototype이 Person.prototype 상위 체인에 있기 때문에 상속받아 사용은 가능함)
   - 명시적으로 추가/삭제 할 수도 있음. (Person.prototype.sayHello  = function...)

### 프로토타입 체인
- 사용자 지정 생성자 함수에 의해 생성된 객체는 `userFunc.prototype` 뿐만이 아니라 `Object.prototype` 의 `hasOwnProperty` 도 사용 가능하다. 이는 `Object.prototype`을 상속받았음을 의미한다.
    ```javascript
    Object.getPrototypeOf(Person.prototype) === Object.prototype; // true
    ```
- <span style = "color:#ff6666">자바스크립트 객체의 프로퍼티에 접근하려 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라고 한다.</span>
- 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.
- 프로토타입 체인의 최상위에 위치하는 객체는 언제나 `Object.prototype`이다. `Object.prototype` 의 프로토타입은 `null` 이다
- 스코프 체인과 프로토타입 체인이 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용된다.

### 오버라이딩과 프로퍼티 섀도잉
- 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다. 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉이라 한다.
- 프로퍼티를 삭제, 추가, 변경하는 경우 마찬가지로 상위 프로토타입 체인의 프로퍼티를 삭제, 추가, 변경하는 경우 하위 체인의 객체에서 하면 안되고 상위에서 직접 시도하여야 한다.

### 프로토타입의 교체
- 프로토타입은 임의의 다른 객체로 변경할 수 있다. 생성자 함수 or 인스턴스에서 교체 가능
<details>
<summary>생성자 함수에 의한 프로토타입 교체</summary>

```javascript
const Person = (function(){
    function Person(name){
        this.name = name;
    }
    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {
        sayHello(){
            console.log(`hi my name is ${this.name}`);
        }
    };
    return Person;
}());

const me = new Person('Lee');
```
- 프로토타입으로 교체한 객체 리터럴에는 `constructor` 프로퍼티가 없다. `constructor`프로퍼티는 자바스크립트 엔진이 암묵적으로 추가한 프로퍼티이다.
- 근데 이제 `constructor`는 생성자 함수를 가리켜서 생성자 함수, 인스턴스, 프로토타입 세가지가 서로 가리키는 형태였는데 이러면 `constructor` 프로퍼티가 `Object.prototype` 에 있는 `constructor` 가 참조되어 `Object`를 가리킨다.
- 다 설명해놓고 프로토타입을 직접 교체하지 않는 것이 좋다고 함.
```javascript
// 복구치는 법
const Person = (function(){
    function Person(name){
        this.name = name;
    }

    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {
        // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
        constructor: Person,
        sayHello(){
            console.log(`hi my name is ${this.name}`);
        }
    };
    return Person
}());
const me = new Person('lee');
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```
</details>

<details>
<summary>인스턴스에 의한 프로토타입의 교체</summary>

- 프로토타입은 생성자 함수의 `.prototype` 과 인스턴스의 `__proto__` 접근자 프로퍼티를 통해 접근할 수 있다.
- 따라서 인스턴스에서도 프로토타입을 `__proto__`로 변경, 수정, 삭제 가능.
- 생성자 함수에 의한 프로토타입 교체와 마찬가지로 세 요소간 연결이 끊길 수 있다.
- 방식은 약간 다른데 생성자 함수에 의한 프로토타입 교체는 `생성자함수.prototype` 이 교체된 프로토타입을 가리키지만 인스턴스에 의한 교체는 `생성자함수.prototype`이 교체된 프로토타입을 가리키지 않는다. 다시 연결하려면 `생성자함수.prototype = 인스턴스.__proto__` 이렇게 해야 할 듯 하다.
</details>

### instanceof 연산자
- 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 평가되고 아닌경우 false로 평가됨. (그러면 프로토타입 교체하면 false로 평가될 지도..?)
- `객체 instanceof 생성자 함수` 우변의 피연산자가 함수가 아닌 경우 TypeError 발생.
```javascript
// 생성자 함수
function Person(name){
    this.name = name;
}
const me = new Person('lee');
// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가됨.
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가됨.
console.log(me instanceof Object); // true
```
- 프로토타입 교체
```javascript
function Person(name){
    this.name = name;
}
const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {};
// 교체
Object.setPrototype(me,parent);

console.log(Person.prototype === parent); // false
console.log(Person.constructor === parent); // false

console.log(me instanceof Person); // false
console.log(me instanceof Object); // true
```
- `me` 는 `Person` 생성자 함수에 의해 만들어진 인스턴스임에 틀림없지만 `instanceof` 연산을 하면 false 로 평가됨.
- 이처럼 `instanceof` 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.
- 298p 이미지 확인
```javascript
// instanceof 연산자 함수로 구현-> 대략
function isInstanceof(instance,constructor){
    // 인스턴스 프로토타입 취득
    const prototype = Object.getPrototypeOf(instance);

    // 재귀 탈출 조건
    // prototype 이 null 이면 프로토타입 체인의 좀점에 다다른 것.
    if (prototype === null) return false;

    // 프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true를 반환한다. (단축평가)
    return prototype === constructor.prototype || isInstanceof(prototype, constructor);
}
console.log(isInstanceof(me,Person)); // true
console.log(isInstanceof(me,Object)); // true
console.log(isInstanceof(me,Array)); // false
```
```javascript
const Person = (function(){
    function Person(name){
        this.name = name;
    }

    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {
        sayHello(){
            console.log(`Hi my name is ${this.name}`);
        }
    };

    return Person;
}());
const me = new Person('Lee');

// constructor 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 instanceof는 아무런 영향을 받지 않는다
console.log(me.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

### 직접 상속
<details>
<summary>Object.create에 의한 직접 상속</summary>

- `object.create` 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다. Object.create 메서드도 다른 객체 생성 방식과 마찬가지로 추상 연산을 호출함
- 첫 번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를 전달. 두번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체를 전달.
</details>

- 프로토타입 어려워서 일단 여기서 마무리 하고 뒤에 더 보고 실습좀 하고 다시 16장부터 복습하기로...
