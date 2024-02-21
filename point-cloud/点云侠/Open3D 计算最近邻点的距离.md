# Open3D 计算最近邻点的距离


## 一、算法简介


### 1、概述


  首先使用K近邻搜索找到每个点的最近邻点，然后计算每个点到最近邻点的欧式距离，最后根据距离进行颜色渲染。


### 2、主要函数


  Open3D中`compute_nearest_neighbor_distance`函数实现了计算每个点到其最近邻点欧式距离的功能。

```python
    def compute\_nearest\_neighbor\_distance(self): # real signature unknown; restored from \_\_doc\_\_
        """
 		compute\_nearest\_neighbor\_distance(self)
 		Function to compute the distance from a point to its nearest neighbor in the point cloud
 
 		Returns:
 		open3d.utility.DoubleVector
 		"""
        pass
```

### 3、算法源码

```c++
std::vector<double> PointCloud::ComputeNearestNeighborDistance() const {
    if (points_.size() < 2) {
        return std::vector<double>(points_.size(), 0);
    }

    std::vector<double> nn\_dis(points_.size());
    KDTreeFlann kdtree(\*this);
#pragma omp parallel for schedule(static) \
 num\_threads(utility::EstimateMaxThreads())
    for (int i = 0; i < (int)points_.size(); i++) {
        std::vector<int> indices(2);
        std::vector<double> dists(2);
        if (kdtree.SearchKNN(points_[i], 2, indices, dists) <= 1) {
            utility::LogDebug(
                    "[ComputePointCloudNearestNeighborDistance] Found a point "
                    "without neighbors.");
            nn_dis[i] = 0.0;
        } else {
            nn_dis[i] = std::sqrt(dists[1]);
        }
    }
    return nn_dis;
}
```

## 二、代码实现

```python
import open3d as o3d
import numpy as np
from matplotlib import pyplot as plt

# -------------------------读取点云-----------------------------
pcd = o3d.io.read_point_cloud("bunny.pcd")
print(pcd)
# -----------------------计算最近邻点距离------------------------
nndist = pcd.compute_nearest_neighbor_distance()
nndist = np.array(nndist)
print(nndist)
# ----------------------使用伪颜色显示最近邻点-------------------
density_colors = plt.get_cmap('plasma')(
    (nndist - nndist.min()) / (nndist.max() - nndist.min()))
density_colors = density_colors[:, :3]
pcd.colors = o3d.utility.Vector3dVector(density_colors)
o3d.visualization.draw_geometries([pcd], window_name="计算最近邻点距离",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_back_face=False)
```

## 三、结果展示


![在这里插入图片描述](https://img-blog.csdnimg.cn/4423252f282d4b748018bc29a0e78c30.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA54K55LqR5L6g,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


## 四、python详细过程版

[Open3D 计算点云平均密度](https://blog.csdn.net/qq_36686437/article/details/114292537)这篇文章里的代码就是上述源码的python实现详细过程。
