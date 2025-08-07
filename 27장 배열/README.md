# 배열
## 목차
- [](#)

### 배열이란?
- 여러 개의 값을 순차적으로 나열한 자료구조
- 배열이 가지고 있는 값을 `element` 라고 부르며, js 의 모든 값은 배열의 요소가 될 수 있다.
- 타 언어들과 마찬가지로 0부터 시작하는 인덱스를 갖는다.
- 요소에 접근할 때는 대괄호 표기법을 사용한다.
- `length` 프로퍼티를 갖는다
- 자바스크립트에 배열이라는 타입은 존재하지 않는다. 배열은 객체 타입이다.
- 배열 생성법
    1. 배열 리터럴
    2. Array 생성자 함수
    3. Array.of 메서드
    4. Array.from 메서드
- 배열의 프로토타입 객체는 `Array.prototype`이다. 배열을 위한 빌트인 메서드를 제공한다.
    ```javascript
    const arr = [1,2,3];
    arr.constructor === Array // true
    Object.getPrototypeOf(arr) === Array.prototype // true
    ```
- 일반 객체와 구별되는 특징
    | 구분 | 객체 | 배열 |
    |-----|--------|-----|
    |구조|프로퍼티 키와 프로퍼티 값|인덱스와 요소|
    |값의 참조|프로퍼티 키|인덱스|
    |값의 순서|X|O|
    |length 프로퍼티|X|O|
### 자바스크립트 배열은 배열이 아니다
- 자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다. (= <span style = "color:#ff6666">밀집배열</span>)
- 자바스크립트의 배열은 일반적인 의미의 배열과 다르다. 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다. 이런 배열을 <span style = "color:#ff6666">희소배열</span> 이라고 한다
- 따라서 엄밀히 말하면 js의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체다.
    ```javascript
    console.log(Object.getOwnPropertyDescripter([1,2,3]));
    /*
    {
        '0' : {value: 1, writable: true, enumerable: true, configurable: true}
        '1' : {value: 2, writable: true, enumerable: true, configurable: true}
        '2' : {value: 3, writable: true, enumerable: true, configurable: true}
        length : {value: 3, writable: true, enumerable: false, configurable: false}
    }
    */
    ``` 
- 일반적인 배열과 자바스크립트 배열의 장단점 정리
  - 일반적인 배열은 인덱스로 요소에 빠르게 접근할 수 있다. 하지만 요소를 삽입 또는 삭제하는 경우에는 효율적이지 않다.
  - 자바스크립트 배열은 해시 테이블로 구현된 객체이므로 인덱스로 요소에 접근하는 경우 일반적인 배열보다 성능적인 면에서 느릴 수밖에 없는 구조적 단점이 있다. 하지만 요소를 삽입 또는 삭제하는 경우 일반적인 배열보다 빠른 성능을 기대할 수 있다.
- 이런 단점을 보완하기 위해 배열은 대부분의 js 엔진에서 최적화 되어있다.(일반 객체 대비 2배정도 빠름)

### `length` 프로퍼티와 희소 배열
- `length` 프로퍼티의 값은 0과 2^32 - 1 미만의 양의 정수다. 즉, 배열은 요소를 최대 2^32 - 1 개 가질 수 있음. 
- 요소를 추가하거나 삭제하면 자동 갱신됨.
    ```javascript
    const arr = [1,2,3];
    console.log(arr.length); // 3
    arr.push(4);
    console.log(arr.length); // 4
    arr.pop();
    console.log(arr.length); // 3
    ```
- `length` 프로퍼티 값은 명시적으로 할당할 수도 있음. 본래 길이보다 큰 값을 넣으면 변경은 되지만 길이가 늘어나지는 않고 본래 길이보다 작은 값을 넣으면 배열의 길이가 실제로 줄어든다.
- 자바스크립트는 문법적으로 희소배열을 허용한다. 일반적인 배열의 `length` 는 요소의 개수와 일치하지만 희소배열의 length 는 실제 요소 개수보다 언제나 크다. 사용하지 않는 것이 좋다.
- 최적화가 잘 되어있는 모던 자바스크립트 엔진은 요소의 타입이 일치하는 경우 연속적인 메모리 공간을 확보하는 것으로 알려져 있다. 효율적으로 쓰는 최선의 방법은 같은 타입 요소를 연속적으로 위치시키는 것이 최선.
    ```javascript
    // 희소 배열
    const sparse = [,2,,4];
    // 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
    console.log(sparse.length); // 4
    console.log(sparse); // [empty, 2, empty, 4]
    // 배열 sparse에는 인덱스가 0,2 인 요소가 존재하지 않는다
    console.log(Object.getOwnPropertyDescriptors(sparse));
    /*
    {
        '1': { value: 2, writable: true, enumarable: true, configurable: true}
        '3': { value: 4, writable: true, enumarable: true, configurable: true}
        length: { value: 4, writable: true, enumarable: false, configurable: false}
    }
    */
    ```
### 배열 생성
- 배열 리터럴
  - 일반적이고 간편한 생성 방식.
  - `[]` 로 묶음.
    ```javascript
    const arr = [1, 2, 3];
    console.log(arr.length); // 3
    // 희소
    arr = [1,,3];
    console.log(arr[1]); // undefined. 객체에 키가 없기 때문
    ```
- `Array` 생성자 함수
  - 전달된 인수의 갯수에 따라 다르게 동작
  - 전달된 인수가 1개이고 숫자인 경우 `length` 프로퍼티 값이 인수인 배열을 생성한다.
    - 배열의 요소는 존재하지 않는다.(`length` 제외)
        ```javascript
        const arr = new Array(10);
        console.log(arr); // [empty x 10]
        console.log(arr.length); // 10
        ```
  - 전달된 인수가 없는 경우 빈 배열을 생성한다.
  - 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.
    - 그냥 `Array`만 써도 `new.target`으로 확인을 하기 때문에 동작함
        ```javascript
        // 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성
        new Array(1,2,3); // [1, 2, 3]
        new Array({}) // [{}]
        Array(1, 2, 3); // [1, 2, 3]
        ```
- `Array.of`
  - ES6에서 도입된 `Array.of` 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다. Array 생성자 함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성함.
    ```javascript
    Array.of(1); // [1]
    Array.of(1,2,3); // [1,2,3]
    Array.of('string') // ['string']
    ```
- `Array.from`
  - ES6에서 도입된 `Array.from` 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.
  - `Array.from`을 사용하면 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다. `Array.from`메서드는 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출하고, 콜백 함수의 반환값으로 구성된 배열을 반환한다
    ```javascript
    Array.from({length:2, 0: 'a', 1: 'b'}); // ['a', 'b']
    Array.from('Hello'); // ['H','e','l','l','o'] 문자열은 이터러블이다
    Array.from({length:3}); // [undefined, undefined, undefined] 로 동작 이 경우 희소배열처럼 동작하지 않는다. 프로퍼티가 존재 함.
    Array.from({length:3}, (_,i)=>i); // [0,1,2] 
    ```