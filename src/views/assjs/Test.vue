<template>
	<div></div>
</template>

<script>
//引入ass
import $ass from "@/frameworks/assjs/ass.js";
export default {
	data() {
		return {};
	},
	methods: {
		testUrl() {
			//修改url为"/home""
			history.pushState(null, null, "/assjs/test");
			console.log("search>>" + window.location.search);

			let url = $ass.url.add({ id: 1, name: "小明", phone: "123123" });
			console.log("url>>" + url);

			//修改url但不刷新页面
			//history.pushState(state,title,url)//title: 新页面的标题，但是所有浏览器都忽略这个值，可填null
			history.pushState(null, null, url);
			console.log("search>>" + window.location.search);

			let value = $ass.url.get("name");
			console.log("value:>>" + value);

			let url2 = $ass.url.delete(["name", "phone"]);
			console.log("url2>>" + url2);

			history.pushState(null, null, url2);
			console.log("search>>" + window.location.search);
		}
	},
	mounted() {
		this.testUrl();
	}
};
</script>

<style lang="scss" scoped></style>
