import rewire from "rewire"
const index = rewire("./index")
const testAddNumber = index.__get__("testAddNumber")
// @ponicode
describe("testAddNumber", () => {
    test("0", () => {
        let callFunction: any = () => {
            testAddNumber(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            testAddNumber(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            testAddNumber(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            testAddNumber(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            testAddNumber(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            testAddNumber(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
