## 地图应用(需翻墙)

如果你能访问谷歌，请点击[这里](https://stillwatersignedalready.github.io/uda-map-app/)

---

### 功能
- 从谷歌抓取数据，展示城市若干地点的信息
- 从高德抓取并展示天气数据

---

### 使用说明
- 地点根据类别分组
- 左侧边栏上方为筛选器，可选择当前显示的地点类别
- 左侧栏列表对应当前地图展示的地点
- 鼠标在列表项悬停时，地图上对应的图标出现动画效果
- 列表或地图上的图标均会弹出窗口显示该地点的具体信息
- 单击地图左上角的四条杠的图标可以收起或打开侧栏

---

### 代码思路
- 借助google map API开发，载入API的place库以抓取地点数据
- 网页启动时，发出一连串并行GET请求，并在ViewModel中缓存、加工数据，然后渲染，以上异步操作由promise控制。
- 城市、要搜索的类别、每个类别要搜索的项目，都有简单命了的接口，方便扩展