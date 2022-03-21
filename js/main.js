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

        setComplete:function(itemID){
            this.lists.forEach(task => {
                if(task.id === itemID){
                    console.log(task.completed);
                    if(task.completed === true){
                        console.log("changed");
                        task.completed = false;
                    }
                    else{
                        console.log("not changed");
                        task.completed = true;
                    }
                    console.log(task.completed);
                }
            });
            
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