# Open3D 计算点云平均密度（版本一）

博客长期更新，本文最近一次更新时间为：2023年7月11日。① 代码重构使书写更加规范；② 新增测试数据网盘链接。

## 一、算法原理

  采样设备不同、设备距离场景远近不同，会使点云密度产生差异。现有的对点云密度的估算方法有基于距离的方法和基于分块的方法。基于距离的平均距离密度密度表示法是通过计算点云各点的距离平均值来估算点云分布疏密程度，点的距离一般点云某一点$p$最近的点的距离。在点数为$N$的点云$C$中，用$dis(p,q)$表示点$q$之间的距离，用$d_{p}$表示点$p$与其他点的最小距离，则有：
$$
d_p=min(dis(p,q)),q=1,2,\cdots,N,p\neq q
$$

  则点云的平均距离密度为：  

$$
\overline{d}=\frac1N\sum_{p=1}^Nd_p
$$
   平均距离 $\overline{d}$ 越小，点云分布越密集，密度则越大；$\overline{d}$ 越大，点云分布越稀疏，密度则越小。因此通过平均距离来估算点云密度可行。


## 二、代码实现

```python
import open3d as o3d
import numpy as np

pcd = o3d.io.read_point_cloud("灯.pcd")  # 读取点云数据
point = np.asarray(pcd.points)           # 获取点坐标
kdtree = o3d.geometry.KDTreeFlann(pcd)   # 建立KD树索引
point_size = point.shape[0]              # 获取点的个数
dd = np.zeros(point_size)
for i in range(point_size):
    [_, idx, dis] = kdtree.search_knn_vector_3d(point[i], 2)
    dd[i] = dis[1]                       # 获取到最近邻点的距离平方
density = np.mean(np.sqrt(dd))           # 计算平均密度
print("点云密度为 denstity=", density)
o3d.visualization.draw_geometries([pcd], window_name="平均密度",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_back_face=False)
```

## 三、结果展示


![在这里插入图片描述](https://img-blog.csdnimg.cn/7b0c11b2b64b4efaa26fe0f68a396b04.png#pic_center)


## 四、测试数据

链接：<https://pan.baidu.com/s/1NptQuyUCAqjnOtbOSC16aA>
提取码：9vmu
