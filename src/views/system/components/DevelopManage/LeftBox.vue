<template>
  <div class="leftBox">

  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LeftBox',
  mounted () {
	this.fetchAllResults();
  },
  methods: {
	 sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
},
	async  fetchAllResults() {
	  const allResults = [];
	const key = 'f5f58a60eb5ca15e131b1df75c5f5567';
	const total = 328;
	const pageSize = 20;
	  for (let start = 0; start < total; start += pageSize) {
		const obj = {
		  keyWord: "水库",
		  level: "11",
		  mapBound: "113.4,23.0,113.7,23.3",
		  queryType: "1",
		  count: String(pageSize),
		  start: String(start)
		};

		const postStr = encodeURIComponent(JSON.stringify(obj));
		const url = `https://api.tianditu.gov.cn/v2/search?postStr=${postStr}&type=query&tk=${key}`;

		try {
		  const res = await fetch(url);
		  const json = await res.json();
		  if (json.pois && Array.isArray(json.pois)) {
			allResults.push(...json.pois);
		  }
		   // 避免请求过快
      await this.sleep(1000);
		} catch (error) {
		  console.error(`请求第 ${start} 条开始的数据失败：`, error);
		}
	  }

	  console.error(`共获取到 ${allResults.length} 条数据`);
	  console.error(allResults);
	},
	getTotal(){
	      const key = 'f5f58a60eb5ca15e131b1df75c5f5567'
	const obj = {
  keyWord: "广东省广州市黄浦区水库",
  level: "11",
  mapBound: "113.4,23.0,113.7,23.3", // 广州黄埔区范围
  queryType: "1",
  count: "20",
  start: "0"
};

// encodeURIComponent 是必须的，防止 JSON 中的特殊字符出错
const postStr = encodeURIComponent(JSON.stringify(obj));
// 正确拼接：postStr 是变量，不是字符串
const url = `https://api.tianditu.gov.cn/v2/search?postStr=${postStr}&type=query&tk=${key}`;
//`https://api.tianditu.gov.cn/geocoder?ds={"keyWord":"广州黄浦区 水库"}&tk=`+key
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.error('天地图返回', data)
      })
	}
  }
}
</script>

<style scoped lang="less">
.leftBox{
  width: 20%;
  height: calc(100vh - 80px);
  background-color: red;
  float: left;
}
</style>