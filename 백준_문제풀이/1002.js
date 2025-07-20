const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');
const t = parseInt(input[0]);

const getDiff = function(a,b){
    return Math.sqrt(
        (a[0] - b[0])*(a[0] - b[0])+
        (a[1] - b[1])*(a[1] - b[1])
    );
}
for (let i = 0;i<t;i++){
    // const input = fs.readFileSync('input.txt').toString().split(' ');
    const line = input[i+1].split(' ');
    const cho = [parseInt(line[0]),parseInt(line[1])];
    const beak = [parseInt(line[2]),parseInt(line[3])];
    const cho_r = parseInt(line[4]);
    const beak_r = parseInt(line[5]);
    const diff = getDiff(cho,beak);

    if (cho === beak && cho_r === beak_r){
        console.log('-1');
        continue;
    }

    if(diff > cho_r + beak_r){
        console.log('0');
    }
    else if(diff === cho_r+beak_r){
        console.log('1');
    }
    else{
        // 안만나는 경우
        if (diff + cho_r < beak_r || diff + beak_r < cho_r){
            console.log('0');
        }
        // 한 점에서 만나는 경우
        else if (beak_r - cho_r === diff || cho_r - beak_r === diff){
            console.log('1');
        }
        else {
            console.log('2');
        }
    }
}
