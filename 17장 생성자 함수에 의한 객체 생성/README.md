# 생성자 함수에 의한 객체 생성
## 목차
- [생성자 함수에 의한 객체 생성](#생성자-함수에-의한-객체-생성)
  - [목차](#목차)
    - [Object 생성자 함수](#object-생성자-함수)
    - [생성자 함수](#생성자-함수)

### Object 생성자 함수
- 객체 생성에는 다양한 방식이 있다. 객체 리터럴 `{}` 에 의한 방식, 생성자 함수를 사용하여 생성하는 방식.
- `new`연산자와 함께 `Object`생성자 함수를 호출하면 빈 객체를 생성하여 반환한다.
```javascript
const person = new Object();
```
- 생성자 함수란 `new` 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말함.
- Object 생성자 함수 이외에도 다양한 빌트인 생성자 함수가 있음
- **근데 그다지 유용하지 않다고 함.**
```javascript
const strObj = new String('Lee');
const numObj = new Number(123);
const BoolObj = new Boolean(true);
// 얘는 typeof func 하면 function 으로 보임 나머지는 object 로 보임
const func = new Function('x','return x * x'); 
const arr = new Array(1,2,3);
const regExp = new RegExp(/ab+c/i);
const date = new Date();
```
### 생성자 함수
1. 객체 리터럴에 의한 객체 생성 방식의 문제점
    - 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 함.
    ```javascript
    const circle1 = {
        radius:5,
        getDiameter(){
            return 2* this.radius;
        }
    };
    console.log(circle1.getDiameter()); // 10
    const circle2 = {
        radius:10,
        getDiameter(){
            return 2* this.radius;
        }
    };
    console.log(circle2.getDiameter()); // 20
        ```
2. 생성자 함수에 의한 객체 생성 방식의 장점
    - 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러개를 간편하게 생성할 수 있음
    - new 연산자와 함께 사용하지 않으면 일반 함수처럼 동작.
    ```javascript
    // 생성자 함수
    function Circle(radius){
        // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다. 22장에서 자세히...
        this.radius = radius;
        this.getDiameter = function(){
            return 2*this.radius;
        }
    }
    const circle1 = new Circle(5);
    const circle2 = new Circle(10);
    console.log(circle1.getDiameter()); // 10
    console.log(circle2.getDiameter()); // 20
    ```
3. 생성자 함수의 인스턴스 생성 과정
    - 생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿으로 동작하는 것.
    - 생성자 함수가 인스턴스를 생성하는 것은 필수이고, 생성된 인스턴스를 초기화하는 것은 옵션이다.
    - 생성자 함수 내부에서 `this` 를 사용하면 초기화가 가능하지만, 인스턴스를 반환하는 명시적인 내용은 없고 암묵적으로 반환함.
    1. 인스턴스 생성과 this 바인딩
        - 암묵적으로 빈 객체가 생성된다.
        - 생성된 빈 객체(인스턴스)는 this에 바인딩된다.
        - 이 과정은 런타임 이전에 실행된다(함수 코드 블록을 읽지 않은 상태).
    2. 인스턴스 초기화
        - 생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
        - 이 과정은 개발자가 기술한다(함수 코드 블록의 내용)
    3. 인스턴스 반환
        - 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
        - 만약 생성자 함수 내부에 `return` 문으로 다른 객체를 반환하면 그 객체가 반환됨.
        - 원시 값을 리턴하는 경우 무시됨.
        - **return 문은 반드시 생략할 것.**
4. 내부 메서드 `[[Call]]` 과 `[[Construct]]`
    - 함수는 객체의 기능을 할 수 있다. 내부 슬롯과 내부 메서드를 다 가지고 있기 때문에...
    - 근데 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다.
    - 따라서 함수는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론 함수로서 동작하기 위해 함수 객체만을 위한 `[[Environment]]`, `[[FormalParameters]]` 등의 내부 슬롯과, `[[Call]]`, `[[Construct]]` 같은 내부 메서드를 추가로 가지고 있다.
    - 함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 `[[Call]]`이 호출되고 `new` 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[Construct]`가 호출된다.
    - 내부 메서드 `[[Call]]`을 갖는 함수 객체를 callable 이라 하며 내부 메서드 `[[Construct]]`를 갖는 함수 객체를 constructor, 가지고 있지 않으면 non-constructor 라고 부른다
    - 모든 함수 객체는 callable 이고 constructor 이거나 non-constructor 이다. 즉, 모든 함수는 호출할 수 있지만 생성자 함수로서 호출할 수 있는지의 여부는 다르다.
5. constructor와 non-constructor의 구분
    - 자바스크립트 엔진은 `constructor`와 `non-constructor`를 구분할 때, 함수 정의 방식에 따라 구분한다.
      - constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
      - non-constructor : 메서드(ES6 메서드 축약표현), 화살표 함수
    - 주의할 점은 ECMAScript 사양에서 메서드로 인정하는 범위가 일반적인 메서드보다 좁다는 것.
    - 즉 대부분의 함수는 constructor 이기 때문에 new를 붙이면 생성자 함수처럼 동작함. 메서드 제외.
        ```javascript
        // 일반 함수 선언문 - constructor
        // 함수 표현식
        function foo(){}
        const bar = function(){};

        // 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
        const baz = {
            x: function(){}
        }

        new foo();
        new bar();
        new baz.x();

        const arrow = () => {};
        new arrow(); // TypeError: arrow is not a constructor

        // 메서드 정의: ES6의 메서드 축약 표현만 메서드로 인정한다
        const obj = {
            x(){} // 이렇게 표기해야 메서드
        };
        new obj.x(); // TypeError: obj is not a constructor
        ```
6. `new` 연산자
    - 일반 함수와 생성자 함수에 특별한 형식적 차이는 없다.
    - 즉 new를 붇이고 안붙이고에 따라 constructor 가 인스턴스를 반환하는 것.
    ```javascript
    // 생성자 함수로서 정의하지 않은 일반 함수 -> this바인딩이 없음.
    function add(x,y){
        return x+y;
    }
    
    // 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
    let inst = new add();

    // 함수가 객체를 반환하지 않았으므로 반환문이 무시된다. 따라서 빈 객체가 생성되어 반환된다.
    console.log(inst); // {}

    // 객체를 반환하는 일반 함수
    function createUser(name,role){
        return {name,role};
    }

    // 일반 함수를 new 연산자와 함께 호출
    inst = new createUser('lee','admin');
    // 함수가 생성한 객체를 반환한다
    console.log(inst) // {name:"lee",role:"admin"}
    ```
    - 반대로 new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출된다. 다시말해, `[[construct]]` 가 호출되는 것이 아니라 `[[Call]]` 가 호출된다.
    ```javascript
    function Circle(radius){
        this.radius = radius;
        this.getDiameter = function(){
            return 2*this.radius;
        };
    }

    // new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
    const circle = Circle(5);
    console.log(circle); // undefined

    // 일반 함수의 내부 this는 전역 객체 window를 가리킨다.
    console.log(radius); // 5
    console.log(getDiameter()); // 10

    circle.getDiameter();
    // TypeError: Cannot read property 'getDiameter' of undefined
    ```
    - 생성자 함수는 일반적으로 첫 문자를 대분자로 기술하는 파스칼 케이스로 명명하여 일반 함수와 구별할 수 있도록 노력한다.
7. new.target
    - 생성자 함수가 new 없이 호출되는 것을 방지하기 위해, ES6에서는 new.target을 제공한다.
    - new.target은 this와 유사하게 constructor인 모든 함수 내에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티 라고 부른다. IE는 지원하지 않는다
    - **new 연산자와 함께 생성자 함수로서 호출되면 new.target은 함수 자신을 가리킨다. new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined이다.**
    ```javascript
    // 생성자 함수
    function Circle(radius){
        // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined이다.
        if (!new.target){
            // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다
            return new Circle(radius);
        }
        this.radius = radius;
        this.getDiameter = function(){
            return 2 * this.radius;
        };
    }

    // new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
    const circle = Circle(5);
    console.log(circle.getDiameter());
    ```
    - 스코프 세이브 생성자 패턴은 시간나면 참고하자
    - 참고로 대부분의 빌트인 생성자 함수는 new 연산자와 함께 호출되었는지 확인한 후 적절한 값을 반환한다.
    - String, Number, Boolean 생성자 함수는 new 없이 호출하면 객체 값이 아닌 각각의 데이터에 맞는 원시 값을 리턴한다.