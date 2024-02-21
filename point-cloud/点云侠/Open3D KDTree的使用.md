# Open3D KDTree的使用


## 一、原理介绍


### 1、建立KD树

  kd-tree 数据结构是计算机科学中用来组织具有k维空间中若干点的数据结构。它是一个具有其他约束的二进位搜索树。K-d树对于范围搜索和最近邻搜索是非常有用的。为了我们的目的，我们通常只处理三维点云，所以我们所有的k-d树都是三维的。K-d树的每一层都使用垂直于相应轴的超平面，沿着特定的维度分割所有的子级。在树的根部，所有的子节点都将根据第一维(即，如果第一维坐标小于根，它将在左子树中，如果它大于根，那么它将明显地在右子树中)分割。树中的每一层都在下一个维度上划分，一旦所有其他维度都被耗尽，就返回到第一个维度。构建k-d树最有效的方法是使用一个分区方法：将中间点放置在根部，所有的东西都有一个更小的一维值，左边更小，右边更大。然后，在左树和右子树上重复此过程，直到要分区的最后一棵树仅由一个元素组成。
   如图 1是 k=2 的二维数据搜索示意图，kd-tree 的每一层为数据的一个维度，并以一个子节点来拆分该维数据区间，取这一维度内小于该节点值的数据放在左子数，反之大于节点值的放在右子树。kd-tree 的每一层都是在数据的下一个维度分开，当数据的维度用完时，则重新返回到第一个维度继续迭代直至确定所查找的数据，该方法使得时间复杂度降低到o(nlog2n)。创建 kd-tree常将数据值每个维度的中值作为分割超平面。
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210516160551664.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)

图1 k=2的kd-tree示意图 (a) 空间划分图；(b) 树的结构图

  在三维点云数据查找过程中 kd-tree 也是通过垂直于点云的一维超平面，并将空间递归的分割为多个子空间来实现三维点云数据的快速检索。在三维点云中 kd-tree 的详细计算过程如下：


1. 依据点云的全局坐标系建立包含所有点云的立方体包围盒；
2. 对每个包含超过1个点的立方体，构建分割平面；
3. 两个分割子空间和分割平面上的点构成分支与连接点；
4. 分割子空间，如果内部点的数量超过1，则执行步骤2继续分割。


### 2、近邻搜索

  下图是一个关于最近邻居搜索是如何工作的演示。
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210516163024278.gif#pic_center)

图2 最近邻搜索演示

## 二、算法流程


### 1、读取点云并构建一个KDTree


  这是最近邻查询的预处理步骤

```python
import open3d as o3d
pcd = o3d.io.read\_point\_cloud("bunny.pcd")
pcd.paint\_uniform\_color([0.5, 0.5, 0.5])#把所有点渲染为灰色（灰兔子）
pcd_tree = o3d.geometry.KDTreeFlann(pcd)#建立KD树索引
```

### 2、选取查询点


  下边代码是把第200个点作为查询点。

```python
pcd.colors[200] = [1, 0, 0]#给定查询点并渲染为红色
```

### 3、K近邻搜索


  `search_knn_vector_3d`返回查询点的k个最近邻的索引列表。这些相邻的点存储在数组numpy中，使用`pcd.colors`对numpy数组内所有的点进行颜色渲染（渲染为绿色[0，1，0]）。这里跳过了第一个索引点，因为它是查询点本身。

```python
[k, idx, _] = pcd_tree.search\_knn\_vector\_3d(pcd.points[200], 200)#K近邻搜索
np.asarray(pcd.colors)[idx[1:], :] = [0, 1, 0]#K邻域的点，渲染为绿色
```

### 4、半径邻域搜索


  使用 `search_radius_vector_3d`查询所有的和查询点点距离小于给定半径的点

```python
pcd.colors[1500] = [1, 0, 0]#给定查询点并渲染为红色
[k1, idx1, _] = pcd_tree.search\_radius\_vector\_3d(pcd.points[1500], 0.02)#半径搜索
np.asarray(pcd.colors)[idx1[1:], :] = [0, 0, 1]#半径搜索结果并渲染为蓝色
```

### 5、混合搜索


  除了KNN搜索`(search_knn_vector_3d)`和RNN搜索`(search_radius_vector_3d)`以外,Open3d还提供了混合搜索函数`(search_hybrid_vector_3d)`。它最多返回K个和查询点距离小于给定半径的最邻近点。这个函数结合了KNN和RNN的搜索条件，在某些文献中也被称作RKNN搜索。在许多情况下它有着性能优势,并且在Open3d的函数中大量的使用.

```python
#===============混合搜索==================
pcd.colors[3000] = [1, 1, 0]#给定查询点并渲染为黄色
[k2, idx2, _] = pcd_tree.search\_hybrid\_vector\_3d(pcd.points[3000], 0.05,200)#K近邻搜索
np.asarray(pcd.colors)[idx2[1:], :] = [0, 1, 0.8]#半径搜索结果并渲染为青色
```

## 三、代码实现

```python
import open3d as o3d
import numpy as np
pcd = o3d.io.read\_point\_cloud("1.pcd")
pcd.paint\_uniform\_color([0.5, 0.5, 0.5])#把所有点渲染为灰色（灰兔子）
pcd_tree = o3d.geometry.KDTreeFlann(pcd)#建立KD树索引
pcd.colors[200] = [1, 0, 0]#给定查询点并渲染为红色
#---------------K近邻搜索----------------
[k, idx, _] = pcd_tree.search\_knn\_vector\_3d(pcd.points[200], 200)#K近邻搜索
np.asarray(pcd.colors)[idx[1:], :] = [0, 1, 0]#K邻域的点，渲染为绿色
#---------------半径搜索-----------------
pcd.colors[1500] = [1, 0, 0]#给定查询点并渲染为红色
[k1, idx1, _] = pcd_tree.search\_radius\_vector\_3d(pcd.points[1500], 0.02)#半径搜索
np.asarray(pcd.colors)[idx1[1:], :] = [0, 0, 1]#半径搜索结果并渲染为蓝色
#---------------混合搜索-----------------
pcd.colors[3000] = [1, 1, 0]#给定查询点并渲染为黄色
[k2, idx2, _] = pcd_tree.search\_hybrid\_vector\_3d(pcd.points[3000], 0.05,200)#K近邻搜索
np.asarray(pcd.colors)[idx2[1:], :] = [0, 1, 0.8]#半径搜索结果并渲染为青色
o3d.visualization.draw\_geometries([pcd])
```

## 四、结果展示


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826165149929.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)


## 五、备注

  当在同一个点云中使用k近邻搜索时，这里的“k”个最近近邻点包括被查询点自己。例如要搜索黑色点最近邻的5个点，当参数中“k=5”时，近邻点如红色部分所示。实际上是，在不包含自身点的情况下，搜索到的是该点邻域内的"k-1"个点。
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210404090231393.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)
