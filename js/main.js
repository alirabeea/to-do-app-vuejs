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
        },

        removeItem:function(itemID){
            this.lists = this.lists.filter(o => {
                return o.id !== itemID;
            })
        }
    },
    mounted() {

    },
});
