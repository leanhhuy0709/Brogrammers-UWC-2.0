// This folder contains methods for interacting with the (mock) database

import data from '../data/data.js'

const BaseAPI = {
    all() {
        return this.querySet
    },

    has_property(prob) {
        if(!this.querySet || this.querySet.length === 0) 
            return false
        if(!this.querySet[0].hasOwnProperty(prob))
            return false
        return true
    },

    get_by_id(id) {
        return this.querySet.find((ele) => ele.id === id)
    },

    filter(probs) {
        for(let key in probs) {
            if(!this.has_property(key))            
                throw new Error(`${this.name} object do not have property "${key}"`)
        }

        const qs = this.querySet.filter(ele => {    
                for(let key in probs) 
                    if(probs[key] !== ele[key])
                        return false
                return true
            })

        return qs
    },

    order_by(prob, reverse=false) {
        if(!this.has_property(prob))
            throw new Error(`${this.name} object do not have property "${prob}"`)

        this.querySet.sort((a,b) => {
            // check timestamp
            if(false) {
                const t1 = new Date(a[prob])
                const t2 = new Date(b[prob])
                return t1 < t2
            } else {
                return a[prob] < b[prob]
            }
        })

        if(reverse) this.querySet.reverse()
        return this.querySet
    },
}


const BackOfficerAPI = {
    name: 'BackOfficer',
    querySet: data.backOfficer,
    __proto__: BaseAPI,
}

const mcpAPI = {
    name: 'MCP',
    querySet: data.mcp,
    __proto__: BaseAPI,
}



// -----------------Test-----------------
// --get all records--
// console.log(BackOfficerAPI.all());   

// --get record by id--
// console.log(BackOfficerAPI.get_by_id("100020003000"))

// --check whether record has property
// console.log(mcpAPI.has_property('percentage'))

// --filter--
// try {
//     console.log(mcpAPI.filter({"percentage": 70, 'a':1}))
// } catch (error) {
//     console.log(error);
// }

// console.log(mcpAPI.filter({"percentage": 80}))

// --sort--
// console.log(mcpAPI.order_by('percentage',true));

// console.log(mcpAPI.order_by('lastCollected'));
