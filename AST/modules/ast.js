/*
* AST语法树 abstract syntax tree
* <div class="box">
*   <h3 class="title">title</h3>
*   <ul>
*     <li v-for="item in arr" :key="index">{{item}}</li>
*   </ul>
* </div>
* {
*   tag:"div",
*   attrs:[{name:"class",value:"box"}],
*   type:1,
*   children:[
*     {
*       tag:"h3",
*       attrs:[{name:"class",value:"title"}],
*       type:1,
*       children:[{text:"title"，type:3}]
*     },
*     {
*       tag:"ul",
*       attrs:[],
*       type:1,
*       children:[
*         {
*           tag:"li",
*           for:"arr",
*           key:"index",
*           alias:"item",
*           type:1,
*           children:[]
*         }
*       ]
*     }
*   ]
* }
* */
