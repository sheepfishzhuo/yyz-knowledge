# Open3D 从点云中构建八叉树


## 一、八叉树


### 1、构建八叉树

> 
>   八叉树（Octree）是一种用于描述三维空间的树状数据结构。八叉树的每个节点表示一个正方体的体积元素，每个节点有八个子节点，这八个子节点所表示的体积元素加在一起就等于父节点的体积。一般中心点作为节点的分叉中心。
> 

**八叉树构建原理**：
 (1) 设定最大递归深度。
 (2) 找出场景的最大尺寸，并以此尺寸建立第一个立方体。
 (3) 依序将单位元元素丢入能被包含且没有子节点的立方体。
 (4) 若没有达到最大递归深度，就进行细分八等份，再将该立方体所装的单位元元素全部分担给八个子立方体。
 (5) 若发现子立方体所分配到的单位元元素数量不为零且跟父立方体是一样的，则该子立方体停止细分，因为跟据空间分割理论，细分的空间所得到的分配必定较少，若是一样数目，则再怎么切数目还是一样，会造成无穷切割的情形。
 (6) 重复3，直到达到最大递归深度。
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210522212717363.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)


### 2、主要函数


  Open3D中的[open3d.geometry.Octree](http://www.open3d.org/docs/release/python_api/open3d.geometry.Octree.html)可用于创建、搜索、遍历具有用户指定的最大树深度`max_depth`的八叉树。

```python
convert_from_point_cloud(self, point_cloud, size_expand=0.01)
```

从点云中构建八叉树


* point\_cloud：为输入的点云数据
* size\_expand ：一个小的扩展尺寸，使八叉树比原来的点云边界略大，以容纳所有的点。(默认值为：0.01m)


## 二、代码实现

```python
import numpy as np
import open3d as o3d


pcd = o3d.io.read_point_cloud("cloud\_data//bench.pcd")
point = np.asarray(pcd.points)
N = point.shape[0]
# 点云随机着色
pcd.colors = o3d.utility.Vector3dVector(np.random.uniform(0, 1, size=(N, 3)))
# 可视化点云
o3d.visualization.draw_geometries([pcd], window_name="原始点云",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_back_face=False)
# 创建八叉树， 树深为9
octree = o3d.geometry.Octree(max_depth=9)
# 从点云中构建八叉树，适当扩展边界0.001m
octree.convert_from_point_cloud(pcd, size_expand=0.001)
# 可视化八叉树
o3d.visualization.draw_geometries([octree], window_name="可视化八叉树",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_back_face=False)
```

## 三、结果展示

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021033021190590.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center) 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210330211911392.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)
