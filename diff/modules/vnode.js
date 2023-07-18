/*
* 虚拟DOM
* {
*		"sel":"div",
*		"data":{
*			"class":{"box":true}
*		},
*		"key":"",
*		"children": [{"sel":"p","data":{},"text":"text"}],
*		"text":"",
*		"elm":""
*}
*/
export default function (sel, data, children, text, elm) {
	const key = data.key;
	return {sel, data, key, children, text, elm}
}
