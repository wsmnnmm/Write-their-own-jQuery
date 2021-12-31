window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }

    function createElement(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    }
    // api 可以操作elements
    const api = Object.create(jQuery.prototype)//创建一个对象，这个对象的__proto__为括号里面的东西
    // 等价于
    // const api = {__proto__: jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    })
    // 等价于
    // api.elements = elements
    // api.oldApi = selectorOrArray.oldApi
    return api
}

jQuery.prototype = {
    constructor: jQuery,
    find(selector) {
        1
        let array = []
        for (let i = 0; i < elements.length; i++) {
            const elements2 = Array.from(elements[i].querySelectorAll(selector))
            array = array.concat(elements2)
            //querySelectorAll查找的是伪数组
        }
        array.oldApi = this //this 就是 api
        return jQuery(array)
    },
    each(fn) {
        for (let i = 0; i < elements.length; i++) {
            fn.call(null, elements[i], i)
        }
        return this
    },
    parent() {
        const array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children)
        })
        return jQuery(array)
    },
    print() {
        console.log(elements) //parent()调用jQuery的形参传进来的elements
    },
    addClass(className) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add(className)
        }
        return this
    },
    end() {
        return this.oldApi
    },
}