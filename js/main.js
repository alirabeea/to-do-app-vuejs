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
        },

        removeItem:function(itemID){
            this.lists = this.lists.filter(o => {
                return o.id !== itemID;
            })
            const ls = window.localStorage;
            ls.removeItem("Item"+itemID);
        },

        saveState:function(){
            const ls = window.localStorage;
            this.lists.forEach(list => {
                const task = JSON.stringify(list);
                if(!ls.getItem("Item"+list.id)){
                    ls.setItem("Item"+(ls.length+1), task);
                }
            });
        },

        restoreState:function(){
            const ls = window.localStorage;
            if(this.lists !== null){
                this.lists = [];
            }
            if(ls.length !== 0){
                for(let task in ls){
                    if (localStorage.hasOwnProperty(task)) {
                        this.lists.push(JSON.parse(ls.getItem(task)));
                    }
                }
            }
        },

        clearState:function(){
            const ls = window.localStorage;
            ls.clear();
            this.restoreState();
        }
    },

    mounted() {
        this.restoreState();
    },
});