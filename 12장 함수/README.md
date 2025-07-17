# 함수
## 목차
- [함수](#함수)
  - [목차](#목차)
    - [함수란?](#함수란)
    - [함수를 사용하는 이유](#함수를-사용하는-이유)
    - [함수 리터럴](#함수-리터럴)
    - [함수 정의](#함수-정의)
    - [함수 호출](#함수-호출)
    - [참조에 의한 전달과 외부 상태의 변경](#참조에-의한-전달과-외부-상태의-변경)
    - [다양한 함수의 형태](#다양한-함수의-형태)

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

### 함수 호출
<details>
<summary>매개변수와 인수</summary>

- 함수를 실행하기 위해 필요한 값을 함수 외부에서 내부로 전달할 때, 매개변수(parameter)를 통해 인수를 전달한다.
- 인수는 값으로 평가될 수 있는 표현식이어야 한다.
- 개수와 타입에 제한이 없다.
- 함수는 매개변수의 개수와 인수의 개수의 일치여부를 체크하지 않는다.
- 인수가 부족해서 인수가 할당되지 않은 매개변수의 값은 undefined 이다. 초과된 인수는 무시된다(arguments 객체의 프로퍼티로 보관. 18장에서 자세히...).

</details>
<details>
<summary>인수 확인</summary>

- <span style = "color:#ff3333">자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다</span>
- <span style = "color:#ff3333">자바스크립트는 동적 타입 언어다. 따라서 자바스크립트 함수는 매개변수의 타입을 사전에 지정할 수 없다.</span>
  - 따라서 함수 정의 시 적절한 인수가 전달되었는지 확인할 필요가 있다.
```javascript
function add(x,y){
    if (typeof x != 'number' || typeof y !== 'number'){
    // 매개변수를 통해 전달된 인수의 타입이 부적절한 경우 에러를 발생시킨다
    throw new TypeError('인수는 모두 숫자 값이어야 합니다')
    }

    return x+y;
}
console.log(add(2)); // TypeError : 인수는 모두 숫자 값이어야 합니다.
console.log(add('a','b')) // TypeError : 인수는 모두 숫자 값이어야 합니다.
```
- argument 객체를 통해 인수의 개수를 확인할 수도 있고
- 인수가 전달되지 않은 경우 단축평가를 사용해 매개변수에 기본값을 할당하는 방법도 있다.
```javascript
function add(a,b,c){
    a = a || 0;
    b = b || 0;
    c = c || 0;
    return a + b + c;
}
console.log(add(1,2,3)); // 6
console.log(add(1,2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0
```
- ES6에서 도입된 방법을 사용하면 기본값 할당을 할 수 있는데, 인수를 전달하지 않았거나, undefined를 전달한 경우에만 유효하다.
```javascript
function add(a = 0,b = 0,c = 0){
    return a + b + c;
}
console.log(add(1,2,3)); // 6
console.log(add(1,2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0
```
</details>
<details>
<summary>매개변수의 최대 개수</summary>

- 매개변수는 순서에 의미가 있다. 따라서 매개변수가 많아지면 순서를 고려해야 하므로 이해하기 어렵게 작성되거나 실수를 발생시킬 가능성을 높인다. 유지보수성도 나빠진다
- 이상적인 매개변수의 개수는 0개이며 적을수록 좋다.
- 3개를 넘지 않는 것을 권장하고 넘는다면 객체를 전달하는 것이 좋다.
- <span style = "color:#ff3333">주의해야 할 점은 인수로 넘긴 객체가 함수 내부에서 변경될 수 있는 부수효과가 발생한다는 것.</span>
```javascript
// 프로퍼티 키만 정확히 지정하면 매개변수의 순서를 신경쓰지 않아도 된다. 또한 명시적으로 인수의 의미를 설명하는 프로퍼티 키를 쓰게 되므로 가독성 향상과 실수도 줄어든다.
$.ajax({
    method:'Post',
    url:'/user',
    data:{id:1,name:'Lee'},
    cache:false
})
```

</details>

<details>
<summary>반환문</summary>

- 함수는 `return` 키워드와 표현식으로 이뤄진 반환문을 사용해 실행 결과를 함수 외부로 반환할 수 있다.
- 함수 호출은 표현식이다. 함수 호출 표현식은 return 키워드가 반환한 표현식의 평가 결과, 즉 반환값으로 평가된다.
- 전역에서 반환문을 사용하면 문법에러가 발생한다(Node.js는 모듈 시스템에 의해 파일별로 독립적 스코프를 가지므로 에러가 발생하지 않는다).
```html
<!DOCTYPE html>
<html>
<body>
    <script>
        return // SyntaxError: Illegal return statement
    </script>
</body>
</html>
```
- 반환문의 역할
    1. 반환문은 함수의 실행을 중단하고 함수 몸체를 빠져나간다.
    2. 반환문은 `return` 키워드 뒤에 오는 표현식을 평가해 반환한다. 표현식 지정이 없다면 `undefined`가 반환된다.

</details>

### 참조에 의한 전달과 외부 상태의 변경
- 11장에서 살펴본 것처럼, 원시값은 값에 의한 전달, 객체는 참조에 의한 전달 방식으로 동작함.
- 매개변수도 함수 몸체 내부에서는 변수와 동일한 취급이므로 매개변수 역시 11장의 방식을 따른다.
- <span style = "color:#ff3333">이런 방식은 원치않는 오류를 발생시킬 수 있는데, 해결 밥법 중 하나는 객체를 불변객체로 만들어 사용하는 것이다.</span>
- 외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는 함수를 순수 함수라 한다.
```javascript
function changeVal(primitive, obj){
    primitive += 100;
    obj.name = 'Kim';
}
// 외부 상태
var num = 100;
var person = {name:'lee'};

console.log(num); // 100 
console.log(person); // {name : "lee"}

changeVal(num,person);
console.log(num); // 100
console.log(person); // {name : "Kim"}

```
### 다양한 함수의 형태
<details>
<summary>즉시 실행 함수</summary>

- 함수 정의와 동시에 즉시 호출되는 함수
- 단 한번만 호출되며 다시 호출할 수 없다.
- 그룹 연산자로 함수를 묶은 이유는 먼저 함수 리터럴을 평가해서 함수 객체를 생성하기 위함임.
- 즉시 실행 함수에 코드를 모아두면 혹시모를 변수나 함수의 이름 충돌을 방지할 수 있음.
```javascript
// 보통 익명 함수를 사용하는 것이 일반적. 기명함수를 사용해도 재호출 불가.
// 함수 리터럴이라 함수 객체가 즉시 ()에 의해 실행되어 리턴값으로 전체는 리턴값으로 평가됨.
(function (){
    var a = 3;
    var b = 5;
    return a*b;
}());

(function foo(){
    var a = 3;
    var b = 5;
    return a*b;
}());
foo(); // ReferenceError: foo is not defined
```
```javascript
// 안되는 예시
// 할당문이 없고, 그룹연산자도 없어서 이 function 은 선언문으로 작동하는데 선언문에서는 함수 이름이 꼭 있어야 한다. 없어서 에러
function (){ // SyntaxError: Function statements require a function name
    var a = 3;
    var b = 5;
    return a*b;
}();

// 안되는 예시2
// } 로 끝나는 시점에서 함수의 선언이 완료되어 ()가 함수 호출 연산자가 아니라 그룹연산자로 해석됨.
// 근데 () 안에 피연산자가 없어서 에러가 나는 것.
function foo(){ // SyntaxError: Unexpected token ')'
    var a = 3;
    var b = 5;
    return a*b;
}();
```
</details>
<details>
<summary>재귀 함수</summary>

- 함수가 자기 자신을 호출하는 것.
- 다른 언어에서의 재귀와 방식은 동일함.
```javascript
// 함수 표현식
var factorial = function foo(n){
    // 탈출조건 : n이 1 이하일 때 재귀 호출을 멈춤
    if (n <= 1) return 1;
    // 함수를 가리키는 식별자로 자기 자신을 재귀 호출
    return n * factorial(n-1);

    // 이것도 가능 다만 함수 외부에서 호출할 때에는 foo로 하면 안됨. 함수명은 함수 몸체 내부에서만 유효하기 때문.
    // console.log(factorial == foo); // true
    // return n * foo(n-1);
}
```
</details>

<details>
<summary>중첩 함수</summary>

- 함수 내부에 정의된 함수를 중첩 함수 또는 내부 함수라고 한다. 또한 중첩 함수를 포함하는 함수는 외부 함수라고 부른다.
- 중첩 함수는 자신을 포함하는 외부 함수를 돕는 헬퍼 함수의 역할을 한다
- ES6 부터는 외부가 꼭 함수가 아니더라도 문이 위치할 수 있는 문맥이라면 어디든지 가능하다. if, for 등. 근데 이제 바람직 하지 않음(함수 호이스팅 혼란).
- 중첩함수는 스코프와 클로저에 깊은 관련이 있음
```javascript
function outer(){
    var x = 1;

    //중첩함수
    function inner(){
        var y = 2;
        // 외부 함수의 변수를 참조할 수 있다.
        console.log(x+y); // 3
    }

    inner();
}
outer();
```
</details>

<details>
<summary>콜백 함수</summary>

- 하는 일이 유사한 함수를 여러개 만들 때, 매번 새로운 함수를 만들어야 하는 단점을 보완함.
- 공통 로직은 미리 정의해 두고, 경우에 따라 변경되는 로직은 추상화 해서 함수 외부에서 함수 내부로 전달하는 것.
- 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수라고 하며, 전달받은 함수를 고차함수라고 한다.
- js의 경우 함수는 일급 객체이기 때문에 매개변수를 통해 함수를 전달할 수 있다.
- 고차함수는 원하는 시점에 콜백함수를 호출할 수 있으며, 필요에 따라 인수 전달도 가능하다.
- 콜백함수가 다른 곳에서도 호출할 필요가 있거나, 콜백 함수를 전달받는 함수가 자주 호출된다면 외부에서 정의하고 아닌 경우 고차함수 내부에 익명 함수 리터럴로 전달하는 것이 일반적이다(이 경우 콜백 실행시 마다 다시 정의됨).
- 비동기 처리에 활용됨.
```javascript
// 외부에서 전달받은 f를 n만큼 반복 호출한다
function repeat(n,f){
    for(var i = 0;i<n;i++>){
        f(i);
    }
}
var logAll = function (i){
    console.log(i);
};

repeat(5,logAll); // 0 1 2 3 4

var logOdds = function (i){
    if(i % 2)console.log(i);
};

repeat(5,logOdds); // 1 3
```
</details>
<details>
<summary>순수 함수와 비순수 함수</summary>

- 순수 함수 : 동일한 인수가 전달되면 언제나 동일한 값을 반환하는 함수. 외부상태에 의존하지 않음 
    ``` javascript
    function increase(n){
        return ++n;
    }
    ```
- 비순수 함수 : 함수의 외부상태에 따라 반환값이 달라지는 함수. 외부상태에 의존함
    ```javascript
    var count = 0;
    function increase(){
        return ++count; // 외부 상태에 의존하여 외부상태를 변경
    }
    ```
- 외부 상태에는 전역 변수, 서버 데이터, 파일, Console, DOM 등이 있다. 
- 외부 상태에 의존하지 않는다고 해도 내부 상태가 호출될 때마다 변화하는 값(ex : 현재 시간)이라면 순수 함수가 아님
- <span style = "color:#ff3333">함수형 프로그래밍 : 순수 함수와 보조 함수의 조합을 통해 외부 상태를 변경하는 부수효과를 최소화해서 불변성을 지향하는 프로그래밍 패러다임.</span>
</details>