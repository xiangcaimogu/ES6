//求n的阶乘
// n! = n * (n - 1)!
function mul(n) {
    if (n == 1 || n == 0) {
        return 1;
    }
    return n * mul(n - 1)
}

//实现斐波拉契数列
//fb(n) == fb(n - 1) + fb(n - 2)
function fb(n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    return fb(n - 1) + fb(n - 2)
}

//等差数列求n项
//2  5  8  11
function func(n){
    if(n==1) return 2;
    return func(n-1) +3;
}
//求等差数列的前n项和
function sum (n){
    if( n ==1 ) return 2;
    return sum(n-1) + func(n)
}