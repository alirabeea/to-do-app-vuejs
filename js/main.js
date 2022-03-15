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
            ls.setItem("TODO", JSON.stringify(this.lists));
            console.log(ls);
        },

        saveState:function(){
            const ls = window.localStorage;
            ls.setItem("TODO", JSON.stringify(this.lists));
        },

        restoreState:function(){
            const ls = window.localStorage;
            if(this.lists !== null){
                this.lists = [];
            }
            this.lists = JSON.parse(ls.getItem("TODO"));
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