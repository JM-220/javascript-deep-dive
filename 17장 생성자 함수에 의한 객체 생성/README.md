# 생성자 함수에 의한 객체 생성
## 목차
- [](# )

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
