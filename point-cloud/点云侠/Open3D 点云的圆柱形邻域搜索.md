# Open3D 点云的圆柱形邻域搜索


## 一、算法原理


  代码中实现过程已十分清晰明了，无需做过多介绍。


## 二、代码实现

```
import open3d as o3d
import numpy as np


# ---------------------------------------读取点云--------------------------------------
pcd = o3d.io.read_point_cloud("data//投影点测试.pcd")
# 如果点云不包含颜色信息，则将点云渲染成灰色
if pcd.has_colors == -1:
    pcd.paint_uniform_color([0.5, 0.5, 0.5])  # 把所有点渲染为灰色
# 将点云的某一个纬度设置为0，在哪个纬度做圆柱邻域搜索，就把对应的纬度设置为0
points = np.asarray(pcd.points)
xi = points[:, 0]
yi = points[:, 1]
zi = points[:, 2] - points[:, 2]  # 这里在Z方向上做圆柱邻域搜索
project_points = np.c_[xi, yi, zi]
project_cloud = o3d.geometry.PointCloud()  # 使用numpy生成点云
project_cloud.points = o3d.utility.Vector3dVector(project_points)

# --------------------------------------KDtree搜索--------------------------------------
pcd_tree = o3d.geometry.KDTreeFlann(project_cloud)  # 建立KD树索引
# ---------------------------------------半径搜索---------------------------------------
pcd.colors[15] = [1, 0, 0]  # 给定查询点并渲染为红色
[k1, idx1, _] = pcd_tree.search_radius_vector_3d(project_cloud.points[150], 0.5)  # 半径搜索
np.asarray(pcd.colors)[idx1[1:], :] = [1, 0, 0]  # 半径搜索结果并渲染为红色

o3d.visualization.draw_geometries([pcd])


```

## 三、结果展示


![在这里插入图片描述](https://img-blog.csdnimg.cn/dbb22c1a41f047a6a4bcb79b6f483a6c.png#pic_center)


## 四、相关链接

[1] [Open3D KDTree的使用](https://blog.csdn.net/qq_36686437/article/details/108242609)
