let app = new Vue({
    el: "#vueApp",
    data: {
        title: 'To Do App',
        lists: [],
        newItem:'',
    },
    methods: {
        addItem:function(){
            if(this.lists === null){
                this.lists = [];
            }
            console.log(this.lists);
            let id = this.lists.length + 1;
            if(this.newItem !== ''){
                const newList = {id:id,item:this.newItem, completed: false};
                this.lists.push(newList);
                this.newItem = '';
            }
        },

        removeItem:function(itemID){
            this.lists = this.lists.filter(o => {
                return o.id !== itemID;
            })
        },

        setComplete:function(item){
            item.completed = !item.completed;  
        },

        saveState:function(){
            window.localStorage.setItem("TODO", JSON.stringify(this.lists));
        },

        restoreState:function(){
            if(this.lists !== null){
                this.lists = [];
            }
            this.lists = JSON.parse(window.localStorage.getItem("TODO"));
        },

        clearState:function(){
            window.localStorage.clear();
            this.restoreState();
        }
    },

    watch: {
        lists: {
            handler(newLists, oldLists){
                this.lists = newLists;
                this.saveState();
            },
            deep: true
        }
    },

    mounted() {
        this.restoreState();
    },
});