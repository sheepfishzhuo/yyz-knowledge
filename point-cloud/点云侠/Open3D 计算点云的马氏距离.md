# Open3D 计算点云的马氏距离


## 一、算法简介


### 1、概述


  计算每个点到最近邻点的马氏距离，最后根据马氏距离进行颜色渲染。  
   马氏距离的详细介绍见：[百度百科——马氏距离](https://baike.baidu.com/item/%E9%A9%AC%E6%B0%8F%E8%B7%9D%E7%A6%BB/8927833)。


### 2、主要函数


  Open3D中`compute_mahalanobis_distance`函数实现了计算每个点到其最近邻点马氏距离的功能。

```python
        def compute\_mahalanobis\_distance(self): # real signature unknown; restored from \_\_doc\_\_
        """
 		compute\_mahalanobis\_distance(self)
 		Function to compute the Mahalanobis distance for points in a point cloud. See: 	
        https://en.wikipedia.org/wiki/Mahalanobis\_distance.
 
 		Returns:
		open3d.utility.DoubleVector
		"""
        pass
```

## 二、代码实现

```python
import open3d as o3d
import numpy as np
from matplotlib import pyplot as plt

# -------------------------读取点云-----------------------------
pcd = o3d.io.read_point_cloud("horse.pcd")
print(pcd)
# -----------------------计算马氏距离------------------------
madist = pcd.compute_mahalanobis_distance()
madist = np.array(madist)
print(madist)
# ----------------------使用伪颜色显示最近邻点-------------------
density_colors = plt.get_cmap('plasma')(
    (madist - madist.min()) / (madist.max() - madist.min()))
density_colors = density_colors[:, :3]
pcd.colors = o3d.utility.Vector3dVector(density_colors)
o3d.visualization.draw_geometries([pcd], window_name="计算马氏距离",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_back_face=False)
```

## 三、结果展示


![在这里插入图片描述](https://img-blog.csdnimg.cn/7d61818a8b074cbebb1de65e6019c3d8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA54K55LqR5L6g,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
