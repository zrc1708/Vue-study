# Grid布局详解
## 什么是gird布局？
Flex 布局是轴线布局，只能指定“项目”针对轴线的位置，可以看作是一维布局，Grid 布局则是将容器划分
成“行”和“列”，产生单元格，然后指定“项目所在”的单元格，可以看作是二维布局，Grid 布局远比 Flex 布
局强大
## 常见的三种布局方式
1. 传统布局方式
利用position属性 + display属性 + float属性布局，兼容性最好，但是效率低，麻烦！
2. flex布局
有自己的一套属性，效率高，学习成本低，兼容性强！
3. grid布局
网格布局（Grid）是最强大的 CSS 布局方案。但是知识点较多，学习成本相对困难
些，目前的兼容性不如flex好！
## grid布局的基本概念
![](https://pic.abcyun.co/image/5ec7da8358946.jpg)
![](https://pic.abcyun.co/image/5ec7da8356a8c.jpg)
![](https://pic.abcyun.co/image/5ec7da84367d7.jpg)
## 容器的常见属性
1. grid-template-columns
2. grid-template-rows
3. grid-row-gap
4. grid-column-gap
5. grid-gap (3和4的简写)
6. grid-template-areas
7. grid-auto-flow
8. justify-items
9. align-items
10. place-items(8和9的简写)
11. justify-content
12. align-content
13. place-content(11和12的简写)
14. grid-auto-columns
15. grid-auto-rows
### 容器属性 grid-template-*
你想要多少行或者列，就填写相应属性值的个数，不填写，自动分配  
样例：
```css
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px 100px;
```
![](https://pic.abcyun.co/image/5ec7dcd693f66.jpg)  
其他要点：
1. repeat()，第一个参数是重复的次数，第二个参数是所要重复的值
```css
grid-template-columns: 100px 100px 100px;
可以写成
grid-template-columns: repeat(3, 100px);
```
2. auto-fill，有时，单元格的大小是固定的，但是容器的大小不确定，这个属性就会自动填充
```css
grid-template-columns: repeat(auto-fill, 100px);
```
3. fr，为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）
```css
grid-template-columns: repeat(4, 1fr); //宽度平均分成4份
```
4. minmax()，函数产生一个长度范围，表示长度就在这个范围之中，它接受两个参数，分别为最小值和最大值
```css
grid-template-columns: 1fr minmax(150px, 1fr);
```
5. auto，表示由浏览器自己决定长度
```css
grid-template-columns: 100px auto 100px;
```

### 容器属性 grid-row-gap / grid-column-gap 
一句话解释就是，item（项目）相互之间的距离
```css
column-gap: 20px;
row-gap: 20px;
可以缩写成
gap: 20px;
```
### 容器属性 grid-template-areas
一个区域由单个或多个单元格组成，由你决定 (具体使用，需要在项目属性里面设置)  
```css
grid-template-areas: 'a b c'
                     'd e f'
                     'g h i';
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```
区域不需要利用，则使用"点"（.）表示  
区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end  
### 容器属性 grid-auto-flow
划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是“先行后列”，即先填满第一行，再开始放入第二行 （就是子元素的排放顺序）
![](https://pic.abcyun.co/image/5ec7e439d96bc.jpg)
![](https://pic.abcyun.co/image/5ec7e4398d381.jpg)
### 容器属性 justify-items(水平方向) / align-items (垂直方向)
设置单元格内容的水平和垂直的对齐方式  
```css
justify-items: start | end | center | stretch;  
align-items: start | end | center | stretch;
```
place-items属性是align-items属性和justify-items属性的合并简写形式
```css
place-items: <align-items> <justify-items>;
```
此条属性和flex布局中的差不多
### 容器属性 justify-content (水平方向) / align-content (垂直方向)
设置整个内容区域的水平和垂直的对齐方式  
```css
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
align-content: start | end | center | stretch | space-around | space-between | space-evenly;
```
![](https://pic.abcyun.co/image/5ec7e90fd2d54.jpg)
## 项目属性
1. grid-column-start
2. grid-column-end
3. grid-row-start
4. grid-row-end
5. grid-column (1和2的简写形式)
6. grid-row (3和4的简写形式)
7. grid-area
8. justify-self
9. align-self
10. place-self (8和9的简写形式)
### 项目属性 grid-column-start / grid-column-end / grid-row-start / grid-row-end
一句话解释，用来指定item的具体位置, 根据在哪根网格线
![](https://pic.abcyun.co/image/5ec7edcb3c551.jpg)
### 项目属性 grid-column / grid-row
grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-rowstart属性和grid-row-end的合并简写形式
```css
grid-column: 1 / 3;
```
### 项目属性 grid-area
指定项目放在哪一个区域
![](https://pic.abcyun.co/image/5ec7ee561c3fd.jpg)
### 项目属性 grid-area
grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并
简写形式，直接指定项目的位置
```css
grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
```
### 项目属性 justify-self / align-self / place-self 
justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，
但只作用于单个项目 (水平方向)  
align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，
也是只作用于单个项目 (垂直方向)
place-self属性是align-self属性和justify-self属性的合并简写形式 place-self: center center;
```css
justify-self: start | end | center | stretch;
align-self: start | end | center | stretch;
```