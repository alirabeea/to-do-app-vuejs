let app = new Vue({
    el: "#vueApp",
    data: {
        title: 'To Do App',
        lists: [],
        newItem:'',
    },
    methods: {
        addItem:function(){
            let id = this.lists.length + 1;
            if(this.newItem !== ''){
                const newList = {id:id,item:this.newItem};
                this.lists.push(newList);
                this.newItem = '';
            }
            this.saveState();
            console.log(window.localStorage)
        },

        removeItem:function(itemID){
            this.lists = this.lists.filter(o => {
                return o.id !== itemID;
            })
            const ls = window.localStorage;
            console.log(itemID)
            ls.removeItem("Task"+itemID);
        },

        saveState:function(){
            const ls = window.localStorage;
            let i = 1;
            this.lists.forEach(list => {
                ls.setItem("Task"+list.id, list.item);
                i++;
            });
        },

        restoreState:function(){
            const ls = window.localStorage;
            const length = ls.length;
            const keys = Object.keys(ls);
            console.log(keys);
            if(this.lists !== null){
                this.lists = [];
            }
            for(let j = 0; j < length; j++){
                const task = ls.getItem(keys[j]);
                const id = keys[j].split("k");
                this.lists.push({id: id[1],item: task});
            };
        },

        clearState:function(){
            const ls = window.localStorage;
            ls.clear();
            this.restoreState();
        }
    },

    mounted() {
        this.restoreState();
        console.log(window.localStorage)
    },
});