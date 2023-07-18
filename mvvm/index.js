import {Vue} from './vue';

const vm = new Vue({
	el: '#app',
	data: {
		person: {
			name: 'swj',
			age: '20'
		},
		msg: 'for the wealth',
		htmlStr:'<i>hello</i>',
		arr:[1,2,3]
	},
	methods:{
		handClick(){
			console.log(this.$data);
			this.arr.push('1')
		}
	}
});