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