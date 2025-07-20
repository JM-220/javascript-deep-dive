# let, const 키워드와 블록 레벨 스코프
## 목차
- [](#)

### var 키워드로 선언한 변수의 문제점
1. 변수의 중복 선언 허용 
   - 의도치 않은 값의 변경 발생 가능
2. 함수 레벨 스코프 
   - 함수 외부에서, 코드 블록에서 선언한 변수가 모두 전역 변수가 됨.
    ```javascript
    var x = 1;
    if (true){
        var x = 10;
    }
    console.log(x); // 10
    ```
3. 변수 호이스팅
    - var 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어올려진 것처럼 동작하는데, 선언문 이전에 변수 참조가 가능하므로(undefined) 오류 발생 여지를 남긴다. (let, const 는 다른가 봄.)
### let 키워드
1. 변수 중복 선언 금지
    - let 키워드로 이름이 같은 변수를 중복 선언하면 문법 에러가 발생.
2. 블록 레벨 스코프
    - var는 오로지 함수의 코드 블록만을 지역 스코프로 인정함.
    - let은 모든 코드 블록(함수, if문, for문, while문, try/catch 등)을 지역 스코프로 인정하는 블록 레벨 스코프를 따름.
3. 변수 호이스팅
    - var 키워드와 달리 let 키워드로 선언한 변수는 호이스팅이 발생하지 않는 **것처럼** 동작함.
    - var 키워드로 선언한 변수는 선언과 초기화가 동시에 이루어짐.
    - let 키워드로 선언한 변수는 `선언 단계`와 `초기화 단계`가 분리되어 진행됨. 선언은 런타임 이전에 엔진에 의해 암묵적으로 실행되지만 할당은 선언문에 도달했을 때 실행됨(undefined 할당도 동일함).
    - 스코프의 시작 지점부터 초기화 지점까지 변수를 참조할 수 없는 구간을 `일시적 사각지대`라고 함.
    ```javascript
    console.log(foo); // ReferenceError

    let foo;
    console.log(foo); // undefined

    foo = 1;
    console.log(foo); // 1
    ```
    - let 키워드로 선언한 변수는 여전히 호이스팅이 발생한다
    ```javascript
    // 해당 코드의 요지는 블록 내의 console.log(foo)는 호이스팅이 발생하지 않는 경우, 전역 foo를 참조해야 하는데 ReferenceError 가 발생한다는 것.
    let foo = 1; // 전역
    {
        console.log(foo); // ReferenceError: ...
        let foo = 2; // 지역 변수
    }
    ```
    - 이처럼 ES6에서는 모든 선언을 호이스팅하지만, let, const, class를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작함.
4. 전역 객체와 let
    - var 키워드로 선언한 전역 변수, 전역 함수 그리고 암묵적 전역은 전역객체 window의 프로퍼티가 됨.
    - let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아님. window.foo 와 같이 접근 불가능. let 으로 선언한 전역 변수는 보이지 않는 개념인 블록(전역 렉시컬 환경의 선언적 환경 레코드. 23장에서 자세히...) 내에 존재하게 됨.
        ```javascript
        // 브라우저에서만 실행
        // 전역
        var x = 1;
        // 암묵적 전역
        y = 2;
        // 전역 함수
        function foo(){}

        // var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티임
        console.log(window.x); // 1
        // 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
        console.log(x); // 1

        // 암묵적 전역은 전역 객체 window의 프로퍼티임
        console.log(window.y); // 2
        console.log(y); // 2

        // 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티임.
        console.log(window.foo); // f foo(){}
        console.log(foo); // f foo(){}
        ```
        ```javascript
        let x = 1;
        console.log(window.x); // undefined
        console.log(x); // 1
        ```
### const 키워드
- const 키워드의 특징은 let 키워드와 비슷함.
1. 선언과 초기화
    - const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 함. 그렇지 않으면 문법에러가 발생 (SyntaxError: Missing initializer in const declaration)
    - let 과 마찬가지로 블록 레벨 스코프를 가지고, 호이스팅이 발생하지 않는 것처럼 동작.
2. 재할당 금지
    - var, let은 재할당이 자유로우나 const는 재할당이 금지됨.
3. 상수
    - 상수는 재할당이 금지된 변수를 말함. 상수는 상태 유지와 가독성, 유지보수의 편의를 위해 적극적으로 사용해야 함.
    - 상수는 언더스코어를 포함한 스네이크 케이스로 표현하는 것이 일반적 ex) `TAX_RATE`
4. const 키워드와 객체
    - const 키워드에 원시 값을 할당하면 변경 불가능 하지만 객체 값의 경우 값을 수정할 수 있다.(재할당이 없어도 되기 때문).
### `var` vs `let` vs `const`
- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 스코프는 최대한 좁게 만든다
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 const 키워드를 사용한다. (많이 사용하고 변경이 필요하면 let으로 바꾸면 댐)