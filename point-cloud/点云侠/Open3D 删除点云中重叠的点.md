# Open3D 删除点云中重叠的点


## 一、算法原理

  如图所示，蓝色为点云的重叠区域。
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/36d39749976043318b55738af0507f70.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)

> 
> 若某一点在某一距离阈值领域内不止其本身一个点，则认为其有重复点。
> 


## 二、代码实现

```python
import open3d as o3d
import numpy as np


pcd = o3d.io.read_point_cloud("bin\_0.pcd")
point = np.asarray(pcd.points)
point_size = point.shape[0]
print("原始点云中点的个数为：", point_size)
tree = o3d.geometry.KDTreeFlann(pcd)  # 建立KD树索引
radius = 0.000001                     # 定义搜索半径
total_idx = []
for i in range(point_size):
    [k, idx, _] = tree.search_radius_vector_3d(pcd.points[i], radius)  # 半径搜索
    if k != 0:
        total_idx.append(np.array(idx[0]))
true_idx = np.unique(total_idx)                          # 去除重复点的索引
repe_cloud = pcd.select_by_index(true_idx, invert=True)  # 获取重复的点
true_cloud = pcd.select_by_index(true_idx)               # 获取去重之后的点
print("删除重复点：", repe_cloud)
print("去重之后：", true_cloud)
o3d.io.write_point_cloud("重复点.pcd", repe_cloud)
o3d.io.write_point_cloud("去重后.pcd", true_cloud)
```

## 三、结果展示


![在这里插入图片描述](https://img-blog.csdnimg.cn/18a4b29586df4c6e89f3d062fb4d1a30.png)

白色为重叠的点
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/15d7c3860182422b9b605b1e1da658d3.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)  
 红色为删除重叠之后的点
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/6aa05919c85a49aeace233f83d164796.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)


## 四、CloudCompare


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210108213852922.gif#pic_center)
