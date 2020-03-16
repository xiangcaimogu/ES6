import { parser, stringify } from '@/code/parser'
//写代码的时候 mocha+chai(断言库)
import {expect} from 'chai'//期望方法
//常见的关系 相等 大于/小于 包含/不包含

//单元测试
describe('专门测试parser',()=>{

//一个用例
    it('我要测试parser 是否靠谱',()=>{
        //to.be xxxx 
        //equal相当于 ===
        //deep.equal 就表示两个对象是否完全相等（引用空间无所谓）
        expect(parser('name=zhuchuan')).to.be.deep.equal({name:'zhuchuan'})
    })
})


describe('专门测试stringify',()=>{
    it('我要测试stringify',()=>{
        expect(stringify({name:'zhuchuanhuan'})).to.be.equal('name=zhuchuanhuan')
    })
})

describe('测试方法',()=>{
    it('相等关系',()=>{
        expect(1+1).to.be.equal(2)
        expect([1,2,3]).to.be.lengthOf(3)
        expect(true).to.be.true
    })
    it('包含',()=>{
        expect('zhu').to.be.contain('z')
        expect('zhu').to.be.match(/z/)
    })
    it('大于/小于',()=>{
        expect(5).to.be.greaterThan(3)
        expect(3).to.be.lessThan(4)
        expect(3).to.be.not.greaterThan(10)
    })
})