// import Template from './modules/templateEngine';
//
// let str = `<h1>你好,我是{{name}}</h1>
//            <ul class="ul">
//              {{#sts}}
// 	            <li><p>姓名:{{name}}</p></li>
// 	            <li><p>年龄:{{age}}</p></li>
// 	            <li><p>爱好:<ol>
// 	            {{#hobby}}
// 	              <li>{{.}}</li>
// 	            {{/hobby}}
// 							</ol></p></li>
// 	           {{/sts}}
// 					</ul>`;
// const data = {
// 	name:'TT',
// 	sts:[
// 		{name:'A',age:'1',hobby:['A','B','C']},
// 		{name:'B',age:'2',hobby:['A','B']},
// 		{name:'C',age:'3',hobby:['A']},
// 	]
// };
// const contain = document.querySelector('#contain');
// const engine = new Template();
// const dom = engine.render(str,data);
// contain.innerHTML = dom;
//
//
import elToVnode from './modules/elToVnode';

const toVnode = new elToVnode('#app');
toVnode.createFragment('#app');